// 引入模块
var express         = require('express');
var cookieParser    = require('cookie-parser');
var path            = require('path');
var routers         = require('./server/routers');

var app = express();

app.use(cookieParser());


// 新增接口路由
app.get('/api/:module/:action', function (req, res, next) {
    var c_module = req.params.module;
    var c_action = req.params.action;
    try {
      routers["all_handeles"][c_module][c_action](req,res);
    } catch(e){
      console.log(e)
      res.send("This Action Not Found!");
    }
});
app.post('/api/:module/:action', function (req, res, next) {
    var c_module = req.params.module;
    var c_action = req.params.action;
    try {
      routers["all_handeles"][c_module][c_action](req,res);
    } catch(e){
      console.log(e)
      res.send({"code":-1,"msg":"异常，请刷新页面重试"})
    }
});

// 对所有(/)URL或路由返回index.html
app.get('/', function (req, res) {
    res.render('index');
});
// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function(){
    var port = server.address().port;
    console.log('Listening at http://%s:%s', port);
});
