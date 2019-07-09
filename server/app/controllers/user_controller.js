/*
 * @Author: yinxl 
 * @Date: 2019-07-08 09:17:51 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-08 16:48:58
 */
const uuidv1 = require('uuid/v1');
const jsonwebtoken = require('jsonwebtoken');
const config = require('./../../config');
const passport = require('./../utils/passport');
const User_tbl = require('../models/user');

/* jwt密钥 */
//秘钥
const jwtSecret = 'jwtSecret';

const login = async (ctx, next) => { //登录
    const req = ctx.request.body;
    // 用户是否存在
    const user = await User_tbl.findByName(req.userName);
    if (!user) {
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: '用户不存在!'
        }
        return;
    }
    //用户是否被禁用
    if (user.status===-1) {
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: '账号已被禁用,请联系管理员!'
        }
        return;
    }
    // 用户存在，匹配密码
    const match = await passport.validate(req.password, user.password);
    ctx.status = 200;
    if (match) {
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: user,
            token: jsonwebtoken.sign({
                data: user.userName,
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 60 seconds * 60 minutes = 1 hour
            }, jwtSecret)
        }
        return;
    }
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误'
    }
}

const register = async (ctx, next) => { //注册
    const req = ctx.request.body;
    ctx.status = 200;
    // 是否已注册，返回
    const user = await User_tbl.findByName(req.userName);
    if (user) {
        ctx.body = {
            code: 0,
            msg: '用户名重复！'
        }
        return;
    }

    // 未注册用户，注册
    const userId = uuidv1(); //密码加密
    const password = await passport.encrypt(req.password, config.saltTimes); //密码加密
    const newUser = User_tbl.addUser({
        userId: userId,
        userName: req.userName,
        password: password,
        passStrength: req.passStrength,
    });
    if (newUser) {
        ctx.body = {
            code: 1,
            msg: '注册成功！',
            data: {
                userId: newUser.userName,
                userName: newUser.userName
            }
        };
    } else {
        ctx.body = {
            code: 0,
            msg: '注册失败！'
        };
    }
}

//获取用户信息
const getUserInfo = async (ctx, next) => {
    const token = ctx.request.headers.accesstoken;
    const istoken = jsonwebtoken.verify(token, jwtSecret);
    ctx.status = 200;
    if (istoken) { //验证token
        const user = await User_tbl.findUserInfo(istoken.data);
        if (user) {
            ctx.body = {
                code: 1,
                data: user,
                msg: '用户信息获取成功'
            }
            return;
        }
        ctx.body = {
            code: 0,
            msg: '用户信息获取失败'
        }
        return;
    }
    ctx.body = {
        code: 0,
        msg: '用户信息获取失败'
    }
}

module.exports = {
    login,
    register,
    getUserInfo
}