
    $(function() {

      var $doc = $(document),
          $win = $(window);

      var $intro = $('.intro'),
          $items = $intro.find('.item'),
          itemsLen = $items.length,
          svgs = $intro.find('svg').drawsvg({
            callback: animateIntro,
            easing: 'easeOutQuart'
          }),
          currItem = 0;

      function animateIntro() {
        $items.removeClass('active').eq( currItem++ % itemsLen ).addClass('active').find('svg').drawsvg('animate');
      }

      animateIntro();

      var $header = $('header'),
          headerOffTop = $header.offset().top,
          isFixed = false;

      function menu() {
        if ( $win.scrollTop() >= headerOffTop ) {
          if ( !isFixed ) {
            isFixed = true;
            $header.addClass('affix');
          }
        } else if ( isFixed ) {
          isFixed = false;
          $header.removeClass('affix');
        }
      }

      $win.on('scroll', menu);
      menu();

      $header.on('click', 'a[href^="#"]', function(e) {
        e.preventDefault();

        var hash = this.hash,
            offset = $(hash).offset().top;

        $('body, html').animate({
          scrollTop: offset
        }, 600, 'easeInOutQuart', function() {
          document.location.hash = hash;
        });
      });

    });

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-67451713-1', 'lcdsantos.github.io');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');

    function getScript(a,b,c,e){var d=a.getElementsByTagName(b)[0];a.getElementById(c)||(a=a.createElement(b),a.id=c,a.src=e,d.parentNode.insertBefore(a,d))};

    getScript(document, 'script', 'facebook-jssdk', '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=146929405493694');
    getScript(document, 'script', 'twitter-wjs', '//platform.twitter.com/widgets.js');
    getScript(document, 'script', 'googleplus-wjs', '//apis.google.com/js/plusone.js');