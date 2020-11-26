/* eslint-env jquery */
jQuery(document).ready(function () {
  $(".category-slider__inner").slick({
    arrows: true,
    infinite: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        variableWidth: false
      }
    }]
  });
});