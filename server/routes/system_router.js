/*
 * @Author: yinxl 
 * @Date: 2019-07-10 14:59:34 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-10 15:09:55
 */
const Router = require('koa-router');
const router = new Router();
const system_controller = require('./../app/controllers/system_controller');

router.post('/system/add', system_controller.addSystem);

module.exports = router;