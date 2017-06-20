//Carousel jQuery
$.fn.stackCarousel = function() {
  var elChild = $(this).children(".features-slide");
  //Count Nos of Slides
  var slidesCount = elChild.length;
  for (var i = 0; i < slidesCount; i++) {
    elChild.eq(i).attr("data-order", i);
  }
  //Set Active to top and call reset order function
  elChild.on("click", function() {
    var thisOrder = $(this).attr("data-order");
    if (thisOrder != 0) {
      $(this).attr("data-order", 0);
      setOrder(thisOrder);
      $(this).addClass("slide-is-active");
    }
    if (slidesCount < 4) {
      elChild
        .not(".slide-was-active, .slide-is-active")
        .attr("data-order", slidesCount - 2);
    }
  });
  //Reset order function
  function setOrder(ordervalue) {
    elChild.removeClass("slide-was-active");
    for (var i = 0; i < slidesCount; i++) {
      if (elChild.eq(i).hasClass("slide-is-active")) {
        elChild
          .eq(i)
          .removeClass("slide-is-active")
          .addClass("slide-was-active")
          .attr("data-order", slidesCount - 1);
      }
    }
    if (slidesCount > 3) {
      for (var i = 0; i < slidesCount; i++) {
        if (i > 0) {
          var currentOrder = elChild.eq(i).attr("data-order");
          if (currentOrder > 1) {
            var setOrderValue = currentOrder - 1;
            if (setOrderValue != slidesCount - 1) {
              elChild.eq(i).attr("data-order", setOrderValue);
            }
          }
        }
      }
    } else {
      $(".features-slide.slide-was-active").attr("data-order", slidesCount - 1);
    }
  }
};
//Carousel Navs
$(".features-slide_nav__next").on("click", function() {
  var elActiveChild = $(this)
    .parent()
    .parent()
    .children()
    .find(".features-slide.slide-is-active"),
    elFirstChild = $(this)
      .parent()
      .parent()
      .children()
      .find(".features-slide")
      .eq(0);
  if (elActiveChild.next().length > 0) {
    elActiveChild.next().trigger("click");
  } else {
    elFirstChild.trigger("click");
  }
});
$(".features-slide_nav__prev").on("click", function() {
  var elwasActiveChild = $(this)
    .parent()
    .parent()
    .children()
    .find(".features-slide.slide-was-active"),
    elActiveChild = $(this)
      .parent()
      .parent()
      .children()
      .find(".features-slide.slide-is-active"),
    elFirstChild = $(this)
      .parent()
      .parent()
      .children()
      .find(".features-slide")
      .eq(0),
    elLastChild = $(this)
      .parent()
      .parent()
      .children()
      .find(".features-slide:last-child");
  if (elwasActiveChild.length > 0) {
    if (elwasActiveChild.next().length > 0) {
      console.log("elwasActiveChild.next().length");
      if (elwasActiveChild.next().hasClass("slide-is-active")) {
        console.log('elwasActiveChild.next().hasClass("slide-is-active")');
        if (elActiveChild.next().length > 0) {
          elActiveChild.next().trigger("click");
        } else {
          console.log("elActiveChild.next().length false");
          elActiveChild.prev().prev().trigger("click");
        }
      } else {
        elwasActiveChild.next().trigger("click");
      }
    } else {
      if (elwasActiveChild.prev().hasClass("slide-is-active")) {
        elwasActiveChild.prev().prev().trigger("click");
      } else {
        elwasActiveChild.prev().trigger("click");
      }
    }
  } else {
    elLastChild.trigger("click");
  }
});
$(".features-slides").stackCarousel();