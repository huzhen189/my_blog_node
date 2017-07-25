var db = require('../../models/index');


module.exports.getArticleClass = function(req, res) {
  var rows = db.query("SELECT * FROM article_class ORDER BY id ASC;",function(err,rows){
    if( !rows || rows.length < 1){
      res.send({"code":-1,"msg":"暂无标签"})
      return
    }
    res.send({"code":1,"articleClass":rows})
  })
}
