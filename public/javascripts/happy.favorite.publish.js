/*
created by ivan .
2015-03-28
 */
//我的收藏
jQuery(document).ready(function($) {
    var panel_open = false;



    $("body").on("click", ".tag_new_p2", function(event) {
            event.preventDefault();

            $(".tag_new1").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag_new_p1").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(this).animate({
                    opacity: 1
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag_new2").animate({
                    opacity: '0.9'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".activity_head_new").html("我的评论");

        })
        .on("click", ".tag_new_p1", function(event) {
            event.preventDefault();

            $(".tag_new2").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag_new_p2").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(this).animate({
                    opacity: 1
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag_new1").animate({
                    opacity: '0.9'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".activity_head_new").html("我的收藏");


        }).on("click", ".activity_logo", function(event) {
            event.preventDefault();
            event.stopPropagation();

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
                $(".index").children().addClass('z_index');


            } else {
                $(".panel").show();
                $(".index").children().addClass('z_index');
                // panel_open = true;
            }
            // $("left_panel").css("background-color", "blue");

        }).on("click",".panel_login1",function(event){
            event.preventDefault();
            window.location.href="/personal/login";
        }).on("click",".panel_regist1",function(event){
            event.preventDefault();
            window.location.href="/personal/login";
        })
    $(document).click(function(e) {
        var _con = $('.panel'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            $(".panel").hide();
            $(".index").children().removeClass('z_index');

        }
    })
       $(document).on("touchend", "body", function(e) {
            var _con = $('.panel'); // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $(".panel").hide();
                            $(".index").children().removeClass('z_index');

            }
        })
})