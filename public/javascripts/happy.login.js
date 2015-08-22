/*
created by ivan .
2015-04-02
 */
//我的收藏
var panel_open = false;
jQuery(document).ready(function($) {



    $("body").on("mouseover", ".regist_button,.login_button", function(event) {
        event.preventDefault();
        $(this).css("background-color", "#E91E63");

    }).on("mouseout", ".regist_button,.login_button", function(event) {
        event.preventDefault();
        $(this).css("background-color", "white");

    })

    .on("click", ".activity_logo", function(event) {
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
                $("label").addClass('opacity');
                $(".col-xs-12").addClass('z_index');
                                $(".login_regist").children().addClass('z_index');

                // $("a").addClass('z_index');


            } else {
                $(".panel").show();
                $("label").addClass('opacity');
                $(".col-xs-12").addClass('z_index');
                $(".login_regist").children().addClass('z_index');


            }
            // $("left_panel").css("background-color", "blue");

        }).on("click", ".tag_p2", function(event) {
            event.preventDefault();

            $(".tag1").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {});
            $(".tag_p1").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {});
            $(this).animate({
                    opacity: 1
                },
                "slow",
                function() {});
            $(".tag2").animate({
                    opacity: '0.9'
                },
                "slow",
                function() {});
            $(".regist,.regist_info").removeClass("hidden");
            $(".login,.login_info").addClass("hidden");
            $(".activity_regist_new").html("注 册");
            $(".activity_head_mood").html("完善新乐活账户信息");


        })
        .on("click", ".tag_p1", function(event) {
            event.preventDefault();

            $(".tag2").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {});
            $(".tag_p2").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {});
            $(this).animate({
                    opacity: 1
                },
                "slow",
                function() {});
            $(".tag1").animate({
                    opacity: '0.9'
                },
                "slow",
                function() {});
            $(".regist,.regist_info").addClass("hidden");
            $(".login,.login_info").removeClass("hidden");
            $(".activity_regist_new").html("登录");
            $(".activity_head_mood").html("登录你的新乐活账户");


        }).on("click", ".panel_login1", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        }).on("click", ".panel_regist1", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        })
    $(document).click(function(e) {
        var _con = $('.panel'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            $(".panel").hide();
            $("label").removeClass('opacity');
            $(".col-xs-12").removeClass('z_index');
            $(".login_regist").find("a").removeClass('z_index');

        }
    })
    $(document).on("touchend", "body", function(e) {
        var _con = $('.panel'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            $(".panel").hide();
            // $(".index").children().removeClass('z_index');
            $("label").removeClass('opacity');
            $(".col-xs-12").removeClass('z_index');
            $(".login_regist").find("a").removeClass('z_index');

        }
    })
})