/*
 * @Author: yinxl 
 * @Date: 2019-07-08 09:59:11 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-10 15:59:32
 */

const Sequelize = require('sequelize');
const sequelize = require('../../db');

// 创建 model
const System = sequelize.define('system', {
    systemId: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'system_id'
    },
    systemName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'system_name'
    },
    parentId: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'parent_id'
    },
    parentName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
        field: 'parent_name'
    },
    isParent: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        field: 'is_parent'
    },
    sortOrder: {
        type: Sequelize.INTEGER,
        field: 'sort_order',
        defaultValue: 0
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    delFlag: {
        type: Sequelize.BOOLEAN,
        field: 'del_flag',
        defaultValue: false
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

const system = System.sync({ force: false });

// 添加新系统
exports.addSystem = function({systemId, systemName, isParent, parentId, parentName, sortOrder, creatBy, updateBy, status}) {
    // 向 system 表中插入数据
    return System.create({
        systemId: systemId,
        systemName: systemName,
        isParent: isParent,
        parentId: parentId,
        parentName: parentName,
        sortOrder: sortOrder,
        creatBy: creatBy,
        updateBy: updateBy,
        status: status
    });
};
// 通过id，查找系统名
exports.findNameById = function(systemId) {
    return System.findOne({ where: { system_name: systemId } });
};
