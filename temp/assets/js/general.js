var windowW, windowH;
var mobile = (/ipad|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
// var allJSObject, urlarray, winCW, winW, winH, checkTop = 0,
//     curTop, paddingtop, paddingmaxtop, getPathID, player;

$(document).ready(function() {
    // getWindowWH();
    lazyLoadImages();

    $(document).on('click', 'a[href^="#"]', function (e) {
        // e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 85
        }, 1000, 'linear');

        if($("#navbarToggler").hasClass("show")){
            $("#navbarToggler").removeClass("show");
            $("button.navbarToggler").addClass("collapsed");
        }
    });

    $(window).resize(function() {
        // getWindowWH();
        // landingHeight();
        // carouselNormalization();
    });

    $(window).scroll(function() {
        var scrollHeight = $(window).scrollTop();

        if (scrollHeight > 1) {
            // do something
            $(".ticker-wrap").addClass("hide");
            $(".navbar").addClass("to-top");
        } else {
            $(".ticker-wrap").removeClass("hide");
            $(".navbar").removeClass("to-top");
        }
    });
});

// get window screen width and height
function getWindowWH() {
    windowW = $(window).outerWidth();
    windowH = $(window).outerHeight();
}

// lazyload all the images
function lazyLoadImages() {
    // $(".lazyLoad").lazy();
    $('.lazyLoad').lazy({
        // delay: 5000,

        afterLoad: function(element) {
            // called after an element was successfully handled
            // console.log(element);
            $(element).removeClass("lazyLoad");
        },

    });
}


