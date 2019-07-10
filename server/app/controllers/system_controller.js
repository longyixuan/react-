/*
 * @Author: yinxl 
 * @Date: 2019-07-10 14:56:48 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-10 16:00:05
 */
const uuidv1 = require('uuid/v1');
const System_tbl = require('../models/system');

const addSystem = async (ctx, next) => {
    const req = ctx.request.body;
    ctx.status = 200;
    const systemId = uuidv1(); //密码加密
    const newSystem = System_tbl.addSystem({
        systemId: systemId,
        systemName: req.systemName,
        isParent: req.isParent,
        parentId: req.parentId,
        parentName: req.parentName,
        sortOrder: req.sortOrder,
        creatBy: req.creatBy,
        updateBy: req.updateBy,
        status: req.status
    });
    if (newSystem) {
        ctx.body = {
            code: 1,
            msg: '添加成功！',
            data: newSystem
        };
    } else {
        ctx.body = {
            code: 0,
            msg: '添加失败！'
        };
    }
}

module.exports = {
    addSystem
}