const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
const user_reg = require('./routes/user_register');
app.use(user_reg.routes(), user_reg.allowedMethods());
const user_email_veri = require('./routes/user_email_veri');
app.use(user_email_veri.routes(), user_email_veri.allowedMethods());
const user_code_veri = require('./routes/user_code_veri');
app.use(user_code_veri.routes(), user_code_veri.allowedMethods());
const user_login = require('./routes/user_login');
app.use(user_login.routes(), user_login.allowedMethods());

const profile_view = require('./routes/profile_view');
app.use(profile_view.routes(), profile_view.allowedMethods());
const profile_edit = require('./routes/profile_edit');
app.use(profile_edit.routes(), profile_edit.allowedMethods());

const file_list = require('./routes/file_listAll');
app.use(file_list.routes(), file_list.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app