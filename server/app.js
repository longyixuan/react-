/*
 * @Author: yinxl 
 * @Date: 2019-07-08 08:57:35 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-10 15:52:20
 */
const Koa = require('koa');
const config = require('./config');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const jwtKoa = require('koa-jwt');

const app = new Koa();
app.use(cors());
app.use(bodyParser());

/**
 * 页面访问权限控制
 */
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = '登陆验证失败';
        } else {
            throw err;
        }
    })
})
app.use(jwtKoa({
    secret: 'jwtSecret',
    key: 'accessToken',
    passthrough: true
}).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [
        /^\/login/,
        /^\/regist/
    ]
}));

const user_router = require('./routes/user_router');
app.use(user_router.routes()).use(user_router.allowedMethods());

const system_router = require('./routes/system_router');
app.use(system_router.routes()).use(system_router.allowedMethods());

app.listen(config.port);