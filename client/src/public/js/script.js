setTimeout(function () {
    if ($('.empty').length) {

        $('.user-container').addClass("hundred");

    }
    else {
        $('.user-container').removeClass("hundred");
    }
}, 300);