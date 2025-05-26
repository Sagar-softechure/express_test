var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/^\/\d+/', (req, res, next) => {
  if(!req.params[0]){
    res.status(400).send('search not found1');
    next('route');
  }
  res.send('search user ' + req.params[0]);
});

router.get('/',(req, res) => {
  res.send('search not found2');
});

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
