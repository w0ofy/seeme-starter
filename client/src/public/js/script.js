setTimeout(function () {
    if ($('.empty').length) {

        $('.user-container').addClass("hundred");

    }
    else {
        $('.user-container').removeClass("hundred");
    }
}, 300);

if($("#register-box").length !== 0) {
    $("body").css("background", "rgba(125, 5, 174, 0.75)")
}