/*
 * @Author: yinxl 
 * @Date: 2019-07-08 16:52:54 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-10 14:53:23
 */

const Sequelize = require('sequelize');
const sequelize = require('../../db');

// 创建 model
const UserSystem = sequelize.define('usersystem', {
    userId: {
        type: Sequelize.STRING,
        allowNull:false,
        field: 'user_id'
    },
    systemId: {
        type: Sequelize.STRING,
        allowNull:false,
        field: 'system_id'
    }
}, {
    freezeTableName: false,
    autoIncrement: true
});

const usersystem = UserSystem.sync({ force: false });

module.exports = UserSystem;