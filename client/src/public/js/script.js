$(document).ready(function () {
    $('.video').click(function () { this.paused ? this.play() : this.pause(); });
});

//----------------------------------------------------//
//---------------- JTinder Initialize ----------------//
//----------------------------------------------------//


$('.actions a.like').click(function (e) {
    e.preventDefault();
    let beingSwiped = $('#tinderslide ul div:last-child');
    beingSwiped.animate({
        transform: 'translateX(900px)',
        transform: 'rotate(90deg)'
    })
    beingSwiped.remove();
});



$("#tinderslide").jTinder({
    // dislike callback
    onDislike: function (item) {
        // set the status text
        // $('#status').html('Choose Wisely!');
    },
    // like callback
    onLike: function (item) {
        // set the status text
        // $('#status').html('Good Move!');
        // console.log(item);

        console.log(item);
        var gotLikedId = item["0"].children[1].id;
        var userWhoLikedId = $("#" + gotLikedId).parents().eq(2).attr("class");
        console.log("just got liked yo", gotLikedId);
        console.log("I just liked you yo", userWhoLikedId);

        // ajax to post to API to send to database table MATCHES
        // $.ajax({
        //     type: "POST",
        //     url: "/api/matches",
        //     // contentType: "application/json; charset=utf-8",
        //     // timeout: 4000,
        //     data: {
        //         glid: gotLikedId,
        //         wlid: userWhoLikedId
        //     },
        //     success: function (data) {
        //         //show content
        //         console.log('Success!');
        //     },
        //     error: function (jqXHR, textStatus, err) {
        //         //show error message
        //         // console.log('text status ' + textStatus + ', err ' + err);
        //     }
        // });
    },
    animationRevertSpeed: 200,
    animationSpeed: 400,
    threshold: 1,
    likeSelector: '.like',
    dislikeSelector: '.dislike'
});

/**
* Set button action to trigger jTinder like & dislike.
*/
$('.actions .like, .actions .dislike').click(function (e) {
    e.preventDefault();
    $("#tinderslide").jTinder($(this).attr('class'));
});
