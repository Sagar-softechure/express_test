var express = require('express');
var router = express.Router();

var userdata = [
  {name: 'John', age: 20},
  {name: 'Jane', age: 21},
  {name: 'Jim', age: 22}
]

router.get('/', function(req, res, next) {
  res.render('index', { title: 'hello world', userdata: userdata });
  // res.send('Hello user');
});


module.exports = router;
  