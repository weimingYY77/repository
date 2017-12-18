$(function () {
    nav();
    
    // VIDEO HOME
    if ($('body.home #video-wrap').length){
        header_home();
    }
    
    reveal();
    parallaxShapes();
    
    if ($('body').hasClass('about')){
        team_slider();
    }
    
    if ($('body').hasClass('contact')){
        form();
    }
    
    lines();
    
});



function lines(){
    $('.line').each(function(index, e){
        var elm = $(e);
        var elmInside = $(e).find('>div');
        var direction = elm.data('direction');
        var duration = elm.data('duration');
        var delay = elm.data('delay');
        var start = elm.data('start');
        var top = elm.data('top');
        var mov = elm.data('mov');
        var width = elm.data('width');
        var height = elm.data('height');
        
        
        if (direction == 'left'){
            var origin = 'right top 0px';
            var to = 'left top 0px';
            elm.css({
                'right': start+'px',
            });
        }else{
            var origin = 'left top 0px';
            var to = 'right top 0px';
            elm.css({
                'left': start+'px',
            });
        }
        
        elm.css({
            'top': top+'px',
        });
        
        elmInside.css({
            'width': width+'px',
            'height': height+'px',
            'background': elm.data('color'),
            '-webkit-transform-origin': origin,
            '-moz-transform-origin': origin,
            '-ms-transform-origin': origin,
            'transform-origin': origin,
            'transform': 'scaleX(0)'
            /*
            '-webkit-transition': '-webkit-transform '+duration+'ms ease-in-out',
            '-moz-transition': '-moz-transform '+duration+'ms ease-in-out',
            '-ms-transition': '-ms-transform '+duration+'ms ease-in-out',
            'transition': 'transform '+duration+'ms ease-in-out'
            */
            
        });
        
        // Initial scale from 0 to 1
        var scale = [1, 0];
        
        function loop(){
            // ANIM LINE 
            if (direction == 'left'){
                elm.velocity({
                    'right': mov+'px',
                },{
                    duration: (duration*2),
                    easing: "ease",
                    delay: delay,
                    complete: function(){
                        elm.css({
                            'right': start+'px',
                        });
                    }
                });
            }else{
                elm.velocity({
                    'left': mov+'px'
                },{
                    duration: (duration*2),
                    easing: "ease",
                    delay: delay,
                    complete: function(){
                        elm.css({
                            'left': start+'px',
                        });
                    }
                });
            }
            
            // ANIM INSIDE LINE
            elmInside.velocity({
                 scaleX:scale,
            },{
                duration: duration,
                easing: "ease",
                delay: delay,
                complete: function() { 
                    elmInside.css({
                        'transform-origin': to,
                        'transition':''
                    });
                    elmInside.velocity({
                        scaleX: 0
                    },{
                        duration: duration,
                        easing: "ease",
                        delay: 0,
                        complete: function(){
                            elmInside.css({
                                'transform-origin': origin
                            });
                            scale = 1;
                            loop();
                        }
                    });
                }
            });
        }
        loop();
        
    });
}

function nav(){
    
    // NAV TOGGLE
    $('.toggle').click(function (e) {
        e.preventDefault();
        $('body .nav').toggleClass('is-open');
        $(this).toggleClass('is-open');
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if ($('body .nav').hasClass('is-open')){
                $('body .nav, .toggle').toggleClass('is-open');
            }
        }
    });
    
    // NAV CLICK
    $('.navigation a').click(function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        $('.cover-1').show().transition({
           top:'-100%' 
        }, 1000);
        
        $('.navigation, .nav .social, .lines').transition({
            y:'-50px',
            opacity:0
        }, 400);
        
        $('.cover-2').show().transition({
           opacity: '1',
            delay: 600
        }, 600, function(){
            window.location.href = url;
        });
        
    });
    
    // NAV DETECTION
    $('#main > div').each(function(index, element){
        var elm = $(element);
        
        var scroll = function(){
            if ($(window).width() >= 992){
                var distance = elm.offset().top - parseInt($('.logo').css('top'));
                if ($(window).scrollTop() >= distance){
                    var nav_color = $(elm).data('nav-color');
                    var logo_color = $(elm).data('logo-color');
                    //console.log (color);
                    $('html').removeClass('nav-black').removeClass('nav-white').addClass('nav-'+nav_color);
                    $('html').removeClass('logo-black').removeClass('logo-white').addClass('logo-'+logo_color);
                }
            }else{
                $('html').removeClass('nav-black').removeClass('nav-white');
                $('html').removeClass('logo-black').removeClass('logo-white');
            }
        }
        scroll();
        $(window).scroll(scroll);
        $(window).resize(scroll);
    });
    
    // NAV RESPONSIVE
    var scroll_nav = function(){
        $('.bg-nav, .toggle').removeClass('is-fixed');
        if ($(window).width() < 992){
            if ($(this).scrollTop() >= $(window).height()*0.05) {
                $('.bg-nav, .toggle').addClass('is-fixed');
            } else {
                $('.bg-nav, .toggle').removeClass('is-fixed');
            }
        }
    }
    scroll_nav();
    $(window).scroll(scroll_nav);
}

function header_home() {
    var scale = function(){
        if ($(window).width() > 768) {
            $('#video-wrap').removeClass('no-video');
            $('#video').backgroundVideo({
                $videoWrap: $('#video-wrap'),
                pauseVideoOnViewLoss: false,
                parallaxOptions: {
                    effect: 1.9
                }
            });
        } else {
            $('#video-wrap').addClass('no-video');
        }
    }
    scale();
    $(window).resize(function(){
        scale();
    })
}
/**************************************************/
/* Reveal Functions */
/**************************************************/
function reveal(){
    
    var scale = function(){
        var wh = -$(window).height()*0.2;
        //if ($(window).width() >= 992){
            $('.reveal').each(function(index, element){
                var delay = $(element).data('delay');
                var color = $(element).data('color');
                var direction = $(element).data('direction');
                var duration = $(element).data('duration');

                var rev = new RevealFx(element, {
                   revealSettings : {
                        bgcolor: color,
                        delay: delay,
                        direction: direction,
                        duration: duration,
                        onCover: function(contentEl, revealerEl) {
                            contentEl.style.opacity = 1;
                            $(element).addClass('is-visible');
                        }
                    } 
                });

                var watcher = scrollMonitor.create(element, wh );	
                watcher.enterViewport(function() {
                    rev.reveal();
                    watcher.destroy();
                });
            });

            $('.no-visible').each(function(index, element){
                var watcher = scrollMonitor.create(element, wh );	
                watcher.enterViewport(function() {
                    $(element).addClass('is-visible');
                    watcher.destroy();
                });
            });
        //}
    }
    scale();
    $(window).resize(function(){
        //scale();
    });
}

/**************************************************/
/* Team slider Functions */
/**************************************************/
function team_slider(){
    var scale = function(){
        var windowWidth = $(window).width();
        var team_list = $('.about .team .list > ul');
        var team_person = $('.about .team .list >ul >li');
        var num_team = team_person.length;
        var team_person_width = windowWidth*0.7
        var team_list_width = team_person_width*num_team;
        var start;
        
        if (windowWidth < 480){
            team_person.outerWidth(team_person_width);
            team_list.outerWidth(team_list_width);
            team_list.find('>li:first-child').addClass('active');
            // START
            if (team_list.find('>li:first-child').hasClass('active')){
                start = ((windowWidth - team_person_width)/2);
                team_list.css({
                    '-webkit-transform': 'translateX('+start+'px)',
                    '-moz-transform': 'translateX('+start+'px)',
                    '-ms-transform': 'translateX('+start+'px)',
                    'transform': 'translateX('+start+'px)'
                });
                team_person.removeClass('active');
                $('.about .team .list >ul >li:first-child').addClass('active');
            }else{
	            start = 0;
            }
            
            
            $('.about .team').on("swipeleft", swipeLeft);
            $('.about .team').on("swiperight", swipeRight);

            function swipeLeft(event){
                event.stopImmediatePropagation();
                var index = team_list.find('li.active').index()+1;
                if (index < team_person.size()){
                    nextSlider(index); 
                }
            }

            function swipeRight(event){
                event.stopImmediatePropagation();
                var index = team_list.find('li.active').index()-1;
                    if (index >= 0){
                        nextSlider(index); 
                    }
            }

            function nextSlider(slide){
                var index = slide; 
                var nextSlide = $('.about .team .list >ul >li:nth-child('+(index+1)+')');
                $('.about .team .list >ul >li').removeClass('active');
                nextSlide.addClass('active');

                var mov = start - ((team_person_width) * index);

				console.log (mov);
				
                team_list.css({
                    '-webkit-transform': 'translateX('+mov+'px)',
                    '-moz-transform': 'translateX('+mov+'px)',
                    '-ms-transform': 'translateX('+mov+'px)',
                    'transform': 'translateX('+mov+'px)' 
                });
                /*
                var nextPagination = $('.home >.testimonials .pagination li:nth-child('+(index+1)+')');
                var nextSlides = $('.home >.testimonials .list li:nth-child('+(index+1)+')');

                $('.home >.testimonials .pagination li').removeClass('active');
                $('.home >.testimonials .list li').removeClass('active');

                nextPagination.addClass('active');
                nextSlides.addClass('active');

                var mov = (($(window).width()/2)/5) - (($(window).width()/1.25) * index);

                $('.home >.testimonials .list ul').css({
                    '-webkit-transform': 'translateX('+mov+'px)',
                    '-moz-transform': 'translateX('+mov+'px)',
                    '-ms-transform': 'translateX('+mov+'px)',
                    'transform': 'translateX('+mov+'px)'
                });
                */
            }
        }else{
            team_person.outerWidth('');
            team_list.outerWidth('');
            team_list.css({
                '-webkit-transform':'',
                '-moz-transform':'',
                '-ms-transform':'',
                'transform':'',
            });
        }
        
        
        
    }
    scale();
    $(window).resize(function(){
        scale(); 
    });
    
    
    
}


/**************************************************/
/* Parallax Functions */
/**************************************************/
function parallaxShapes() {
   var scroll = function(){
       
       if ($(window).width() >= 992){
            var wh = $(window).height(),
                dt = $(document).scrollTop();
                
           $('.scroll-parallax').imagesLoaded(function() {
                $('.scroll-parallax').each(function (index, e) {
                    var mov = 0;
                    var elm = $(e);
                    elm.css({marginTop: 0 + "px"});

                    var speed = elm.data('speed');
                    
                    if (dt > elm.offset().top - wh) {
                         var mov = (dt - (elm.offset().top - wh));
                    }else{
                         var mov = 0;
                    }
                    
                    mov *= - speed;

                    elm.css({
                        '-webkit-transform': 'translate3d(0, ' + (mov) + 'px, 0)',
                        '-moz-transform': 'translate3d(0, ' + (mov) + 'px, 0)',
                        '-ms-transform': 'translate3d(0, ' + (mov) + 'px, 0)',
                        'transform': 'translate3d(0, ' + (mov) + 'px, 0)'
                    });
                });
           });
       }else{
           $('.scroll-parallax').css({
                '-webkit-transform': '',
                '-moz-transform': '',
                '-ms-transform': '',
                'transform': ''
            });
       } 
   }
   //scroll();
    $(window).on('scroll', function(){
        scroll();
    });
    $(window).on('resize', function(){
        scroll();
    });
}


/**************************************************/
/* Google maps Functions */
/**************************************************/




function setMarkers(map, lat, lng) {
    var image = {
        url: window.location.origin+'/themes/valudio/assets/images/marker.png',
        size: new google.maps.Size(95, 142),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(51, 91)
    };
    var points = [
                [lat, lng, image]
            ];

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var marker = new google.maps.Marker({
            position: {
                lat: point[0],
                lng: point[1]
            },
            map: map,
            icon: point[2]
        });
    }
}

/**************************************************/
/* Google maps Functions */
/**************************************************/
function form(){
    validator = $(".form-validate").validate({
        //set this to false if you don't what to set focus on the first invalid input
        focusInvalid: false,
        //by default validation will run on input keyup and focusout
        //set this to false to validate on submit only
        onkeyup: false,
        onfocusout: true,
        //by default the error elements is a <label>
        errorElement: "span",

        errorPlacement: function(error, element) {
            //error.appendTo("div#errors");
            //element.closest('div.form-group').find('.error-msg').html(error);
            if (element.is(':checkbox')){
                element.closest('div.form-group').find('.error-msg').html(error);
            }else{
                element.attr("placeholder", error[0].outerText);
            }
        },
        highlight: function(element) {
            // add a class "alert" to the element 
            $(element).closest('div.form-group').addClass('error');
        },
        unhighlight: function(element) {
            // remove the class "alert" from the element 
            $(element).closest('div.form-group').removeClass('error');
            
        },
        onfocusout: function(element) {
            //$(element).valid();
            this.element(element);
        },
        submitHandler: function (form) {
            
            $(form).find('button').prop('disabled', true);
            
            $(form).request('onSend', {
                success: function(data) {
                    form.reset();
                    $('button').prop('disabled', false);
                    $('body').addClass('contact-ok').scrollTop(0);
                    //console.log ('Valid form');
                }
            });
           
           return false;
         }
    });
}