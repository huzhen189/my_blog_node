var db = require('../../models/index');
var utils = require('../../utils/index');


module.exports.MakeArticle = function(req, res) {
  var title = req.query.title;
  var articleCass = req.query.article_class;
  var imgUrl = req.query.img_url;
  var userId = req.query.user_id;
  if(!userId || userId == ""){
    res.send({"code":-1,"msg":"请重新登录"})
    return
  }
  if(!imgUrl || imgUrl == ""){//如果没有上传封面
    imgUrl = "http://optybmvlb.bkt.clouddn.com/8888888888.png" //默认一个封面
  }
  var timeNow = utils.getTimeNow()
  db.query(
    "INSERT INTO article SET user_id=?,title=?,cover_img=?,creat_t=?,update_t=?,class_id=?",
    [Number(userId),title,imgUrl,timeNow,timeNow,Number(articleCass)],
    function(err,rows){
      if(err) {
          console.log(err)
          res.send({"code":0,"msg":"发表失败: " + err.message})
          return
      }
      console.log('Id inserted: ' + rows.insertId);
      res.send({"code":1,"msg":"发表成功","id":rows.insertId})
  })
}
module.exports.MakeNote = function(req, res) {
  var articleCass = req.query.article_class;
  var content = req.query.content;
  var userId = req.query.user_id;
  if(!userId || userId == ""){
    res.send({"code":-1,"msg":"请重新登录"})
    return
  }
  var timeNow = utils.getTimeNow()
  db.query(
    "INSERT INTO note SET user_id=?,content=?,creat_t=?,update_t=?,class_id=?",
    [Number(userId),content,timeNow,timeNow,Number(articleCass)],
    function(err,rows){
      if(err) {
          console.log(err)
          res.send({"code":0,"msg":"发表失败: " + err.message})
          return
      }
      console.log('Id inserted: ' + rows.insertId);
      res.send({"code":1,"msg":"发表成功","id":rows.insertId})
  })
}
module.exports.MakeLink = function(req, res) {
  var title = req.query.title;
  var articleCass = req.query.article_class;
  var link_url = req.query.link_url;
  var userId = req.query.user_id;
  var content = req.query.content;
  if(!userId || userId == ""){
    res.send({"code":-1,"msg":"请重新登录"})
    return
  }
  var timeNow = utils.getTimeNow()
  db.query(
    "INSERT INTO link SET user_id=?,title=?,link_url=?,content=?,creat_t=?,update_t=?,class_id=?",
    [Number(userId),title,link_url,content,timeNow,timeNow,Number(articleCass)],
    function(err,rows){
      if(err) {
          console.log(err)
          res.send({"code":0,"msg":"发表失败: " + err.message})
          return
      }
      console.log('Id inserted: ' + rows.insertId);
      res.send({"code":1,"msg":"发表成功","id":rows.insertId})
  })
}
module.exports.UploadArticleContent = function(req, res) {
  var article_id = req.query.article_id;
  var content = req.query.content;
  var userId = req.query.user_id;
  if(!userId || !article_id){
    res.send({"code":-1,"msg":"提交失败，请刷新重试"})
    return
  }
  var timeNow = utils.getTimeNow()
  var rows = db.query(
    "UPDATE article SET content=?,update_t=? where id=? and user_id=?",
    [content,timeNow,article_id,Number(userId)],
    function(err,rows){
      if(err) {
          console.log(err)
          res.send({"code":0,"msg":"你不是这篇文章的发表者"})
          return
      }
      res.send({"code":1,"msg":"发表成功"})
  })
}
