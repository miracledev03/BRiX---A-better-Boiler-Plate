/* eslint-env jquery */
jQuery(document).ready(function() {
  $('.featured-category__product-list:not(.init)')
    .addClass('init')
    .each(function() {
      var arrows = $("<div class='featured-category__arrows'/>").insertBefore(
        this
      );
      $(this).slick({
        arrows: true,
        appendArrows: arrows,
        infinite: false,
        slidesToShow: 2,
        variableWidth: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              adaptiveHeight: true
            },
          },
        ],
      });
    });
});
