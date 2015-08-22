var express = require('express');
var router = express.Router();

/* GET activity page. */
router.get('/', function(req, res) {
	console.log('====================');
  res.render('activity_new', { title: '新乐活' });
});

module.exports = router;
