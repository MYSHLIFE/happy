var express = require('express');
var router = express.Router();

/* GET activity page. */
router.get('/', function(req, res) {
	console.log('====================');
  res.render('favorite', { title: '我的收藏' });
});

module.exports = router;
