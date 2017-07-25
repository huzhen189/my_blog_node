var user = require('./user/index');
var action = require('./action/index');
var article = require('./article/index');
exports.all_handeles = {
  "user"          :     user._handeles,
  "action"        :     action._handeles,
  "article"       :     article._handeles,
}
