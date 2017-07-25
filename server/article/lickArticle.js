var db = require('../../models/index');
var utils = require('../../utils/index');

module.exports.lickArticle = function(req, res) {
  var user_id = req.query.user_id;
  var article_id = req.query.article_id;
  var type = req.query.type;
  var sql = "INSERT INTO article_like SET user_id=?,article_id=?"
  var like_cnt_change = 1
  if(type == "unlick") {
    sql = "DELETE FROM article_like WHERE user_id=? AND article_id=?"
    like_cnt_change = -1
  }
  db.query(sql,[user_id,article_id],function(err,rows){
    if(err){
      console.log(err)
      res.send({"code":-1,"msg":"已经点过赞了！"})
      return
    }
    db.query("update article set like_cnt=like_cnt+'?' where id=?" ,[like_cnt_change,article_id],function(err,rows){
      if(err){
        console.log(err)
        res.send({"code":-1,"msg":"已经点过赞了！"})
        return
      }
      res.send({"code":1,"msg":"操作成功"})
    })
  })
}

module.exports.msgArticle = function(req, res) {
  var user_id = req.query.user_id;
  var article_id = req.query.article_id;
  var content = req.query.message_content;
  var messageType = req.query.message_type;
  var messageId = req.query.message_id;
  var type = req.query.type;
  var timeNow = utils.getTimeNow()

  var sql = "INSERT INTO message SET type=?,is_delete=0,user_id=?,article_id=?,creat_t=?,content=?"
  var sqlArr = [messageType,user_id,article_id,timeNow,content]
  var comment_cnt_change = 1
  if(type == "delete") {
    sql = "UPDATE message SET is_delete=1 WHERE id=?"
    sqlArr = [message_id]
    comment_cnt_change = -1
  }
  db.query(sql,sqlArr,function(err,rows){
    if(err){
      console.log(err)
      res.send({"code":-1,"msg":"操作失败"})
      return
    }
    db.query("update article set comment_cnt=comment_cnt+'?' where id=?" ,[comment_cnt_change,article_id],function(err,rows){
      if(err){
        console.log(err)
        res.send({"code":-1,"msg":"操作失败"})
        return
      }
      res.send({"code":1,"msg":"操作成功"})
    })
  })
}
