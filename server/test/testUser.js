/*
 * @Author: yinxl 
 * @Date: 2019-07-08 10:58:16 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-08 11:36:07
 */
const uuidv1 = require('uuid/v1');
const user = require('../app/models/user');
 
// 添加用户
user.addUser(uuidv1(),'yinxl', 'yinxl@163.com', '111111').then(function() {
    // 查询新添加的用户
    return user.findByName('yinxl');
}).then(function(user) {
    console.log('****************************');
    console.log('user name: ', user.userName);
    console.log('user email: ', user.email);
});