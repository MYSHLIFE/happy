/*
created by ivan .
2015-04-02
 */
//我的收藏
var panel_open = false;
jQuery(document).ready(function($) {
    $("body").on("mouseover", ".regist_button", function(event) {
            event.preventDefault();
            $(this).css("background-color", "#E91E63");

        }).on("mouseout", ".regist_button", function(event) {
            event.preventDefault();
            $(this).css("background-color", "white");

        })
        .on("click", ".activity_logo", function(event) {
            event.preventDefault();
            if (!panel_open) {
                var left_panel = document.createElement("div");
                var ul_tag = '<ul>';
                ul_tag += '<li class="index_li">首页</li>';
                ul_tag += '<li class="index_li">乐活专题</li>';
                ul_tag += '<li class="index_li">最新推荐</li>';
                ul_tag += '<li class="index_li">发布乐活</li>';
                ul_tag += '</ul>';
                $(left_panel).append(ul_tag);
                var login_regist_div = '<div class="panel_position">';
                login_regist_div += '<button class="panel_login1">注册</button>';
                login_regist_div += '<button class="panel_regist1">登录</button>';
                login_regist_div += '</div>';

                $(left_panel).append(login_regist_div).height($(window).height()).width($(window).width() / 2)
                    .css("background-color", "rgb(163, 15, 59)")
                    .css("z-index", 1000)
                    .css("position", "absolute")
                    .css("top", "0px").attr("id", "panel").attr("class", "panel");
                $(".activity_logo").append(left_panel);
                panel_open = true;

            } else {
                $(".panel").show();
            }

        }).on("click",".panel_login1",function(event){
            event.preventDefault();
            window.location.href="/personal/login";
        }).on("click",".panel_regist1",function(event){
            event.preventDefault();
            window.location.href="/personal/login";
        }).on("click",".regist_button",function(event){
            event.preventDefault();
            $.post("/personal/login",function(data){
                
            })
        })
    $(document).mouseup(function(e) {
        var _con = $('.panel'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            $(".panel").hide();
        }
    })
})