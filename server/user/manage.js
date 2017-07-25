var db = require('../../models/index');
var cookieParser = require('cookie-parser');
var func = require('../../models/func');

module.exports.login = function(req, res) {
  var account = req.query.account;
  var pass_word = req.query.password;
  var memory_ = req.query.memory;
  if(!account || !pass_word){
    res.send({"code":0,"msg":"请输入账号密码"})
    return
  }
  var rows = db.query("SELECT id,nick,sex,phone,address,score,grade,introduction,img_url,bc_img FROM user_info where account = ? and pass_word = ?",[account,pass_word],function(err,rows){
    if(err || !rows || rows.length < 1){
      res.send({"code":0,"msg":"账号密码不正确"})
      return
    }
    var saveTime = 864000*1000
    if(memory_ == "true" || memory_ == true){
      saveTime*10
    }
    res.cookie('user_info', JSON.stringify(rows[0]), { path: '/', maxAge: saveTime });
    res.send({"code":1,"data":rows[0]})
  })
}
module.exports.creat = function(req, res) {
  var account = req.query.account;
  var pass_word = req.query.password;
  var nick = req.query.nick;
  var sex = req.query.sex;
  var memory_ = req.query.memory;
  if(!account || !pass_word){
    res.send({"code":0,"msg":"请输入账号密码"})
    return
  }
  var rows = db.query("INSERT INTO user_info(account,pass_word,nick,sex)  VALUES(?,?,?,?)",[account,pass_word,nick,sex],function(err,rows){
    if(err){
      res.send({"code":0,"msg":"注册失败"})
      return
    }
    func.getUserInfo(rows.insertId,res)
  })
}

module.exports.getUerInfo = function(req, res) {
  var user_id = req.query.user_id;
  if(!user_id || user_id==""){
    res.send({"code":0,"msg":"请登录"})
    return
  }
  var rows = db.query("SELECT * FROM user_info where id = ?",[user_id],function(err,rows){
    if( !rows || rows.length < 1){
      res.send({"code":0,"msg":"用户不存在"})
      return
    }
    res.cookie('user_info', JSON.stringify(rows[0]), { path: '/', maxAge: 864000 });
    res.send({"msg":0,"data":rows[0]})
  })
}
