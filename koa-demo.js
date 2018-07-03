const Koa = require('koa');

const app = new Koa();

app.use(function (ctx, next) {
    ctx.body = 'hello';
});

app.listen(9999);