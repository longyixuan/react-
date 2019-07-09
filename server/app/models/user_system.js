/*
 * @Author: yinxl 
 * @Date: 2019-07-08 16:52:54 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-09 15:35:40
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
    },
    creatBy: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'creat_by'
    },
    updateBy: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'update_by'
    },
    mainHeader: {
        type: Sequelize.STRING,
        field: 'main_header'
    },
    viceHeader: {
        type: Sequelize.STRING,
        field: 'vice_header'
    }
}, {
    freezeTableName: false,
    autoIncrement: true
});
module.exports = UserSystem;