 /* --------------------------------------------------
  * © Copyright 2026 - Homely by Designesia
  * --------------------------------------------------*/
(function($) {
    'use strict';

     const enableRtl = 'off'; // on - for enable RTL, off - for deactive RTL
     const preloader = 'on'; // on - for enable preloader, off - for disable preloader
     const headerAutoshow = "on"; // on - for enable fixed header, off - for disable fixed header
     const topbar = "off"; // on - for enable fixed header, off - for disable fixed header

    /* predefined vars begin */
    const instances = [];
    const $window = $(window);
    const gridSize = 10;
    const header = $('header');
    let mobileMenuShow = 0;
    let vCount = '0';
    let mb;
    let opAutoshow = 0;
    let newScrollPosition = 0;
    let lastScrollPosition;
     /* predefined vars end */
     
     /* --------------------------------------------------
      * header | sticky
      * --------------------------------------------------*/
     function headerSticky() {
       const $document = $(document);
       const $header = $('header.autoshow');
       let vScroll = 0;

       // Add the clone class with animation
       $('header').addClass('clone', 1000, 'easeOutBounce');

       if ($document.scrollTop() >= 50 && vScroll === 0) {
         $header.removeClass('scrollOff')
                .addClass('scrollOn')
                .css('height', 'auto');
         vScroll = 1;
       } else {
         $header.removeClass('scrollOn')
                .addClass('scrollOff');
         vScroll = 0;
       }
     }

     /* --------------------------------------------------
      * plugin | magnificPopup
      * --------------------------------------------------*/
     function loadMagnificPopup() {
         jQuery('.simple-ajax-popup-align-top').magnificPopup({
             type: 'ajax',
             alignTop: true,
             overflowY: 'scroll'
         });
         jQuery('.simple-ajax-popup').magnificPopup({
             type: 'ajax'
         });
         // zoom gallery
         jQuery('.zoom-gallery').magnificPopup({
             delegate: 'a',
             type: 'image',
             closeOnContentClick: false,
             closeBtnInside: false,
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             image: {
                 verticalFit: true,
                 titleSrc: function(item) {
                     return item.el.attr('title');
                     //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                 }
             },
             gallery: {
                 enabled: true
             },
             zoom: {
                 enabled: true,
                 duration: 300, // don't foget to change the duration also in CSS
                 opener: function(element) {
                     return element.find('img');
                 }
             }
         });
         // popup youtube, video, gmaps
         jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
             disableOn: 700,
             type: 'iframe',
             mainClass: 'mfp-fade',
             removalDelay: 160,
             preloader: false,
             fixedContentPos: false
         });
         // Initialize popup as usual
         $('.image-popup').magnificPopup({
             type: 'image',
             mainClass: 'mfp-with-zoom', // this class is for CSS animation below

             zoom: {
                 enabled: true, // By default it's false, so don't forget to enable it

                 duration: 300, // duration of the effect, in milliseconds
                 easing: 'ease-in-out', // CSS transition easing function

                 // The "opener" function should return the element from which popup will be zoomed in
                 // and to which popup will be scaled down
                 // By defailt it looks for an image tag:
                 opener: function(openerElement) {
                     // openerElement is the element on which popup was initialized, in this case its <a> tag
                     // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                     return openerElement.is('img') ? openerElement : openerElement.find('img');
                 }
             }

         });
         $('.image-popup-vertical-fit').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             mainClass: 'mfp-img-mobile',
             image: {
                 verticalFit: true
             }
         });
         $('.image-popup-fit-width').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             image: {
                 verticalFit: false
             }
         });
         $('.image-popup-no-margins').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             closeBtnInside: false,
             fixedContentPos: true,
             mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
             image: {
                 verticalFit: true
             },
             zoom: {
                 enabled: true,
                 duration: 300 // don't foget to change the duration also in CSS
             }
         });
         $('.image-popup-gallery').magnificPopup({
             type: 'image',
             closeOnContentClick: false,
             closeBtnInside: false,
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             image: {
                 verticalFit: true,
                 titleSrc: function(item) {
                     return item.el.attr('title');
                     //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                 }
             },
             gallery: {
                 enabled: true
             }
         });
         $('.images-group').each(function() { // the containers for all your galleries
             $(this).magnificPopup({
                 delegate: 'a', // the selector for gallery item
                 type: 'image',
                 gallery: {
                     enabled: true
                 }
             });
         });

         $('.images-popup').magnificPopup({
             delegate: 'a', // child items selector, by clicking on it popup will open
             type: 'image'
             // other options
         });
     }
     
     /* --------------------------------------------------
      * plugin | enquire.js
      * --------------------------------------------------*/
     function initResize() {
       // Screen ≥ 993px
       enquire.register('screen and (min-width: 993px)', {
         match() {
           mobileMenuShow = 1;
         },
         unmatch() {
           mobileMenuShow = 0;
           $('#menu-btn').show();
         }
       });

       // Screen ≤ 992px
       enquire.register('screen and (max-width: 993px)', {
         match() {
           const $body = $('body');
           $('header').addClass('header-mobile');
           if ($body.hasClass('side-content')) {
             $body.removeClass('side-layout');
           }
         },
         unmatch() {
           const $body = $('body');
           $('header').removeClass('header-mobile');
           if ($body.hasClass('side-content')) {
             $body.addClass('side-layout');
           }
         }
       });

       // Initialize main function
       init();

       const $header = $('header');
       $header.removeClass('smaller logo-smaller clone');

       const isMobile = window.matchMedia('(max-width: 992px)').matches;
       const $osw = $('.owl-slide-wrapper');

       if (isMobile) {
         $osw.find('img')
           .css({
             height: $(window).innerHeight(),
             width: 'auto'
           });

         if (opAutoshow === 1) {
           $header.removeClass('autoshow');
         }
       } else {
         $osw.find('img')
           .css({
             width: '100%',
             height: 'auto'
           });

         if (opAutoshow === 1) {
           $header.addClass('autoshow');
         }
       }
     }


     /* --------------------------------------------------
      * owl carousel begin
      * --------------------------------------------------*/ 
        jQuery(".owl-2-cols").owlCarousel({
           center:false,
           loop:true,
           margin:30,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:2
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-2-cols-dots").owlCarousel({
           center:false,
           loop:true,
           margin:30,
           nav:false,
           dots:true,
           responsive:{
               1000:{
                   items:2
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-2-cols-center").owlCarousel({
           center:true,
           loop:true,
           margin:30,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:2
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-3-cols").owlCarousel({
           center:false,
           loop:true,
           margin:0,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:3
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-4-cols").owlCarousel({
           center:false,
           loop:true,
           margin:30,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:4
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-4-cols-center").owlCarousel({
           center:true,
           loop:true,
           margin:30,
           nav:false,
           dots:false,
           responsive:{
               1000:{
                   items:4
               },
               600:{
                   items:2
               },
               0:{
                   items:1
               }
           }
        });

        jQuery(".owl-single").owlCarousel({
            loop:true,
            items: 1,
            nav:false,
            dots:false,
         });

        jQuery(".owl-single-dots").owlCarousel({
            loop: true,
            items: 1,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });


        jQuery("#slider-carousel").owlCarousel({
                loop: true,
                items: 1,
                dots: false,
                thumbs: true,
                thumbImage: true,
                thumbContainerClass: 'owl-thumbs',
                thumbItemClass: 'owl-thumb-item'
            });

         
         jQuery(".owl-2-dots").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:true,
            responsive:{
                1000:{
                    items:2
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-3-dots").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:true,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-4-dots").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:true,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-4-nomargin").owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            dots:false,
            autoplay:true,
            autoplayTimeout:2000,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });


         jQuery(".owl-single-dots").owlCarousel({
            loop:true,
            items: 1,
            nav:false,
            dots:true,
         });
         
         jQuery(".four-cols-center-dots").owlCarousel({
            center: true,
            loop:true,
            margin:25,
            responsive:{
                1200:{
                    items:4
                },
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".cols-3-dots").owlCarousel({
            center: false,
            loop:true,
            margin:25,
            responsive:{
                1200:{
                    items:3
                },
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".cols-4-dots-center").owlCarousel({
            center: true,
            loop:true,
            margin:25,
            responsive:{
                1200:{
                    items:4
                },
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery(".owl-6").owlCarousel({
            center: false,
            items:6,
            loop:true,
            dots: false,
            margin:40,
            autoplay:true,
            autoplayTimeout:2000,
            responsive:{
                1000:{
                    items:6
                },
                600:{
                    items:4
                },
                0:{
                    items:3
                }
            }
         });

        // Custom Navigation owlCarousel
         $(".next").off("click").on("click", function(e) {
             e.preventDefault();
             $(this).parent().parent().find('.blog-slide').trigger('owl.next');
         });
         $(".prev").off("click").on("click", function(e) {
             e.preventDefault();
             $(this).parent().parent().find('.blog-slide').trigger('owl.prev');
         });
        
         jQuery(".owl-slide-wrapper").on("mouseenter", function() {
             arr.find(".next").css("right", "40px");
             arr.find(".prev").css("left", "40px");
         }).on("mouseleave", function() {
             arr.find(".next").css("right", "-50px");
             arr.find(".prev").css("left", "-50px");
         })
    /* owl carousel end */


    /* Lenis begin */
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const extraContent = document.querySelector('#extra-content');
    if (extraContent) {
      const modalLenis = new Lenis({
        wrapper: extraContent,   // the overlay wrapper
        content: extraContent,   // the scrolled content inside it
        autoRaf: true
      });
    }
    /* Lenis end */

    /* wow js by char */
    function splitTextToChars(selector, animation = "fadeInUp", delayStep = 0.025) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
      const text = el.innerText;
      el.innerHTML = ""; // clear original

      [...text].forEach((ch, i) => {
        if (ch === " ") {
          el.appendChild(document.createTextNode(" ")); // keep spaces as real spaces
        } else {
          const span = document.createElement("span");
          span.innerText = ch;
          span.classList.add("char", "wow", animation);
          span.setAttribute("data-wow-delay", (i * delayStep) + "s");
          el.appendChild(span);
        }
      });
    });
  }

  // Split target elements
  splitTextToChars(".split");

  // Init WOW after splitting
  new WOW().init();

     /* --------------------------------------------------
      * plugin | isotope
      * --------------------------------------------------*/
     function filterGallery() {
       const $container = $('#gallery');
       $container.isotope({
         itemSelector: '.item',
         filter: '*'
       });

       $('#filters a').on('click', function (e) {
         e.preventDefault();
         const $this = $(this);
         if ($this.hasClass('selected')) return false;

         const $optionSet = $this.parents();
         $optionSet.find('.selected').removeClass('selected');
         $this.addClass('selected');

         const selector = $this.attr('data-filter');
         $container.isotope({ filter: selector });
         return false;
       });
     }

     function masonry() {
       const $container = $('.masonry');
       $container.isotope({
         itemSelector: '.item'
       });

       $('#filters a').on('click', function (e) {
         e.preventDefault();
         const $this = $(this);
         if ($this.hasClass('selected')) return false;

         const $optionSet = $this.parents();
         $optionSet.find('.selected').removeClass('selected');
         $this.addClass('selected');

         const selector = $this.attr('data-filter');
         $container.isotope({ filter: selector });
         return false;
       });
     }

     /* --------------------------------------------------
      * back to top
      * --------------------------------------------------*/
     const scrollTrigger = 100; // px
     let t = 0;

     function backToTop() {
       const scrollTop = $(window).scrollTop();

       if (scrollTop > scrollTrigger) {
         $('#back-to-top').addClass('show').removeClass('hide');
         $('.show-on-scroll').addClass('show').removeClass('hide');
         t = 1;
       }

       if (scrollTop < scrollTrigger && t === 1) {
         $('#back-to-top').addClass('hide');
         $('.show-on-scroll').addClass('hide');
       }

       $('#back-to-top').on('click', (e) => {
         e.preventDefault();
         $('html, body')
           .stop(true)
           .animate({ scrollTop: 0 }, 700);
       });
     }

     /* --------------------------------------------------
      * plugin | scroll to
      * --------------------------------------------------*/
     $.scrollTo = $.fn.scrollTo = function (x, y, options) {
       if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

       options = $.extend(
         {},
         {
           gap: { x: 0, y: 0 },
           animation: {
             easing: 'easeInOutExpo',
             duration: 600,
             complete: $.noop,
             step: $.noop
           }
         },
         options
       );

       return this.each(function () {
         const h = $('body').hasClass('side-layout') ? 0 : 69;
         const $elem = $(this);

         $elem.stop().animate(
           {
             scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
             scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - h
           },
           options.animation
         );
       });
     };

     /* --------------------------------------------------
      * counting number
      * --------------------------------------------------*/
     function deCounter() {
       $('.timer').each(function () {
         const imagePos = $(this).offset().top;
         const topOfWindow = $(window).scrollTop();

         if (imagePos < topOfWindow + $(window).height() && vCount === '0') {
           $('.timer').each(function count(options) {
             vCount = '1';
             const $this = $(this);
             options = $.extend({}, options || {}, $this.data('countToOptions') || {});
             $this.countTo(options);
           });
         }
       });
     }

     /* --------------------------------------------------
      * progress bar | text rotation
      * --------------------------------------------------*/
     function textRotate() {
       const $quotes = $('.text-rotate-wrap .text-item');
       let quoteIndex = -1;

       const showNextQuote = () => {
         quoteIndex++;
         $quotes
           .eq(quoteIndex % $quotes.length)
           .fadeIn(1)
           .delay(1500)
           .fadeOut(1, showNextQuote);
       };

       showNextQuote();
     }

     /* --------------------------------------------------
      * custom background
      * --------------------------------------------------*/
     function customBg() {
         $("body,div,section,span,form,img").css('background-color', function() {
            if ($(this).is('[data-bgcolor]')) {
                jQuery(this).addClass("bgcustom");
            }
             return jQuery(this).data('bgcolor');
         });
         $("body,div,section").css('background', function() {
            if ($(this).is('[data-bgimage]')) {
                jQuery(this).addClass("bgcustom");
            }
             return jQuery(this).data('bgimage');
         });
         $("body,div,section").css('background-size', function() {
             return 'cover';
         });

         $("body,div,section").css('background-repeat', function() {
             return 'no-repeat';
         });
     }
     
     /* --------------------------------------------------
      * custom elements
      * --------------------------------------------------*/
     function customElements() {
       // Tabs
       const $tabs = $('.de_tab');
       $tabs.find('.de_tab_content > div').hide();
       $tabs.find('.de_tab_content > div:first').show();

       $('li').find('.v-border').fadeTo(150, 0);
       $('li.active').find('.v-border').fadeTo(150, 1);

       $('.de_nav li').off('click').on('click', function (e) {
         e.preventDefault();
         const $this = $(this);
         const $parent = $this.parent().parent();

         $this.parent().find('li').removeClass('active');
         $this.addClass('active');

         $parent.find('.v-border').fadeTo(150, 0);
         $parent.find('.de_tab_content > div').hide();

         const indexer = $this.index(); // index of clicked tab
         $parent.find(".de_tab_content > div:eq(${indexer})").fadeIn();
         $this.find('.v-border').fadeTo(150, 1);
       });
     }

     /* --------------------------------------------------
      * add arrow for mobile menu
      * --------------------------------------------------*/
     function menuArrow() {
       // Add arrow span if submenu exists
       $('#mainmenu li a').each(function () {
         if ($(this).next('ul').length > 0) {
           $('<span></span>').insertAfter($(this));
         }
       });

       // Level 1 menu toggle
       $('#mainmenu > li > span').off('click').on('click', function (e) {
         e.preventDefault();
         let iteration = $(this).data('iteration') || 1;
         const $submenu = $(this).parent().find('ul:first');

         switch (iteration) {
           case 1:
             $(this).addClass('active');
             $submenu.css('height', 'auto');
             const openHeight = $submenu.height();
             $submenu.css('height', '0').animate({ height: openHeight }, 300, 'easeOutQuint');
             break;
           case 2:
             $(this).removeClass('active');
             $submenu.animate({ height: '0' }, 300, 'easeOutQuint');
             break;
         }

         iteration = iteration >= 2 ? 1 : iteration + 1;
         $(this).data('iteration', iteration);
       });

       // Level 2 menu toggle
       $('#mainmenu > li > ul > li > span').off('click').on('click', function (e) {
         e.preventDefault();
         let iteration = $(this).data('iteration') || 1;
         const $submenu = $(this).parent().find('ul:first');

         switch (iteration) {
           case 1:
             $(this).addClass('active');
             $(this).parent().parent().parent().find('ul:first').css('height', 'auto');
             $submenu.css('height', 'auto');
             const openHeight = $submenu.height();
             $submenu.css('height', '0').animate({ height: openHeight }, 400, 'easeInOutQuint');
             break;
           case 2:
             $(this).removeClass('active');
             $submenu.animate({ height: '0' }, 400, 'easeInOutQuint');
             break;
         }

         iteration = iteration >= 2 ? 1 : iteration + 1;
         $(this).data('iteration', iteration);
       });
     }

     /* --------------------------------------------------
      * show gallery item sequence
      * --------------------------------------------------*/
     function sequence() {
       const $items = $('.sequence > .gallery-item .de-item, .sequence > .gallery-item .d_demo_img');
       const count = $items.length;

       $items.addClass('fadeIn');
       $items.find('img').addClass('scaleIn');

       for (let i = 0; i <= count; i++) {
         const $sqx = $(".sequence > .gallery-item:eq(${i}) .de-item");
         $sqx.attr('data-wow-delay', "${i / 8}s");
         $sqx.find('img').attr('data-wow-delay', "${i / 16}s");
       }
     }

     /* --------------------------------------------------
      * sequence A
      * --------------------------------------------------*/
     function sequenceA() {
       const $items = $('.sequence .sq-item');
       const count = $items.length;

       $items.addClass('fadeInUp');
       for (let i = 0; i <= count; i++) {
         const $sqx = $(".sequence .sq-item:eq(${i})");
         $sqx.attr('data-wow-delay', "${i / 8}s");
         $sqx.attr('data-wow-speed', '1s');
       }
     }

     /* --------------------------------------------------
      * multiple init functions
      * --------------------------------------------------*/
     function init() {
       const $sidebar = $('#de-sidebar');
       const sidebarHeight = parseInt($sidebar.css('height'), 10);
       const windowHeight = $(window).innerHeight();
       const heightDiff = sidebarHeight - windowHeight;

       const scrolling = () => {
         const mq = window.matchMedia('(min-width: 993px)');
         const distanceY = window.pageYOffset || document.documentElement.scrollTop;
         const header = $('header');

         if (mq.matches) {
           if (distanceY > 0) {
             header.addClass('smaller');
           } else {
             header.removeClass('smaller');
           }

           if (header.hasClass('side-header')) {
             if ($(document).scrollTop() >= heightDiff) {
               $sidebar.css('position', 'fixed');
               if (sidebarHeight > windowHeight) $sidebar.css('top', -heightDiff);

               $('#main').addClass('col-md-offset-3');
               $('h1#logo img, header .h-content').css('padding-left', '7px');
               $('#mainmenu li').css('width', '103%');
             } else {
               $sidebar.css('position', 'relative');
               if (sidebarHeight > windowHeight) $sidebar.css('top', 0);

               $('#main').removeClass('col-md-offset-3');
               $('h1#logo img, header .h-content').css('padding-left', '0px');
               $('#mainmenu li').css('width', '100%');
             }
           }
         }
       };

       scrolling();

       // Filter reset
       $('.filter__r').on('click', () => {
         $('.activity-filter > li').removeClass('active');
         $('.activity-list > li').show();
       });

       // Popup close
       $('.btn-close').off('click').on('click', function (e) {
         e.preventDefault();
         let iteration = $(this).data('iteration') || 1;
         if (iteration === 1) {
           $('#popup-box').addClass('popup-hide').removeClass('popup-show');
         }
         iteration = iteration >= 2 ? 1 : iteration + 1;
         $(this).data('iteration', iteration);
       });

       // Extra content toggle
       $('#extra-content').addClass('wow');

       $('#btn-extra').on('click', () => $('#extra-wrap').addClass('open'));
       $('#btn-close').on('click', () => $('#extra-wrap').removeClass('open'));
     }

     
     // rtl begin //
      if (enableRtl==="on") {
            jQuery("body").addClass('rtl');
            jQuery("#bootstrap").attr("href", 'css/bootstrap.rtl.min.css');
            jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.rtl.min.html');
            jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.rtl.min.html');
            jQuery("#mdb").attr("href", 'css/mdb.rtl.min.html');
            jQuery('html').attr("dir","rtl")
        };
     // rtl end // 

     if(preloader==="off"){
            jQuery("#de-loader").hide();
     }

     if(topbar==="off"){
            jQuery("#topbar").hide();
            jQuery('header').removeClass('has-topbar')
     }

     function modeRtl() {
       jQuery("#selector #demo-rtl").off("click").on("click", function(e) {
           e.preventDefault();
         let iteration = $(this).data('iteration') || 1;

         switch (iteration) {
           case 1:
             jQuery("body").addClass('rtl');
             jQuery("#bootstrap").attr("href", 'css/bootstrap.rtl.min.css');
             jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.rtl.min.html');
             jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.rtl.min.html');
             jQuery("#mdb").attr("href", 'css/mdb.rtl.min.html');
             jQuery('html').attr("dir", "rtl");
             jQuery(this).find(".sc-val").text('Click to Disable');
             break;

           case 2:
             jQuery("body").removeClass('rtl');
             jQuery("#bootstrap").attr("href", 'css/bootstrap.min.css');
             jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.min.html');
             jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.min.html');
             jQuery("#mdb").attr("href", 'css/mdb.min.html');
             jQuery('html').attr("dir", "ltr");
             jQuery(this).find(".sc-val").text('Click to Enable');
             break;
         }

         iteration++;
         if (iteration > 2) iteration = 1;
         $(this).data('iteration', iteration);
       });
     }

     // selector
     jQuery("#selector .opt.tc1").addClass("active");

     jQuery("#selector .opt").off("click").on("click", function(e) {
         e.preventDefault();
       jQuery("#selector .opt").removeClass("active");
       const color = jQuery(this).data('color');
       jQuery("#colors").attr("href", 'css/colors/' + color + '.css');
       jQuery(this).addClass("active");
     });

     function gridGallery() {
       jQuery('.grid-item').each(function() {
         const $parent = jQuery(this).parent();
         const this_col = Number($parent.attr('data-col'));
         const this_gridspace = Number($parent.attr('data-gridspace'));
         const this_ratio = parseFloat($parent.attr('data-ratio')) || 1;

         $parent.css('padding-left', this_gridspace);

         const w = (($(document).width() - (this_gridspace * this_col + 1)) / this_col) - (this_gridspace / this_col);
         const gi = jQuery(this);
         const h = w * this_ratio;

         gi.css({ width: w, height: h });
         gi.find(".pf_title").css('margin-top', (h / 2) - 10);
         gi.css({
           'margin-right': this_gridspace,
           'margin-bottom': this_gridspace
         });
         $parent.css('padding-top', this_gridspace);

         if (gi.hasClass('large')) {
           gi.css({
             width: (w * 2) + this_gridspace,
             height: (h * 2) + this_gridspace
           });
         }
         if (gi.hasClass('large-width')) {
           gi.css({
             width: (w * 2) + this_gridspace,
             height: h
           });
         }
         if (gi.hasClass('large-height')) {
           gi.css('height', (h * 2) + this_gridspace);
           gi.find(".pf_title").css('margin-top', (h) - 20);
         }
       });
     }

     /* --------------------------------------------------
      * progress bar
      * --------------------------------------------------*/
     function deProgress() {
       jQuery('.de-progress').each(function() {
         const pos_y = jQuery(this).offset().top;
         const value = jQuery(this).find(".progress-bar").attr('data-value');
         const topOfWindow = jQuery(window).scrollTop();

         if (pos_y < topOfWindow + 550) {
           jQuery(this).find(".progress-bar").css({ 'width': value }, "slow");
         }

         jQuery(this).find('.value').text(value);
       });
     }

     function deCountdown() {
       $('.de_countdown').each(function() {
         const y = $(this).data('year');
         const m = $(this).data('month');
         const d = $(this).data('day');
         const h = $(this).data('hour');
         $(this).countdown({ until: new Date(y, m - 1, d, h) });
       });
     }

     // --------------------------------------------------
     // custom dropdown
     // --------------------------------------------------
     function dropdown(e) {
       const obj = $(e + '.dropdown');
       const btn = obj.find('.btn-selector');
       const dd = obj.find('ul');
       const opt = dd.find('li');

       obj.on("mouseenter", function() {
         dd.show();
       }).on("mouseleave", function() {
         dd.hide();
       });

       opt.off("click").on("click", function(e) {
           e.preventDefault();
         dd.hide();
         const txt = $(this).text();
         opt.removeClass("active");
         $(this).addClass("active");
         btn.text(txt);
       });
     }

     // --------------------------------------------------
     // on scroll function
     // --------------------------------------------------
     function onScroll(){
         /* functions */
         headerSticky();
         deCounter();
         deProgress();
         init();
         backToTop();
        
         /* fade base scroll position */
         const target = $('.fadeScroll');
         const targetHeight = target.outerHeight();
         const scrollPercent = (targetHeight - window.scrollY) / targetHeight;
         if (scrollPercent >= 0) {
             target.css('opacity', scrollPercent);
         } else {
             target.css('opacity', 0);
         }
         /* go to anchor */
         jQuery('#mainmenu li a').each(function() {
             const cur = jQuery(this);
             if (this.href.indexOf('#') === -1) {
                 const href = jQuery(this).attr('href');
        
             }
         });

         // scroll magic begin
           if (Array.prototype.some.call($('.section-dark, .dark-scheme'), function(element) {
            const h = $(window).innerHeight();
            const scrollPosition = $(window).scrollTop()+h/2;
            const elementTop = $(element).offset().top;
            const elementBottom = $(element).outerHeight() + elementTop;
            if (scrollPosition > elementTop && scrollPosition < elementBottom) {
              return true;
            }
            else {
              return false;
            }
           })) {
            $('.float-text').addClass('dark');
            $('.scrollbar-v').addClass('dark');
           } else {
            $('.float-text').removeClass('dark');
            $('.scrollbar-v').removeClass('dark');
           }
         // scroll magic close

         if(headerAutoshow==="on"){
             lastScrollPosition = window.scrollY;

             // Scrolling down
             if (newScrollPosition < lastScrollPosition && lastScrollPosition > 80) {
               // header.removeClass('slideDown').addClass('nav-up');
               header.addClass("scroll-down");
               header.removeClass("nav-up");

             // Scrolling up
             } else if (newScrollPosition > lastScrollPosition) {
               // header.removeClass('nav-up').addClass('slideDown');
               header.removeClass("scroll-down");
               header.addClass("nav-up");
             }

             newScrollPosition = lastScrollPosition;
        }

        // scroll indicator
        const pixels = $(document).scrollTop();
        const pageHeight = $(document).height() - $(window).height();
        const progress = (100 * pixels) / pageHeight;
        $("div.scrollbar").css("width", progress + "%");
        $("div.scrollbar-v").css("height", progress + "px");
     }

    function deShare(){
        const url = window.location.href;
        $('.fa-twitter').off("click").on("click", function(e) {
           e.preventDefault(); window.open('https://twitter.com/share?url='+url,'_blank'); });
        $('.fa-facebook').off("click").on("click", function(e) {
           e.preventDefault(); window.open('https://www.facebook.com/sharer/sharer.php?u='+url,'_blank'); });
        $('.fa-reddit').off("click").on("click", function(e) {
           e.preventDefault(); window.open('http://www.reddit.com/submit?url='+url,'_blank'); });
        $('.fa-linkedin').off("click").on("click", function(e) {
           e.preventDefault(); window.open('https://www.linkedin.com/shareArticle?mini=true&url='+url,'_blank'); });
        $('.fa-pinterest').off("click").on("click", function(e) {
           e.preventDefault(); window.open('https://www.pinterest.com/pin/create/button/?url='+url,'_blank'); });
        $('.fa-stumbleupon').off("click").on("click", function(e) {
           e.preventDefault(); window.open('http://www.stumbleupon.com/submit?url='+url,'_blank'); });
        $('.fa-delicious').off("click").on("click", function(e) {
           e.preventDefault(); window.open('https://delicious.com/save?v=5&noui&jump=close&url='+url,'_blank'); });
        $('.fa-envelope').off("click").on("click", function(e) {
           e.preventDefault(); window.open('mailto:?subject=Share With Friends&body='+url,'_blank'); });

    }

    function owlnavcenter(){
     jQuery('.owl-custom-nav').each(function () {
         const $nav = jQuery(this);
         const owl = jQuery($nav.data('target')); // ambil id target carousel

         owl.owlCarousel();

         // Custom Navigation Events khusus untuk nav ini
         $nav.find(".btn-next").on("click", function () {
             owl.trigger('next.owl.carousel');
         });
         $nav.find(".btn-prev").on("click", function () {
             owl.trigger('prev.owl.carousel');
         });
     });
     
     jQuery('.de-custom-nav').each(function () {
         const $nav = jQuery(this);
         const owl = jQuery($nav.data('target')); // ambil id target carousel

         owl.owlCarousel();

         // Custom Navigation Events khusus untuk nav ini
         $nav.find(".d-next").on("click", function () {
             owl.trigger('next.owl.carousel');
         });
         $nav.find(".d-prev").on("click", function () {
             owl.trigger('prev.owl.carousel');
         });
     });
    }

    function deTabs(){
        $('.de-tab').each(function() {
            const activeIndex = $(this).find('.active-tab').index(),
                 $contentlis = $(this).find('.d-tab-content > li'),
                 $tabslis = $(this).find('.d-tab-nav > li');
             
             // Show content of active tab on loads
             $contentlis.eq(activeIndex).show();

             $(this).find('.d-tab-nav').on('click', 'li', function (e) {
               const $current = $(e.currentTarget),
                   index = $current.index();
               
               $tabslis.removeClass('active-tab');
               $current.addClass('active-tab');
               $contentlis.hide().eq(index).fadeIn();
                });
        });
    }

    // text rotatation begin
    const circles = document.querySelectorAll('.text-circle');
    if (circles.length === 0) {
      console.warn('No .text-circle elements found.');
    }
    circles.forEach(circle => {
      const text = circle.dataset.text || "";
      const chars = text.split('');
      const len = chars.length;
      if (len === 0) return; // lewati jika kosong
      circle.innerHTML = '';
      chars.forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        const angle = (360 / len) * i;
        span.style.transform = `rotate(${angle}deg) translateY(-50%)`;
        circle.appendChild(span);
      });
    });
    // text rotatation end

     /* --------------------------------------------------
      * document ready
      * --------------------------------------------------*/
     $(function(){
        $('#de-loader').prepend($('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'));
         'use strict';
         modeRtl();         
         $(".jarallax").jarallax();
         loadMagnificPopup();
         gridGallery();
         initResize();
         deProgress();
         deCountdown();
         deShare();
         deTabs();
         owlnavcenter();
        $(function() {
            $('.lazy').lazy();
        });

        // button effect //

        $('.fx-slide').each(function() {
            const text = jQuery(this).text();
            jQuery(this).attr('data-hover',text);
        });

        // aside menu //

        $('.sub-menu ul').hide();

        $(".sub-menu a").on("click", function (e) {
            e.preventDefault(); // optional: prevents default link behavior

            const currentSubMenu = $(this).parent(".sub-menu").children("ul");
            const icon = $(this).find(".right");

            // Hide all other sub-menus
            $('.sub-menu ul').not(currentSubMenu).slideUp(300);
            $('.sub-menu a .right').not(icon).removeClass("fa-caret-up").addClass("fa-caret-down");

            // Toggle current submenu
            currentSubMenu.slideToggle(300);

            // Toggle icon direction
            if (icon.hasClass("fa-caret-down")) {
                icon.removeClass("fa-caret-down").addClass("fa-caret-up");
            } else {
                icon.removeClass("fa-caret-up").addClass("fa-caret-down");
            }
        });

        // aside burger menu

        $("#aside-menu").on("click", function () {
            const isOpen = $("#aside-menu").hasClass("open");

            if (isOpen) {
                $("#aside-menu, #aside").removeClass("open");
                $(this).find("i").removeClass("fa-times").addClass("fa-bars");
            } else {
                $("#aside-menu, #aside").addClass("open");
                $(this).find("i").removeClass("fa-bars").addClass("fa-times");
            }
        });


        // switch

        $('.opt-2').css('display','none');

         $("#sw-1").off("click").on("click", function(e) {
             e.preventDefault();
            if($(this).is(":checked")){
                $('.opt-1').css('display','none');
                $('.opt-2').css('display','inline-block');
            }else{
                $('.opt-2').css('display','none');
                $('.opt-1').css('display','inline-block');
            }
        });

         /* de-number begin */

         // Handle quantity buttons
         $('.d-minus').off("click").on("click", function(e) {
             e.preventDefault();
             const $input = $(this).parent().find('input');
             let count = parseInt($input.val(), 10) - 1;
             count = count < 0 ? 0 : count;
             $input.val(count).change();
             return false;
         });

         $('.d-plus').off("click").on("click", function(e) {
             e.preventDefault();
             const $input = $(this).parent().find('input');
             let count = parseInt($input.val(), 10) + 1;
             count = count > 10 ? 10 : count;
             $input.val(count).change();
             return false;
         });
         /* de-number close */


         // --------------------------------------------------
         // custom position
         // --------------------------------------------------
         const $doc_height = jQuery(window).innerHeight();
         jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
         jQuery('.full-height .de-video-container').css("min-height", $doc_height);


         // autoshow header
         if (jQuery('header').hasClass("autoshow")) {
             opAutoshow = 1;
         }


         // add menu indicators
         $('#mainmenu > li:has(ul)').addClass('menu-item-has-children');
         $('#mainmenu li:has(ul)').addClass('has-child');


         // load more items
         $(".d-item").slice(0, 8).show();
         $("#loadmore").on("click", function(e) {
             e.preventDefault();
             $(".d-item:hidden").slice(0, 4).slideDown();
             if ($(".d-item:hidden").length === 0) {
                 $("#loadmore").hide();
             }
         });


         // carousel hover
         jQuery(".d-carousel").on("mouseenter", function() {
             jQuery('.d-arrow-left, .d-arrow-right').fadeTo(50, 1);
         }).on("mouseleave", function() {
             jQuery('.d-arrow-left, .d-arrow-right').fadeTo(50, 0);
         });


         // format select2 with flag
         function formatState(state) {
             if (!state.id) return state.text;
             const $state = $(
                 `<span><img src="${$(state.element).attr('data-src')}" class="img-flag" /> ${state.text}</span>`
             );
             return $state;
         }


         // skrollr init
         skrollr.init();
         const s = skrollr.init();
         if (s.isMobile()) s.destroy();


         // --------------------------------------------------
         // navigation for mobile
         // --------------------------------------------------
         jQuery('#menu-btn').off("click").on("click", function(e) {
             e.preventDefault();
             const $header = jQuery('header');
             const h = $header[0].scrollHeight;

             if (mobileMenuShow === 0) {
                 $header.addClass('menu-open').css('height', $(window).innerHeight());
                 mobileMenuShow = 1;
                 jQuery(this).addClass("menu-open");
             } else {
                 $header.removeClass('menu-open').css('height', 'auto');
                 mobileMenuShow = 0;
                 jQuery(this).removeClass("menu-open");
             }
         });

         jQuery("a.btn").on("click", function(evn) {
             if (this.href.indexOf('#') === -1) {
                 evn.preventDefault();
                 jQuery('html,body').scrollTo(this.hash, this.hash);
             }
         });
         // btn arrow up
         jQuery(".arrow-up").off("click").on("click", function(e) {
             e.preventDefault();
             jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function() {
                 jQuery("#hide-content").fadeIn(600, function() {
                     jQuery('.arrow-up').animate({
                         'bottom': '-40px'
                     }, "slow");
                     jQuery('.arrow-down').animate({
                         'top': '0'
                     }, "slow");
                 });
             });
         });
         // btn arrow down
         jQuery(".arrow-down").off("click").on("click", function(e) {
             e.preventDefault();
             jQuery("#hide-content").fadeOut("slow", function() {
                 jQuery(".coming-soon .coming-soon-content").fadeIn(800, function() {
                     jQuery('.arrow-up').animate({
                         'bottom': '0px'
                     }, "slow");
                     jQuery('.arrow-down').animate({
                         'top': '-40'
                     }, "slow");
                 });
             });
         });
         /* --------------------------------------------------
          after window load
          * --------------------------------------------------*/
         
        setTimeout(function () {
        $("#cookieConsent").fadeIn(400);
         }, 2000);
        $("#closeCookieConsent, .cookieConsentOK").off("click").on("click", function(e) {
             e.preventDefault();
            $("#cookieConsent").fadeOut(400);
        });

        $(".switch-with-title .checkbox").change(function() {
            if(this.checked) {
                jQuery(this).parent().parent().find('.hide-content').show();
            }else{
                jQuery(this).parent().parent().find('.hide-content').hide();
            }
        });
         customBg();
         menuArrow();
         customElements();
         init(); 
         
         new WOW().init();

         
         // one page navigation
         /**
          * This part causes smooth scrolling using scrollto.js
          * We target all a tags inside the nav, and apply the scrollto.js to it.
          */
         $("#homepage nav a, .scroll-to").on("click", function(evn) {
             if (this.href.indexOf('#') === -1) {
                 evn.preventDefault();
                 jQuery('html,body').scrollTo(this.hash, this.hash);
             }
         });
         sequence();
         sequenceA();

         // product click notification begin
         $("<div/>").attr('id','de_notif').appendTo('body');

         function de_atc(n) {
             $("#de_notif").html(n);
         };

         jQuery(".de__pcard .atr__wish-list").on("click", function () {
             
            const iteration = $(this).data('iteration') || 1;
            
            switch (iteration) {
                case 1:
                     jQuery(this).addClass("active");
                     $("#de_notif").removeClass("active");
                     de_atc('Product added to wishlist');
                     $("#de_notif").addClass("active");
                     setTimeout(function() {
                         $("#de_notif").removeClass("active");
                     }, 1500);
                     break;
                case 2:
                     jQuery(this).removeClass("active");
                     $("#de_notif").addClass("active");
                     de_atc('Product removed from wishlist');
                     setTimeout(function() {
                         $("#de_notif").removeClass("active");
                     }, 1500);
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         
         });

         jQuery(".de__pcard .atr__add-cart").on("click", function () {
             
            $("#de_notif").removeClass("active");
            de_atc('Product added to cart');
            $("#de_notif").addClass("active");
            setTimeout(function() {
                $("#de_notif").removeClass("active");
            }, 1500);
         
         });
         // product click notification close
         
         // ecommerce begin
         jQuery(".de__pcard .atr__opt div").on("click", function () {
             const img_url = jQuery(this).attr('data-image');
             const sc = jQuery(this).parent().parent().parent().find(".atr__image-main");
             sc.attr('src', img_url);
             jQuery(this).parent().find("div").removeClass("active");
             jQuery(this).addClass("active");
         });

         jQuery(".de__pcard .atr__colors div").on("click", function () {
             const img_url = jQuery(this).attr('data-image');
             const sc = jQuery(this).parent().parent().parent().find(".atr__image-main");
             sc.attr('src', img_url);
             jQuery(this).parent().find("div").removeClass("active");
             jQuery(this).addClass("active");
         });

         jQuery(".atr__colors.view div").on("click", function () {
             const img_url = jQuery(this).attr('data-image');
             const sc = jQuery(this).parent().parent().parent().find(".atr__image-main");
             sc.attr('src', img_url);
             jQuery(this).parent().find("div").removeClass("active");
             jQuery(this).addClass("active");
         });

         // // ecommerce end

             // price range slider

             const rangeInput = document.querySelectorAll(".range-input input"),
               priceInput = document.querySelectorAll(".price-input input"),
               range = document.querySelector(".slider .progress");
             let priceGap = 0;

             priceInput.forEach((input) => {
               input.addEventListener("input", (e) => {
                 let minPrice = parseInt(priceInput[0].value,10),
                   maxPrice = parseInt(priceInput[1].value,10);

                 if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                   if (e.target.className === "input-min") {
                     rangeInput[0].value = minPrice;
                     range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                   } else {
                     rangeInput[1].value = maxPrice;
                     range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                   }
                 }
               });
             });

             rangeInput.forEach((input) => {
               input.addEventListener("input", (e) => {
                 let minVal = parseInt(rangeInput[0].value,10),
                   maxVal = parseInt(rangeInput[1].value,10);

                 if (maxVal - minVal < priceGap) {
                   if (e.target.className === "range-min") {
                     rangeInput[0].value = maxVal - priceGap;
                   } else {
                     rangeInput[1].value = minVal + priceGap;
                   }
                 } else {
                   priceInput[0].value = minVal;
                   priceInput[1].value = maxVal;
                   if($('body').hasClass('rtl')){
                    range.style.right = (minVal / rangeInput[0].max) * 100 + "%";
                    range.style.left = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                   }else{                
                    range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                   }
                 }
               });
             });
         // price range slider end

         // cart button & popup
        jQuery('#extra-content').addClass('wow');

        jQuery("#btn-extra, #btn-cart").off("click").on("click", function(e) {
             e.preventDefault();
           jQuery('#extra-wrap').addClass('open');
           //jQuery('body').addClass('no-scroll');
           jQuery('#extra-content').addClass('fadeInRight');
        });

        jQuery("#btn-close").off("click").on("click", function(e) {
             e.preventDefault();
           jQuery('#extra-wrap').removeClass('open');
           //jQuery('body').removeClass('no-scroll');
           jQuery('#extra-content').removeClass('fadeInRight');
        });

        // accordion
        $('.accordion-section-title').on("click", function(e) {
            const currentAttrValue = $(this).data('tab');
            if ($(e.target).is('.active')) {
                $(this).removeClass('active');
                $('.accordion-section-content:visible').slideUp(300);
            } else {
                $('.accordion-section-title')
                    .removeClass('active')
                    .filter(this)
                    .addClass('active');
                $('.accordion-section-content')
                    .slideUp(300)
                    .filter(currentAttrValue)
                    .slideDown(300);
            }
        });

        // owl sync begin
        const sync1 = $("#sync1");
        const sync2 = $("#sync2");
        const slidesPerPage = 5; // globally define number of elements per page
        const syncedSecondary = true;

        sync1.owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: false, 
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: [
                '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
                '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'
            ],
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function() {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items: slidesPerPage,
                dots: false,
                nav: false,
                smartSpeed: 200,
                slideSpeed: 500,
                slideBy: slidesPerPage,
                responsiveRefreshRate: 100
            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            const count = el.item.count - 1;
            let current = Math.round(el.item.index - (el.item.count / 2) - 0.5);

            if (current < 0) current = count;
            if (current > count) current = 0;

            sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");

            const onscreen = sync2.find('.owl-item.active').length - 1;
            const start = sync2.find('.owl-item.active').first().index();
            const end = sync2.find('.owl-item.active').last().index();

            if (current > end) {
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                const number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function(e) {
            e.preventDefault();
            const number = $(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });
        // owl sync end


        // textarea autoresize
        jQuery.each(jQuery('textarea[data-autoresize]'), function() {
            const offset = this.offsetHeight - this.clientHeight;

            const resizeTextarea = function(el) {
                jQuery(el)
                    .css('height', 'auto')
                    .css('height', el.scrollHeight + offset);
            };

            jQuery(this)
                .on('keyup input', function() { resizeTextarea(this); })
                .removeAttr('data-autoresize');
        });


         /* --------------------------------------------------
          * window | on resize
          * --------------------------------------------------*/
         $(window).resize(function() {
             initResize();
             gridGallery();
         });

         /* --------------------------------------------------
          * window | on scroll
          * --------------------------------------------------*/
         jQuery(window).on("scroll", function() {
             onScroll();
         });         
          
        
     });

    $(window).on('load', function() {
        jQuery('#de-loader').fadeOut(500);
        filterGallery();
        window.dispatchEvent(new Event('resize'));        
         filterGallery();
         masonry();

        $('.grid').isotope({
            itemSelector: '.grid-item'
        });
        gridGallery();
    });
    
 })(jQuery);