// Debounce from Lodash
debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

smoothScroll = function() {
  $('.nav-item>a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing');
  });
};

animateScroll = function() {
  var $target = $('.animation-js'),
  animationClass = 'animation-js-active',
  offset = $(window).height() * 3/4;
  var documentTop = $(document).scrollTop();

  $target.each(function(){
    var itemTop = $(this).offset().top;

    if (documentTop > itemTop - offset) {
      $(this).addClass(animationClass);
    } else {
      $(this).removeClass(animationClass);
    }
  });
};

activeMenu = function() {
  var $section = $('.animation-js'),
  activeClass = 'navbar-item-active';

  var documentTop = $(document).scrollTop();

  $section.each(function() {
    var itemTop = $(this).offset().top,
    itemHeight = $(this).height() * 1/2,
    itemId = $(this).parent().attr("id"),
    $target = $('.nav-item>a[href^="#'+itemId+'"]').parent();

    if (documentTop >= itemTop - itemHeight && documentTop < itemTop + itemHeight) {
      $target.addClass(activeClass);
    }else{
      $target.removeClass(activeClass);
    };
  })
};

(function(){
  //Smooth in page scroll transition
  smoothScroll();

  //On scroll animation
  animateScroll();

  //Active menu according to focused section
  activeMenu();

  $(document)
  .scroll(debounce(function(){animateScroll();}, 200))
  .scroll(debounce(function(){activeMenu();}, 100));
})();
