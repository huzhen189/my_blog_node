var mysql = require('mysql');
var config = require('../config/config');
var pool  = mysql.createPool(config.MYSQL_CONFIG);

module.exports.query = query

function query(sql, arr,callback) {
  var query_rows //用来返回查询结果
  var query_err = false//判断查询过程中是否出错
  pool.getConnection(function(err, connection) {
    if(err) {
      callback(err, null);
      return
    }
    connection.query(sql, arr,function(err, rows) {
        callback(err, rows);
        connection.release();
    });
  });
}
