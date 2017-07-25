var db = require('../../models/index');
var func = require('../../models/func');


module.exports.getArticleList = function(req, res) {
  var bgCnt = req.query.begin_cnt;
  var edCnt = req.query.end_cnt;
  var type = req.query.search_type;
  var order = req.query.order_type;
  var userId = req.query.user_id;
  if (!userId || userId=="") {
    var userInfo = eval("("+req.cookies.user_info+")")
    if(userInfo) userId=userInfo.id
  }
  if(!bgCnt || !edCnt || !type ){
    res.send({"code":-1,"msg":"异常，请刷新页面重试"})
    return
  }

  var sql = "SELECT article.id,article.user_id,article.title,article.cover_img,article.creat_t,article.update_t,"+
  "article.read_cnt,article.like_cnt,article.comment_cnt,user_info.nick,user_info.sex,user_info.grade,user_info.img_url,article_class.name as class_name"+
  " FROM article,user_info,article_class WHERE article.user_id=user_info.id and article.class_id=article_class.id and article.is_delete=0 ORDER BY " +type+" "+order +" limit ?,?"
  db.query(sql,[Number(bgCnt),Number(edCnt-bgCnt)],function(err,rows){
    if(err) {
        console.log(err)
        res.send({"code":-1,"msg":"拉取文章失败: " + err.message})
        return
    }
    if( !rows || rows.length < 1){
      res.send({"code":-1,"msg":"没有文章了"})
      return
    }
    var user_id = Number(userId)
    if(isNaN(user_id) || user_id < 1){//如果用户未登录，或者user_id有错误登录,直接返回
      res.send({"code":1,"articleList":rows})
      return
    }else {
      func.getUserLike(user_id,rows,res)
    }
  })
}


module.exports.getNoteList = function(req, res) {
  var bgCnt = req.query.begin_cnt;
  var edCnt = req.query.end_cnt;
  var type = req.query.search_type;
  var order = req.query.order_type;
  var userId = req.query.user_id;
  if (!userId || userId=="") {
    var userInfo = eval("("+req.cookies.user_info+")")
    if(userInfo) userId=userInfo.id
  }
  if(!bgCnt || !edCnt || !type ){
    res.send({"code":-1,"msg":"异常，请刷新页面重试"})
    return
  }

  var sql = "SELECT note.id,note.user_id,note.content,note.creat_t,note.update_t,"+
  "article_class.name as class_name"+
  " FROM note,article_class WHERE note.class_id=article_class.id AND note.user_id=? AND note.is_delete=0 ORDER BY " +type+" "+order +" limit ?,?"
  db.query(sql,[Number(userId),Number(bgCnt),Number(edCnt-bgCnt)],function(err,rows){
    if(err) {
        console.log(err)
        res.send({"code":-1,"msg":"拉取笔记失败: " + err.message})
        return
    }
    if( !rows || rows.length < 1){
      res.send({"code":-1,"msg":"没有笔记了"})
      return
    }
    res.send({"code":1,"noteList":rows})
    return

  })
}

module.exports.getLinkList = function(req, res) {
  var bgCnt = req.query.begin_cnt;
  var edCnt = req.query.end_cnt;
  var type = req.query.search_type;
  var order = req.query.order_type;
  var userId = req.query.user_id;
  if (!userId || userId=="") {
    var userInfo = eval("("+req.cookies.user_info+")")
    if(userInfo) userId=userInfo.id
  }
  if(!bgCnt || !edCnt || !type ){
    res.send({"code":-1,"msg":"异常，请刷新页面重试"})
    return
  }

  var sql = "SELECT link.id,link.user_id,link.content,link.title,link.link_url,link.creat_t,link.update_t,"+
  "article_class.name as class_name"+
  " FROM link,article_class WHERE link.class_id=article_class.id AND link.user_id=? AND link.is_delete=0 ORDER BY " +type+" "+order +" limit ?,?"
  db.query(sql,[Number(userId),Number(bgCnt),Number(edCnt-bgCnt)],function(err,rows){
    if(err) {
        console.log(err)
        res.send({"code":-1,"msg":"拉取采用失败"})
        return
    }
    if( !rows || rows.length < 1){
      res.send({"code":-1,"msg":"没有采用了"})
      return
    }
    res.send({"code":1,"linkList":rows})
    return

  })
}
module.exports.getArticleContent = function(req, res) {
  var article_id = req.query.article_id;
  var userId = req.query.user_id;
  if (!userId || userId=="") {
    var userInfo = eval("("+req.cookies.user_info+")")
    if(userInfo) userId=userInfo.id
  }
  if(!article_id){
    res.send({"code":-1,"msg":"异常，请刷新页面重试"})
    return
  }
  var sql = "SELECT article.user_id,article.content,article.title,article.creat_t,article.update_t,"+
  "article.read_cnt,article.like_cnt,article.comment_cnt,user_info.nick,user_info.sex,user_info.grade,user_info.img_url,article_class.name as class_name"+
  " FROM article,user_info,article_class WHERE article.user_id=user_info.id and article.class_id=article_class.id AND article.is_delete=0 AND article.id=?"
  var content = null
  db.query(sql,[article_id],function(err,rows){
    if(err) {
        console.log(err)
        res.send({"code":-1,"msg":"该文章已被删除: " + err.message})
        return
    }
    if( !rows || rows.length < 1){
      res.send({"code":-1,"msg":"该文章已被删除"})
      return
    }
    content = rows[0]
    content.is_like=false
    var user_id = Number(userId)
    if(isNaN(user_id) || user_id < 1){
      res.send({"code":1,"article":content})
      return
    }else {
      db.query("SELECT COUNT(*) AS islike FROM article_like WHERE user_id=? and article_id=?",[user_id,article_id],function(err,likeRows){
        if(err){
          console.log(err)
          res.send({"code":1,"article":content})
          return
        }
        if(likeRows[0].islike == 1){
          content.is_like = true
        }
        res.send({"code":1,"article":content})
        return;
      })
    }

  })
}

module.exports.getArticleMessage = function(req, res) {
  var bgCnt = req.query.begin_cnt;
  var edCnt = req.query.end_cnt;
  var articleId = req.query.article_id;
  var userId = req.query.user_id;
  if (!userId || userId=="") {
    var userInfo = eval("("+req.cookies.user_info+")")
    if(userInfo) userId=userInfo.id
  }
  if(!bgCnt || !edCnt || !articleId){
    res.send({"code":-1,"msg":"异常，请刷新页面重试"})
    return
  }

  var sql = "SELECT message.id,message.user_id,message.content,message.creat_t,message.lick_cnt,"+
  "user_info.nick,user_info.sex,user_info.grade,user_info.img_url FROM message,user_info WHERE message.user_id=user_info.id AND message.article_id=? ORDER BY message.creat_t DESC limit ?,?"
  db.query(sql,[articleId,Number(bgCnt),Number(edCnt-bgCnt)],function(err,rows){
    if(err) {
        console.log(err)
        res.send({"code":-1,"msg":"拉取评论失败: " + err.message})
        return
    }
    if( !rows || rows.length < 1){
      res.send({"code":-1,"msg":"没有评论了"})
      return
    }
    res.send({"code":1,"messageList":rows})

  })
}
