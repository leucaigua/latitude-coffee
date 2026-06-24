$(document).ready(function () {
    initHeaderSticky()
  });
  $(window).resize(function() {
    initHeaderSticky()
  });
  $(window).scroll(function() {
    initHeaderSticky()
  });
  function initHeaderSticky() {
    if (jQuery(document).height() > jQuery(window).height()) {
        if (jQuery('.site-header .main-navigationbar').hasClass("sticky_header")) {
          if (jQuery(this).scrollTop() > 400) {
            jQuery('.site-header .main-navigationbar').addClass("fixed");
          } else {
            jQuery('.site-header .main-navigationbar').removeClass("fixed");
          }
        } else {
          jQuery('.site-header .main-navigationbar').removeClass("fixed");
        }
    }
  }
$(document).ready(function() {
  countDownIni('.flip-countdown,.js-flip-countdown'); 
  $(".menu-lnk.has-item").hover(function(){
    $(this).toggleClass("menu_active");
    $(this).find(".menu-dropdown").toggleClass("open_menu");
    $("body").toggleClass("no-scroll");
  });
    /********* On scroll heder Sticky *********/
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("header-sticky").style.top = "0";
    } 
    // else {
    //   document.getElementById("header-sticky").style.top = "-200px";
    // }
    prevScrollpos = currentScrollPos;
  }
    /*********  size Popup  ********/ 
      $(".size-btn").click(function() { 
        $(".size-popup").toggleClass("active"); 
        $("body").toggleClass("no-scroll");
    });
    $(".close-search").click(function() { 
        $(".size-popup").removeClass("active"); 
        $("body").removeClass("no-scroll");
    });
    $(".close-btn").click(function() { 
        $(".size-popup").removeClass("active"); 
        $("body").removeClass("no-scroll");
    });
    /********* Mobile Menu ********/  
    $('.mobile-menu-button').on('click',function(e){
        e.preventDefault();
        setTimeout(function(){
            $('body').addClass('no-scroll active-menu');
            $(".mobile-menu-wrapper").toggleClass("active-menu");
            $('.overlay').addClass('menu-overlay');
        }, 50);
    }); 
    $('body').on('click','.overlay.menu-overlay, .menu-close-icon svg', function(e){
        e.preventDefault(); 
        $('body').removeClass('no-scroll active-menu');
        $(".mobile-menu-wrapper").removeClass("active-menu");
        $('.overlay').removeClass('menu-overlay');
    });
      // Header Search Popup  
  $(".search-btn").click(function () {
    $(".search-popup").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });
  $(".close-search, .search-form-wrapper #btn-submit").click(function () {
    $(".search-popup").removeClass("active");
    $("body").removeClass("no-scroll");
  });
     /********* Cart Popup ********/

  if ($('body').hasClass('cart')) {
        // Disable click on the cart-header div
        $('.cart-header').on('click', function(event) {
            event.preventDefault();
            return false;
        });
    }else{

    $('.cart-header').on('click', function (e) {
    e.preventDefault();
      setTimeout(function () {
      $('body').addClass('no-scroll cartOpen');
      $('.overlay').addClass('cart_overlay');
      }, 50);
  });
    
  }

  $('body').on('click', '.overlay.cart_overlay, .closecart', function (e) {
    e.preventDefault();
    $('.overlay').removeClass('cart_overlay');
    $('body').removeClass('no-scroll cartOpen');
    $('.coupon-popup').removeClass('active');
    $('.gift-popup').removeClass('active');
  });

  /*********coupon popup ********/
  $(document).on('click', '.coupan-icon', function () {
    $(".coupon-popup").addClass("active");
  });
  $(document).on('click', '.gift-icon', function () {
    $(".coupon-popup").removeClass("active");
  });
  $(document).on('click', '.close-coupon', function () {
    $(".coupon-popup").removeClass("active");
  });

// coupan code
  $('body').on('keyup','.discount-coupon', function() {
   var apply_href = $('.apply-coupon-btn').attr("href").split('discount=')[0];
   var val = $(this).val();
    $('.apply-coupon-btn').attr("href",apply_href+'discount='+val);
     $('.apply-coupon-btn').trigger('click');
  });

  /*********gift popup ********/
  $(document).on('click', '.gift-icon', function () {
    $(".gift-popup").addClass("active");
  });
  $(document).on('click', '.coupan-icon', function () {
    $(".gift-popup ").removeClass("active");
  });
  $(document).on('click', '.close-gift', function () {
    $(".gift-popup").removeClass("active");
  });
    /***** Mobile Filter Popup *****/
    $('.mobile-facets__open').on('click', function (e) {
    $('body').addClass('mobile-open no-scroll');
    $('.overlay').addClass('active');
  });
  $('.overlay,.close-filter,.apply-btn').on('click', function (e) {
    $('body').removeClass('mobile-open no-scroll');
    $('.overlay').removeClass('active');
  });
    /******* Cookie Js *******/
    $('.cookie-close').click(function () {
        $('.cookie').slideUp();
    });
    /******* Subscribe popup Js *******/
    $('.close-sub-btn').click(function () {
        $('.subscribe-popup').slideUp(); 
        $(".subscribe-overlay").removeClass("open");
    });      
    /*********  Multi-level accordion nav  ********/ 
    $('.acnav-label').click(function () {
        var label = $(this);
        var parent = label.parent('.has-children');
        var list = label.siblings('.acnav-list');
        if (parent.hasClass('is-open')) {
            list.slideUp('fast');
            parent.removeClass('is-open');
        }
        else {
            list.slideDown('fast');
            parent.addClass('is-open');
        }
    });  
    /****  TAB Js ****/
    $('ul.tabs li').click(function(){
        var $this = $(this);
        var $theTab = $(this).attr('data-tab');
        console.log($theTab);
        if($this.hasClass('active')){
          // do nothing
        } else{
          $this.closest('.tabs-wrapper').find('ul.tabs li, .tabs-container .tab-content').removeClass('active');
          $('.tabs-container .tab-content[id="'+$theTab+'"], ul.tabs li[data-tab="'+$theTab+'"]').addClass('active');
        }
        $('.bestpro-slider').slick('refresh');
        $('.bestsell-slider').slick('refresh');
        $('.testimonial-slider').slick('refresh');
    });   
    // HOME BANNER SLIDER JS //
    var helpers = {
        addZeros: function (n) {
            return n < 10 ? "0" + n : "" + n;
        }
    };
    function sliderInit() {
        var $slider = $(".banner-slider");
        $slider.each(function () {
        var $sliderParent = $('.first-video-section').parent();
            $(this).slick({
                draggable: true,
                arrows: false,
                dots: false, 
                fade: true,
                speed: 900, 
                autoplay:true,
                cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)', 
                touchThreshold: 100,
                slidesToScroll: 1,
                slidesToShow: 1, 
                touchMove: true, 
                loop: true,
                infinite: true,
                focusOnSelect: true, 
                responsive: [ 
                    {
                        breakpoint: 1361,
                        settings: { 
                            dots:true
                        }
                    } 
                ]
            });
            if ($(this).find(".slider-inner-text").length > 1) {
                $(this).siblings(".slides-numbers").show();
            }
            $(this).on("afterChange", function (event, slick, currentSlide) {
                $sliderParent
                    .find(".slides-numbers .active")
                    .html(helpers.addZeros(currentSlide + 1));
            });
            var sliderItemsNum = $(this).find(".slick-slide").not(".slick-cloned").length;
            $sliderParent.find(".slides-numbers .total").html(helpers.addZeros(sliderItemsNum));
        });
    }
    sliderInit();
    // HOME BANNER SLIDER JS END // 
    if($('.partner-slider').length > 0 ){
        $('.partner-slider').slick({
            autoplay: true, 
            slidesToShow: 4,
            speed: 1000,
            slidesToScroll: 1,  
            centerMode: true,
            centerPadding: 0,
            prevArrow: '<button class="slick-prev slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            nextArrow: '<button class="slick-next slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            dots: false,
            buttons: false,
            responsive: [ 
                {
                    breakpoint: 1200,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1   
                    }
                },  
                {
                breakpoint:576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1 
                    }
                },
                {
                    breakpoint: 421,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1   
                    }
                }
            ]
        });
    } 
    if($('.blog-slider').length > 0 ){
        $('.blog-slider').slick({
            autoplay: true, 
            slidesToShow: 2,
            speed: 1000,
            slidesToScroll: 1,  
            centerMode: true,
            centerPadding: 0,
            prevArrow: '<button class="slick-prev slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            nextArrow: '<button class="slick-next slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            dots: false,
            buttons: false,
            responsive: [  
                {
                breakpoint:576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1 
                    }
                } 
            ]
        });
    }
    if($('.bestpro-slider').length > 0 ){
        $('.bestpro-slider').slick({
            rows: 2,
            autoplay: true, 
            slidesToShow: 3,
            speed: 1000,
            slidesToScroll: 3,  
            centerMode: true,
            centerPadding: 0,
            prevArrow: '<button class="slick-prev slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            nextArrow: '<button class="slick-next slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            dots: false,
            buttons: false,
            responsive: [  
                {
                breakpoint:768,
                    settings: {
                        slidesToShow:2,
                        slidesToScroll: 2 
                    }
                } ,
                {
                    breakpoint: 576,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1   
                    }
                }
            ]
        });
    }
    
    if($('.testimonial-slider').length > 0 ){
        $('.testimonial-slider').slick({
            rows: 2,
            autoplay: false,
            slidesToShow: 1,
            speed: 800,
            slidesToScroll: 1,   
            arrows:false,
            dots: true,
            buttons: false, 
        });
    } 
    if($('.pro-categorie-slider').length > 0 ){
        $('.pro-categorie-slider').slick({
            autoplay: false, 
            slidesToShow: 4,
            speed: 1000,
            slidesToScroll: 1,   
            arrows:true,
            prevArrow: '<button class="slick-prev slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            nextArrow: '<button class="slick-next slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            dots: false,
            buttons: false,
            responsive: [  
                {
                breakpoint:992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1 
                    }
                },
                {
                breakpoint:768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1 
                    }
                } ,
                {
                breakpoint:576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1 
                    }
                }   
            ]
        });
    } 
    if($('.blog-slider2').length > 0 ){
        $('.blog-slider2').slick({
            autoplay: true, 
            slidesToShow: 3,
            speed: 1000,
            slidesToScroll: 1,  
            centerMode: true,
            centerPadding: 0,
            prevArrow: '<button class="slick-prev slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            nextArrow: '<button class="slick-next slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            dots: false,
            buttons: false,
            responsive: [  
                {
                breakpoint:768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1 
                    }
                },
                {
                breakpoint:576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1 
                    }
                }  
            ]
        });
    }
    // product slider 
   $('.pdp-main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 1000,
        loop: true,
        asNavFor: '.pdp-thumb-slider',
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                     prevArrow: '<button class="slide-arrow slick-prev"><svg viewBox="0 0 10 5"><path d="M2.37755e-08 2.57132C-3.38931e-06 2.7911 0.178166 2.96928 0.397953 2.96928L8.17233 2.9694L7.23718 3.87785C7.07954 4.031 7.07589 4.28295 7.22903 4.44059C7.38218 4.59824 7.63413 4.60189 7.79177 4.44874L9.43039 2.85691C9.50753 2.78197 9.55105 2.679 9.55105 2.57146C9.55105 2.46392 9.50753 2.36095 9.43039 2.28602L7.79177 0.69418C7.63413 0.541034 7.38218 0.544682 7.22903 0.702329C7.07589 0.859976 7.07954 1.11192 7.23718 1.26507L8.1723 2.17349L0.397965 2.17336C0.178179 2.17336 3.46059e-06 2.35153 2.37755e-08 2.57132Z"></path></svg></button>',
                    nextArrow: '<button class="slide-arrow slick-next"><svg viewBox="0 0 10 5"><path d="M2.37755e-08 2.57132C-3.38931e-06 2.7911 0.178166 2.96928 0.397953 2.96928L8.17233 2.9694L7.23718 3.87785C7.07954 4.031 7.07589 4.28295 7.22903 4.44059C7.38218 4.59824 7.63413 4.60189 7.79177 4.44874L9.43039 2.85691C9.50753 2.78197 9.55105 2.679 9.55105 2.57146C9.55105 2.46392 9.50753 2.36095 9.43039 2.28602L7.79177 0.69418C7.63413 0.541034 7.38218 0.544682 7.22903 0.702329C7.07589 0.859976 7.07954 1.11192 7.23718 1.26507L8.1723 2.17349L0.397965 2.17336C0.178179 2.17336 3.46059e-06 2.35153 2.37755e-08 2.57132Z"></path></svg></button>',
                }
            }
        ]
    });
    $('.pdp-thumb-slider').slick({
        slidesToShow: 4,
        arrows: true,
        asNavFor: '.pdp-main-slider',
        dots: false,
        speed: 1000,
        slidesToScroll: 1,
        touchMove: true,
        focusOnSelect: true,
        loop: true,
        infinite: true,
        vertical: true,
        prevArrow: '<button class="slide-arrow slick-prev"><svg viewBox="0 0 10 5"><path d="M2.37755e-08 2.57132C-3.38931e-06 2.7911 0.178166 2.96928 0.397953 2.96928L8.17233 2.9694L7.23718 3.87785C7.07954 4.031 7.07589 4.28295 7.22903 4.44059C7.38218 4.59824 7.63413 4.60189 7.79177 4.44874L9.43039 2.85691C9.50753 2.78197 9.55105 2.679 9.55105 2.57146C9.55105 2.46392 9.50753 2.36095 9.43039 2.28602L7.79177 0.69418C7.63413 0.541034 7.38218 0.544682 7.22903 0.702329C7.07589 0.859976 7.07954 1.11192 7.23718 1.26507L8.1723 2.17349L0.397965 2.17336C0.178179 2.17336 3.46059e-06 2.35153 2.37755e-08 2.57132Z"></path></svg></button>',
        nextArrow: '<button class="slide-arrow slick-next"><svg viewBox="0 0 10 5"><path d="M2.37755e-08 2.57132C-3.38931e-06 2.7911 0.178166 2.96928 0.397953 2.96928L8.17233 2.9694L7.23718 3.87785C7.07954 4.031 7.07589 4.28295 7.22903 4.44059C7.38218 4.59824 7.63413 4.60189 7.79177 4.44874L9.43039 2.85691C9.50753 2.78197 9.55105 2.679 9.55105 2.57146C9.55105 2.46392 9.50753 2.36095 9.43039 2.28602L7.79177 0.69418C7.63413 0.541034 7.38218 0.544682 7.22903 0.702329C7.07589 0.859976 7.07954 1.11192 7.23718 1.26507L8.1723 2.17349L0.397965 2.17336C0.178179 2.17336 3.46059e-06 2.35153 2.37755e-08 2.57132Z"></path></svg></button>',
        responsive: [
            {
            breakpoint: 574,
                settings: {
                    vertical: false,
                }
            }
        ]
    });

     // currency
  function currencyFormSubmit(event) {
    event.target.form.submit();
  }

  document.querySelectorAll('.shopify-currency-form select').forEach(function(element) {
    element.addEventListener('change', currencyFormSubmit);
  });

  // notify me
  $('body').on('click','.notify-btn', function(e) {
      e.preventDefault();
      $('body').addClass('no-scroll notify-active');
      $('.out-of-stock-form,.overlay').addClass('active');
    });
   $('body').on('click','.overlay,.notify-popup-close', function(e) {
      e.preventDefault();
     $('body').removeClass('no-scroll notify-active');
      $('.out-of-stock-form,.overlay').removeClass('active');
    });

  
// quickview
  $('body').on('click', '.quickview-close', function(e) {
    e.preventDefault();
    $('.quickview-popup').hide();
    $('body').removeClass('no-scroll quick-active');
  });
  
  $('body').on('click', '.quickview-btn, .show-qv', function(e) {
    e.preventDefault();
    $('body').addClass('no-scroll quick-active');
    var href= '/products/'+$(this).find('a').data('handle')+'?view=qv';
    $.get(href, function(product) {
      $('.quickview_popup_data').html(product);
      $('.qv_slider').slick({
          autoplay: false,
          slidesToShow: 1,
          speed: 1000,
          slidesToScroll: 1,
          arrows: true,
                     prevArrow: '<button class="slick-prev slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
            nextArrow: '<button class="slick-next slick-arrow"><span class="slickbtn"><svg><use xlink:href="#slickarrow"></use></svg></span></button>',
          dots: false,
          buttons: false,
          infinite: false,
          loop: false
      });

    });
    $('.quickview-popup').show();
  });

 $('body').on('change', '.nice-select.qv_select__select', function() {
    var selectedValues = [];

    // Collect selected option values
    $('.nice-select.qv_select__select').each(function() {
      var selectedValue = $(this).val();
      if (selectedValue) {
        selectedValues.push(selectedValue);
      }
    });
    var joinedValues = selectedValues.join(' / ');


    $('.variant-qv').each(function() {
     var variant_title = $(this).data('title'); 
     var variant_img = $('.variant-qv[data-title="'+variant_title+'"]').data('img');
     var variant_price = $('.variant-qv[data-title="'+variant_title+'"]').data('price');
     var qv_btn =  $('.variant-qv[data-title="'+variant_title+'"]').data('avail');
     var variant_id = $('.variant-qv[data-title="'+variant_title+'"]').data('id');
      variant_title = String(variant_title);
      joinedValues = String(joinedValues);
      
      if(variant_title === joinedValues){
      var slideIndex = $('.qv_slider .qv-pro-slider-img img[data-img="'+variant_img+'"]').parent().index();
      $('.qv_slider').slick('slickGoTo', slideIndex)
        
        $('.qv-price').find('.price-item--regular').text(variant_price);

        if(qv_btn === true ){
          $('#quick-view-temp .product-form__submit').find('span').text('Add to Cart');
          $('#quick-view-temp .product-form__submit').removeAttr('disabled');
          $('#quick-view-temp .quantity-select').show();
        }else{
          $('#quick-view-temp .product-form__submit').find('span').text('Sold out');
          $('#quick-view-temp .product-form__submit').attr('disabled', 'disabled');
          $('#quick-view-temp .quantity-select').hide();
        }

        $('input[name="id"]').val(variant_id);
        
      }
  });
  
  });
// end quickview

    // custom reviews on product page
  $(window).on('load', function() {
    $(".pdp-summery").find(".jdgm-prev-badge").append("<a class='product-write-review d-flex align-items-center'><svg xmlns='http://www.w3.org/2000/svg' fill='#ffffff' id='Outline' viewBox='0 0 24 24' width='16' height='16'><path d='M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z'></path></svg> Write a Review</a>");
  });
  
}); 

if ($(".my-acc-column").length > 0) {
    jQuery(function ($) {
        var topMenuHeight = $("#daccount-nav").outerHeight();
        $("#account-nav").menuScroll(topMenuHeight);
        $(".account-list li:first-child").addClass("active");
    });
    // COPY THE FOLLOWING FUNCTION INTO ANY SCRIPTS
    jQuery.fn.extend({
        menuScroll: function (offset) {
            // Declare all global variables
            var topMenu = this;
            var topOffset = offset ? offset : 0;
            var menuItems = $(topMenu).find("a");
            var lastId;
            // Save all menu items into scrollItems array
            var scrollItems = $(menuItems).map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });
            // When the menu item is clicked, get the #id from the href value, then scroll to the #id element
            $(topMenu).on("click", "a", function (e) {
                var href = $(this).attr("href");
                var offsetTop = href === "#" ? 0 : $(href).offset().top - topOffset;
                function checkWidth() {
                    var windowSize = $(window).width();
                    if (windowSize <= 767) {
                        $('html, body').stop().animate({
                            scrollTop: offsetTop - 200
                        }, 300);
                    }
                    else {
                        $('html, body').stop().animate({
                            scrollTop: offsetTop - 100
                        }, 300);
                    }
                }
                // Execute on load
                checkWidth();
                // Bind event listener
                $(window).resize(checkWidth);
                e.preventDefault();
            });
            // When page is scrolled
            $(window).scroll(function () {
                function checkWidth() {
                    var windowSize = $(window).width();
                    if (windowSize <= 767) {
                        var nm = $("html").scrollTop();
                        var nw = $("body").scrollTop();
                        var fromTop = (nm > nw ? nm : nw) + topOffset;
                        // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
                        var current = $(scrollItems).map(function () {
                            if ($(this).offset().top - 250 <= fromTop)
                                return this;
                        });
                        // Get the most recent passed section from current array
                        current = current[current.length - 1];
                        var id = current && current.length ? current[0].id : "";
                        if (lastId !== id) {
                            lastId = id;
                            // Set/remove active class
                            $(menuItems)
                                .parent().removeClass("active")
                                .end().filter("[href='#" + id + "']").parent().addClass("active");0
                        }
                    }
                    else {
                        var nm = $("html").scrollTop();
                        var nw = $("body").scrollTop();
                        var fromTop = (nm > nw ? nm : nw) + topOffset;
                        // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
                        var current = $(scrollItems).map(function () {
                            if ($(this).offset().top <= fromTop)
                                return this;
                        });
                        // Get the most recent passed section from current array
                        current = current[current.length - 1];
                        var id = current && current.length ? current[0].id : "";
                        if (lastId !== id) {
                            lastId = id;
                            // Set/remove active class
                            $(menuItems)
                                .parent().removeClass("active")
                                .end().filter("[href='#" + id + "']").parent().addClass("active");
                        }
                    }
                }
                // Execute on load
                checkWidth();
                // Bind event listener
                $(window).resize(checkWidth);
            });
        }
    });
} 
function responsiveMenu(){
  if(jQuery(window).width() < 768) {
    $('.product-filter-column').prependTo('.product-heading-row .container .row');
  }
  else { 
    $('.product-filter-column').prependTo('.product-list-row');
  }
}
jQuery(document).ready(function() {
  responsiveMenu();
});
jQuery(window).resize(function() {
  responsiveMenu();
});
function countDownIni(countdown) {
  $(countdown).each(function () {
    var countdown = $(this);
    var promoperiod;
    if (countdown.attr('data-promoperiod')) {
      promoperiod = new Date().getTime() + parseInt(countdown.attr('data-promoperiod'), 10);
    } else if (countdown.attr('data-countdown')) {
      promoperiod = countdown.attr('data-countdown');
    }
    if (Date.parse(promoperiod) - Date.parse(new Date()) > 0) {
      $(this).addClass('countdown-block');
      countdown.countdown(promoperiod, function (event) {
        // countdown.html(event.strftime('%-w weeks %-d days %Hh %Mm %Ss'));
        countdown.html(event.strftime('<span><span>%D</span><span class="dots"> : </span></span>' + '<span><span>%H</span><span class="dots"> : </span></span>' + '<span><span>%M</span><span class="dots"> : </span></span>' + '<span><span class="second">%S</span></span>'));
      });
    }

  });
}