/*
created by ivan .
2015-03-27
 */
//新乐活
jQuery(document).ready(function($) {

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
        }).on("click", ".panel_login1", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        }).on("click", ".panel_regist1", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        })
})