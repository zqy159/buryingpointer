// mysql数据库的应用
var mysql = require('mysql');
var express = require('express');
var app = express()
var bodyParser = require('body-parser')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing appli
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'burying_db'
});
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

function resLog(code) {

}
// 获取当前时间
function getDate(sign = "-") {
  let date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    date: year + sign + month + sign + day + ' ' + hour + sign + minute + sign + second
  }
}
// 获取埋点信息
app.get('/api/getBuryingData', function (req, res) {
  connection.query('select * from burying_tb', function (error, results, fields) {
    if (error) throw error;
    res.send({
      code: 0,
      data: results
    });
  });

});
// 设置埋点
app.post('/api/setBuryingData', function (req, res) {
  let data = req.body
  connection.query(`select * from burying_tb where elementName='${data.elementName}' or selectElement='${data.selectElement}'`, function (error, results, fields) {
    if (error) throw error;
    if (!results.length) {
      connection.query(`insert into burying_tb(elementName,nodeType,selectElement,clickNum,date,localtionPath) 
      VALUES('${data.elementName}','${data.nodeType}','${data.selectElement}',0,'${getDate().date}','${data.localtionPath}')`, function (error, results, fields) {
          if (error) throw error;
          res.send({
            code: 0,
            msg: '成功！'
          });
        })
    } else {
      res.send({
        code: 1,
        msg: '该元素已经添加了事件或者重名！'
      });
    }
    console.log(error, results)
  });

});
// 触发埋点
app.post('/api/emitBurying', function (req, res) {
  let data = req.body
  connection.query(`select * from burying_tb where id='${data.id}'`, function (error, results, fields) {
    if (error) throw error;
    let index = results[0].clickNum + 1
    console.log(index)
    connection.query(`update burying_tb set clickNum = ${index} where id = ${data.id};`, function (error, results, fields) {
      if (error) throw error;
      res.send({
        code: 0,
        msg: '成功！'
      });
    })

  })



});
app.listen(3000);