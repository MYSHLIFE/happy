/*
created by ivan .
2015-03-26
 */
//上传附件
var UploadPicView = Backbone.View.extend({

    initialize: function() {
        var self = this;
        self.el = "#upload_pic-content";
        this.template = Handlebars.compile($("#upload_pic_view").html());
        this.bind_event();
    },

    // Renders all of the CollTask models on the UI
    render: function() {
        var self = this;
        // var um = JSON.parse(localStorage.getItem('upload_model'));
        // self.watermark = um.watermark; //是否加水印
        // self.watermark_text = um.watermark_text;
        // self.model = um.model;
        // self.field = um.field;
        // self.sub_field = um.sub_field; //是否有file子字段
        // self.back_url = um.back_url;
        // self.new_width = um.new_width; //直接定义的新宽度
        // console.log(um); //need comment out when prd
        var render_data = {};
        $("#btn-upload_pic-back").attr('href', self.back_url);
        $("#upload_pic-content").html(self.template(render_data));
        setTimeout(function() {
            $("#upload_pic-content input[type=file]").trigger("click");
        }, 1000)
        return this;

    },
    bind_event: function() {
        var self = this;
        $("#upload_pic-content")
            .on('click', '#choosefile', function(event) {
                event.preventDefault();
                // workaround for android 4.4~4.4.2
                // var syscmd = 'cmd://app/choosefile/file4upload';
                // console.log(syscmd);
                // window.location.href = syscmd;
                $("#upload_pic-content input[type=file]").trigger("click");
            })
            .on('click', '#choosefile2', function(event) {
                event.preventDefault();
                // workaround for android 4.4~4.4.2
                if (window.AndroidUploader) {
                    if (window.AndroidUploader.upload) {
                        window.AndroidUploader.upload("javascript:android_uploader_callback('<file_id>')");
                    } else {
                        alert("当前系统不支持AndroidUploader.upload()");
                    };
                } else {
                    alert("当前系统不支持Android本地上传功能");
                };
            })
            .on('click', '#do_upload', function(event) {
                event.preventDefault();
                var file = $("#upload_pic-content input[type=file]")[0].files[0];
                if (file) {
                    $(this).text("正在上传...");
                    // $("#frmUploadPic").submit();
                    // change a new method for resize and upload images
                    if (window.File && window.FileReader && window.FileList && window.Blob) {
                        self.resizeAndUpload(file);
                    } else {
                        alert('The File APIs are not fully supported in this browser.');
                    }

                } else {
                    alert('请选择照片或者拍照！');
                };
            })
            .on('change', 'input[type=file]', function(event) {
                var file = $("input[type=file]")[0].files[0];
                $("#preview").empty();
                self.displayAsImage3(file, "preview");

                $fileinfo = $("#fileinfo");
                $fileinfo.empty();
                if (file && file.name) {
                    $fileinfo.append("<li>名称:<span>" + file.name + "</span></li>");
                }
                if (file && file.type) {
                    $fileinfo.append("<li>类型:<span>" + file.type + " </span></li>");
                }
                if (file && file.size) {
                    $fileinfo.append("<li>大小:<span>" + self.calcSize(file.size) + "</span></li>");
                }

            });
        $("body")

        .on('change', '#android_upload_file_id', function(event) { //通过android上传器上传的文件的id
            event.preventDefault();
            var $this = $(this);
            var file_id = $this.val();
            if (_.isArray(self.model[self.field])) { //如果是数组，就push
                if (!self.sub_field) {
                    self.model[self.field].push(file_id);
                } else {
                    var tmp = {};
                    tmp[self.sub_field] = file_id;
                    tmp['creator'] = $("#login_people").val() || null;
                    self.model[self.field].push(tmp);
                };
            } else { //否则，直接替换－》人员头像
                self.model[self.field] = file_id;
            };
            localStorage.setItem('upload_model_back', JSON.stringify({
                model: self.model
            }))
            localStorage.removeItem('upload_model'); //用完删掉

            // 返回调用页面

            window.setTimeout(function() { //500毫秒后自动跳转回上一个界面
                window.location.href = self.back_url;
            }, 200);
            console.log('上传的文件id是： ' + $this.val());
        });
    },
    displayAsImage3: function(file, containerid) {
        if (typeof FileReader !== "undefined") {
            var container = document.getElementById(containerid),
                img = document.createElement("img"),
                reader;
            img.id = 'preview_img';
            img.width = document.body.clientWidth;
            container.appendChild(img);
            reader = new FileReader();
            reader.onload = (function(theImg) {
                return function(evt) {
                    theImg.src = evt.target.result;
                };
            }(img));
            reader.readAsDataURL(file);
        }
    },
    resizeAndUpload: function(file) {
        var self = this;
        $.canvasResize(file, {
            width: self.new_width || document.body.clientWidth,
            height: 0,
            crop: false,
            quality: 90,
            //rotate: 90,
            callback: function(data, width, height) {
                console.log(data, width, height);
                var mimeString = data.split(',')[0].split(':')[1].split(';')[0];
                console.log(mimeString);
                // $("#upload_pic-content input[type=file]").attr('src', data);
                // 在这里打上水印
                var my_canvas = document.getElementById('my_canvas');
                my_canvas.width = width;
                my_canvas.height = height;
                var ctx = my_canvas.getContext('2d');
                var tmp_img = new Image();
                tmp_img.onload = function(e) {
                    ctx.drawImage(tmp_img, 0, 0);
                    if (self.watermark) { //画水印
                        if (self.watermark_text) { //有第二行的文字，画出来
                            ctx.font = "14px Arial";
                            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                            ctx.fillText(self.watermark_text, 11, 20);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.fillText(self.watermark_text, 10, 21);

                            var text_01 = ['日期:' + moment().format('YYYY-MM-DD HH:mm:ss')];
                            text_01.push('上传人:' + $("#login_people_name").val());
                            ctx.font = "14px Arial";
                            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                            ctx.fillText(text_01.join('  '), 11, 40);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.fillText(text_01.join('  '), 10, 41);
                        } else {
                            var text_01 = ['日期:' + moment().format('YYYY-MM-DD HH:mm:ss')];
                            text_01.push('上传人:' + $("#login_people_name").val());
                            ctx.font = "14px Arial";
                            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                            ctx.fillText(text_01.join('  '), 11, 20);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.fillText(text_01.join('  '), 10, 21);
                        };
                    };

                    // 回显到界面
                    var preview_img = document.getElementById('preview_img');
                    if (mimeString === 'image/png') {
                        preview_img.src = my_canvas.toDataURL('image/png');
                    } else {
                        preview_img.src = my_canvas.toDataURL('image/jpeg', 0.9);
                    };

                    // 上传

                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function(ev) {
                        // document.getElementById('filesInfo').innerHTML = 'Done!';

                        if (ev.target.readyState == 4) {
                            if (ev.target.status == 200) {
                                $("#do_upload").text('上传成功');
                                var res = JSON.parse(ev.target.responseText);

                                // 利用local storage传递数据

                                // self.model[self.field].push(res._id);

                                if (_.isArray(self.model[self.field])) { //如果是数组，就push
                                    if (!self.sub_field) {
                                        self.model[self.field].push(res._id);
                                    } else {
                                        var tmp = {};
                                        tmp[self.sub_field] = res;
                                        tmp['creator'] = {
                                            _id: $("#login_people").val() || null,
                                            people_name: $("#login_people_name").val() || null,
                                        };
                                        self.model[self.field].push(tmp);
                                    };
                                } else { //否则，直接替换－》人员头像
                                    self.model[self.field] = res._id;
                                };

                                localStorage.setItem('upload_model_back', JSON.stringify({
                                    model: self.model
                                }))
                                localStorage.removeItem('upload_model'); //用完删掉

                                // 返回调用页面

                                window.setTimeout(function() { //500毫秒后自动跳转回上一个界面
                                    window.location.href = self.back_url;
                                }, 200);
                            } else {
                                $("#do_upload").text('上传失败');
                            };

                            // console.log(res);
                        };
                        // console.log(ev);
                    };

                    xhr.open('POST', '/gridfs/put', true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    var post_data = 'data=' + encodeURIComponent(preview_img.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
                    // var post_data = 'data=' + data;
                    post_data += '&file_name=' + file.name;
                    post_data += '&file_type=' + file.type;
                    // console.log(post_data);
                    xhr.send(post_data);

                }
                tmp_img.src = data;

            }
        });
    },
    calcSize: function(size) {
        if (size < 1024) {
            return $.sprintf('%0.2f B', size);
        } else if (size >= 1024 && size < 1048576) { //1024 * 1024
            return $.sprintf('%0.2f KB', size / 1024);
        } else if (size >= 1048576 && size < 1073741824) { //1024^3
            return $.sprintf('%0.2f MB', size / 1048576);
        } else if (size >= 1073741824) {
            return $.sprintf('%0.2f GB', size / 1073741824);
        };
    },

});
var 
    upload_view = new UploadPicView()
$(document).ready(function() {
    upload_view.render();
});
