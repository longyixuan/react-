/*
 * @Author: yinxl 
 * @Date: 2019-07-08 09:59:11 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-09 16:38:01
 */

const Sequelize = require('sequelize');
const sequelize = require('../../db');
const User_system = require('./user_system');
const System = require('./system');

// 创建 model
const User = sequelize.define('user', {
    userId: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'user_id'
    },
    userName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'user_name'
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    passStrength: {
        type: Sequelize.STRING,
        field: 'pass_strength'
    },
    nickName: {
        type: Sequelize.STRING,
        field: 'nick_name'
    },
    email: {
        type: Sequelize.STRING
    },
    delFlag: {
        type: Sequelize.BOOLEAN,
        field: 'del_flag',
        defaultValue: false
    },
    avatar: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    defaultRole: {
        type: Sequelize.STRING,
        field: 'default_role'
    },
    sex: {
        type: Sequelize.ENUM('0','1','2'), //0女，1男，2未知
        defaultValue: '2'
    }
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false,
    autoIncrement: true
});

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
const user = User.sync({ force: false });


User.belongsToMany(System, { through: User_system, foreignKey: 'userId' });
System.belongsToMany(User, { through: User_system ,foreignKey: 'systemId'});

User.addSystem(User_system, { mainHeader: 'yinxl' })
// 添加新用户
exports.addUser = function({userId, userName, password,passStrength}) {
    // 向 user 表中插入数据
    return User.create({
        userId: userId,
        userName: userName,
        password: password,
        passStrength: passStrength
    });
};

// 通过用户名查找用户
exports.findByName = function(userName) {
    return User.findOne({ where: { user_name: userName } });
};

// 通过用户名查找用户,不显示密码
exports.findUserInfo = function(userName) {
    return User.findOne({
        include: [
            {
                model: User,
                through: {
                    where: { 
                        user_name: userName 
                    },
                    attributes: { 
                        exclude: ['password'] 
                    }
                }
            }
        ]
    });
};