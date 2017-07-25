var qiniu = require("qiniu");
var config = require('../../config/config');



qiniu.conf.ACCESS_KEY = config.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.QINIU_SECRET_KEY;
article_bucket = config.QINIU_ARTICLE_IMG_BUCKET;

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
}

module.exports.getImgUpToken = function(req, res) {
    var token_ = uptoken(article_bucket,"")
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({"msg":0,"uptoken":token_})
}

module.exports.getPublicImgUpToken = function(req, res) {
    var filename = req.query.file_name;
    var spaceName = req.query.space_ame;
    if(!filename || filename == ""){
      filename = GetTimeNow()+Math.floor(Math.random()*10)+".jpg"
    }
    var token_ = uptoken(spaceName,filename)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({"msg":0,"uptoken":token_})
}

module.exports.doQiniuPicPersist = function(req, res) {
    console.log(req.query)
    var token_ = uptoken(article_bucket,"")
    console.log(token_)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({"msg":0,"uptoken":token_})
}


module.exports.getTimeNow = GetTimeNow

function GetTimeNow(){
  return (new Date()).valueOf();
}
