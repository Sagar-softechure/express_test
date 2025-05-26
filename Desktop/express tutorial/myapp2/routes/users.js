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


module.exports = router;
