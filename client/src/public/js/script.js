$(document).ready(function () {
    $('.video').click(function () { this.paused ? this.play() : this.pause(); });
});
//----------------------------------------------------//
//---------------- JTinder Initialize ----------------//
//----------------------------------------------------//

$("#tinderslide").jTinder({
    // dislike callback
    onDislike: function (item) {
        // set the status text
        $('#status').html('Choose Wisely!');
    },
    // like callback
    onLike: function (item) {
        // set the status text
        $('#status').html('Good luck! Hope you two match!');
        // console.log(item);

        var gotLikedId = item["0"].children[1].id;
        var userWhoLikedId = $("#" + gotLikedId).parents().eq(2).attr("class");
        console.log("just got liked yo", gotLikedId);
        console.log("I just liked you yo", userWhoLikedId);
        // ajax to post to API to send to database table MATCHES
        $.ajax({
            type: "POST",
            url: "/api/matches",
            // contentType: "application/json; charset=utf-8",
            // timeout: 4000,
            data: {
                glid: gotLikedId,
                wlid: userWhoLikedId
            },
            success: function (data) {
                //show content
                console.log('Success!');
            },
            error: function (jqXHR, textStatus, err) {
                //show error message
                // console.log('text status ' + textStatus + ', err ' + err);
            }
        });
    },
    animationRevertSpeed: 200,
    animationSpeed: 400,
    threshold: 1,
    likeSelector: '.like',
    dislikeSelector: '.dislike'
});