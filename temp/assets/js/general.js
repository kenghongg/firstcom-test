var windowW, windowH;
var mobile = (/ipad|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
// var allJSObject, urlarray, winCW, winW, winH, checkTop = 0,
//     curTop, paddingtop, paddingmaxtop, getPathID, player;

$(document).ready(function() {
  // getWindowWH();
  lazyLoadImages();

  $(document).on('click', 'a[href^="#"]', function(e) {
    // e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - 85
    }, 1000, 'linear');

    if ($("#navbarToggler").hasClass("show")) {
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

  var mySwiper = new Swiper('#releaseSwiper', {
    // Optional parameters
    // direction: 'vertical',
    slidesPerView: 1,
    // spaceBetween: 30,
    autoplay: {
      delay: 5000,
    },
    loop: true,

    // If we need pagination
    pagination: {
      el: '#releaseSwiper .swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '#releaseSwiper .swiper-button-next',
      prevEl: '#releaseSwiper .swiper-button-prev',
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  })

  var myPartnerSwiper = new Swiper('#partnerSwiper', {
    // Optional parameters
    slidesPerView: 2,
    // spaceBetween: 30,
    autoplay: {
      delay: 5000,
    },
    loop: true,

    // If we need pagination
    pagination: {
      el: '#partnerSwiper .swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '#partnerSwiper .swiper-button-next',
      prevEl: '#partnerSwiper .swiper-button-prev',
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
    }
  })
});

// // Youtube Function start
// //play when video is visible
// var videos = document.getElementsByTagName("iframe"), fraction = 0.8;

// function checkScroll() {
//   for(var i = 0; i < videos.length; i++) {
//     var video = videos[i];
//     var x = 0,
//         y = 0,
//         w = video.width,
//         h = video.height,
//         r, //right
//         b, //bottom 
//         visibleX, visibleY, visible,
//         parent;
//     parent = video;
//     while (parent && parent !== document.body) {
//       x += parent.offsetLeft;
//       y += parent.offsetTop;
//       parent = parent.offsetParent;
//     }

//     r = x + parseInt(w);
//     b = y + parseInt(h);
  
//     visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
//     visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
//     visible = visibleX * visibleY / (w * h);
//     if (visible > fraction) {
//       playVideo();
//     } else {
//       pauseVideo();
//     }
//   }
// };


// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// };

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//     window.addEventListener('scroll', checkScroll, false);
//     window.addEventListener('resize', checkScroll, false);

//     //check at least once so you don't have to wait for scrolling for the    video to start
//     window.addEventListener('load', checkScroll, false);
// };


// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING) {
//       //console.log("event played");
//     } else {
//       //console.log("event paused");
//     }
// };

// function stopVideo() {
//     player.stopVideo();
// };

// function playVideo() {
//   player.playVideo();
// };

// function pauseVideo() {
//   player.pauseVideo();
// };

// // Youtube Function end
  

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

function makeTimer() {
  //  var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");  
  var endTime = new Date("9 November 2021 9:56:00 GMT+08:00");
  endTime = (Date.parse(endTime) / 1000);

  var now = new Date();
  now = (Date.parse(now) / 1000);

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
  var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
  var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

  if (hours < "10") { hours = "0" + hours; }
  if (minutes < "10") { minutes = "0" + minutes; }
  if (seconds < "10") { seconds = "0" + seconds; }

  $(".days").html(days + "<span>DAYS</span>");
  $(".hours").html(hours + "<span>HOURS</span>");
  $(".minutes").html(minutes + "<span>MINUTES</span>");
  $(".seconds").html(seconds + "<span>SECONDS</span>");

}

setInterval(function() { makeTimer(); }, 1000);