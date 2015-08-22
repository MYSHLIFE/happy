var express = require('express');
var index = function(req, res) {
	var render_data = {
		title: '乐活派'
	}
	res.render('index', render_data);
}
var login = function(req, res) {
	var render_data = {
		title: '乐活登录'
	}
	res.render('login', render_data);
}
var regist = function(req, res) {
	var render_data = {
		title: '乐活注册'
	}
	res.render('regist', render_data);
}

var login_auth = function(req, res) { //乐活登录验证

}

var regist_save = function(req, res) { //乐活数据注册

}
module.exports = function(app) {
	var __base_path = '/personal';
	app.get('/', index);

	app.get(__base_path + '/login', login); //login
	app.get(__base_path + '/regist', regist); //regist
	app.post(__base_path + 'login', login_auth); //login auth
	app.post(__base_path + 'regist', regist_save); //regist_save


};