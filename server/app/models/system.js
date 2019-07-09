/*
 * @Author: yinxl 
 * @Date: 2019-07-08 09:59:11 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-09 14:15:02
 */

const Sequelize = require('sequelize');
const sequelize = require('../../db');

// 创建 model
const System = sequelize.define('system', {
    systemId: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'user_id'
    },
    systemName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'user_name'
    },
    delFlag: {
        type: Sequelize.BOOLEAN,
        field: 'del_flag',
        defaultValue: false
    }
}, {
    freezeTableName: false,
    autoIncrement: true
});

const system = System.sync({ force: false });

module.exports = System;
