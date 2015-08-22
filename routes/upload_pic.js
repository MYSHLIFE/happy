var express = require('express');
var router = express.Router();

/* GET activity page. */
router.get('/', function(req, res) {
  res.render('upload_pic', { title: '上传图片' });
});

module.exports = router;
