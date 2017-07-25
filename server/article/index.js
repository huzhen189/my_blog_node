var articleClass = require('./articleClass');
var getArticle = require('./getArticle');
var make = require('./make');
var lickArticle = require('./lickArticle');
exports._handeles = {
  "getArticleClass" : articleClass.getArticleClass,
  "MakeArticle" : make.MakeArticle,
  "MakeNote" : make.MakeNote,
  "MakeLink" : make.MakeLink,
  "UploadArticleContent" : make.UploadArticleContent,
  "getArticleList" : getArticle.getArticleList,
  "getNoteList" : getArticle.getNoteList,
  "getLinkList" : getArticle.getLinkList,
  "getArticleContent"  : getArticle.getArticleContent,
  "getArticleMessage"  : getArticle.getArticleMessage,
  "lickArticle"  : lickArticle.lickArticle,
  "msgArticle"  : lickArticle.msgArticle



}
