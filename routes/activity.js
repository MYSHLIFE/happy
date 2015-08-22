var express = require('express');

var index = function(req, res) {
	var render_data = {
		title: '乐活派'
	}
	res.render('index', render_data);
}
var publish = function(req, res) {
	console.log('message');
	var render_data = {
		title: '乐活发布'
	}
	res.render('publish', render_data);
}
var upload = function(req, res) {

	var render_data = {
		title: '上传图片'
	}
	res.render('upload_pic', render_data);
}
var favorite = function(req, res) {

	var render_data = {
		title: '我的收藏'
	}
	res.render('favorite', render_data);
}
var activity_new = function(req, res) {

	var render_data = {
		title: '乐活专题'
	}
	res.render('activity_new', render_data);
}
var activity_cat = function(req, res) {

	var render_data = {
		title: '选择类别'
	}
	res.render('category', render_data);
}
var activity_b = function(req, res) {

	var render_data = {
		title: '组织活动'
	}
	res.render('publish_b', render_data);
}
var activity_c = function(req, res) {

	var render_data = {
		title: '活动分享'
	}
	res.render('publish_c', render_data);
}
var contact = function(req, res) {

	var render_data = {
		title: '我的联系组'
	}
	res.render('contact', render_data);
}
var publish_save = function(req, res) {

	var render_data = {
		title: '保存'
	}
	res.render('publish_save', render_data);
}
var publish_a_edit = function(req, res) {

	var render_data = {
		title: '编辑'
	}
	res.render('publish_a_edit', render_data);
}
var publish_b_edit = function(req, res) {

	var render_data = {
		title: '编辑'
	}
	res.render('publish_b_edit', render_data);
}
module.exports = function(app) {
	console.log('message');
	var __base_path = '/activity';
	app.get(__base_path + '/index', index);
	app.get(__base_path + '/publish', publish);
	app.get(__base_path + '/upload', upload);
	app.get(__base_path + '/favorite', favorite);
	app.get(__base_path + '/activity_new', activity_new);
	app.get(__base_path + '/category', activity_cat);
	app.get(__base_path + '/publish_b', activity_b);
	app.get(__base_path + '/publish_c', activity_c);
	app.get(__base_path + '/contact', contact);
	app.get(__base_path + '/publish_save', publish_save);
	app.get(__base_path + '/publish_a_edit', publish_a_edit);
	app.get(__base_path + '/publish_b_edit', publish_b_edit);

};