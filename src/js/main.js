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

onClickScroll = function() {
  $('.nav-item>a[href^="#"]').on('click',function(e) {
      e.preventDefault();

      var target = this.hash,
          $target = $(target),
          activeClass = 'navbar-item-active';

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing',$(this).parent().addClass(activeClass));
  });

  $('.scroll-down-container>a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash,
        $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 900, 'swing');
  });
};

animateScroll = function() {
  var $target = $('.animation-js'),
      animationClass = 'animation-js-active',
      offset = $(window).height() * 3/4,
      documentTop = $(document).scrollTop();

  $target.each(function() {
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
      activeClass = 'navbar-item-active',
      documentTop = $(document).scrollTop();

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

scrollButtons = function() {
  var $scrollUp = $('.scroll-up'),
      $scrollDown = $('.scroll-down'),
      headerHeight = $('#header').height(),
      projectsTop = $('#projects').offset().top,
      documentTop = $(document).scrollTop();

  if(documentTop >= headerHeight) {
    showScroll($scrollUp);
    $scrollDown.css("color","#000");
  }else{
    hideScroll($scrollUp);
    $scrollDown.css("color","#fff");
  }

  if(documentTop > projectsTop+1) {
    hideScroll($scrollDown);
    $scrollUp.css("color","#fff");
  }else{
    showScroll($scrollDown);
    $scrollUp.css("color","#000");
  }
};

showScroll = function(scroll){ $(scroll).css("display","inline-block"); };
hideScroll = function(scroll){ $(scroll).css("display","none"); };

movePreviousSection = function() { $.scrollify.previous(); };
moveNextSection = function() { $.scrollify.next(); };

(function(i,s,o,g,r,a,m) {
  //Google Analytics code
  i['GoogleAnalyticsObject']=r;
  i[r]=i[r]||function() {
    (i[r].q=i[r].q||[]).push(arguments)
  },
  i[r].l=1*new Date();
  a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];
  a.async=1;
  a.src=g;
  m.parentNode.insertBefore(a,m);

  ga('create', 'UA-92186332-1', 'auto');
  ga('send', 'pageview');
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

(function() {

  //Smooth in page scroll transition
  onClickScroll();

  //On scroll animation
  animateScroll();

  //Active menu according to focused section
  activeMenu();

  //Hide/show scroll buttons
  scrollButtons();

  $(document)
    .scroll(debounce(function(){animateScroll();}, 200))
    .scroll(debounce(function(){activeMenu();}, 100))
    .scroll(debounce(function(){scrollButtons();}, 200));

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', 'assets/particles.json');

  /* jQuery Scrollify - A jQuery plugin that assists scrolling and snaps to sections */
  $.scrollify({
    section: ".animation-js",
    interstitialSection : "#header,#footer",
    scrollSpeed: 1100,
    updateHash: false,
    touchScroll: false
  });
})();
