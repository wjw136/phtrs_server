var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var orderRouter = require('./routes/order');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();


process.env.PORT = 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// normal router
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/order', orderRouter)
    // catch 404 and forward to error handler
    //中间件从上至下匹配=> 匹配加入堆栈( 堆栈执行根据next顺序 可能会有中间件执行不到)
    //无路径匹配的404 error
    //next('route') 路由组
app.use(function(req, res, next) {
    next(createError(404));
});


//处理错误
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});







module.exports = app;