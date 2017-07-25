var db = require('./index');


module.exports.getUserLike = function(user_id,articleList,res) {
  db.query("SELECT * FROM article_like WHERE user_id=?",[user_id],function(err,rows){
    if(err){
      console.log(err)
      res.send({"code":1,"articleList":articleList})
      return
    }
    for(var i=0;i<articleList.length;i++){ //便利文章列表
      articleList[i].is_like = false
      for (var j = 0; j < rows.length; j++) {//便利所有用户点赞的文章id
        if(articleList[i].id == rows[j].article_id){  //如果两个相等，则说明点赞了
          articleList[i].is_like = true;
          break;
        }
      }
    }
    res.send({"code":1,"articleList":articleList})
    return;
  })
}
module.exports.getUserInfo = function(user_id,res){
  console.log(user_id);
  var rows = db.query("SELECT id,nick,sex,phone,address,score,grade,introduction,img_url,bc_img FROM user_info where id = ?",[user_id],function(err,rows){
    if(err){
      console.log(err)
      res.send({"code":0,"msg":"获取用户信息失败"})
      return
    }
    var saveTime = 864000*1000*10    
    res.cookie('user_info', JSON.stringify(rows[0]), { path: '/', maxAge: saveTime });
    res.send({"code":1,"data":rows[0]})
  })
}
