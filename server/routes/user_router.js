/*
 * @Author: yinxl 
 * @Date: 2019-07-08 09:14:19 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-10 16:40:25
 */
const Router = require('koa-router');
const router = new Router();
const user_controller = require('./../app/controllers/user_controller');

router.post('/login', user_controller.login);
router.post('/regist', user_controller.register);
router.get('/user/info', user_controller.getUserInfo);
router.put('/user/update', user_controller.updateUser);
router.delete('/user/delete', user_controller.deleteUser);

module.exports = router;