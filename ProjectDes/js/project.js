$(document).ready(function(){
    $(".portfolio-page-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 1000,
      autoplayHoverPause: true,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
    });
  });