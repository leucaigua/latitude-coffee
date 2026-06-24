var getcookie = getCookie('wishlist');
if(getcookie){
    var splitcookie = getcookie.split('__');
    var active_wishlist = splitcookie.length;
    $('.pro-wishlist-section .wishlist-head h3').find('span').text(active_wishlist);
      $('.headwish a').find('span').text(active_wishlist);
  
  //first-code-card
    var handleFound = false;
      $( 'div.product-card' ).each(function( index ) {
          var pro_handle = $(this).find(".pro-wishlist input").attr("pro-handle");
          var this_data = $(this);
          $.each(splitcookie, function( index, handle ) {
            if(pro_handle == handle){
              var handleFound = true;
              this_data.find(".pro-wishlist input").addClass("wishlist_active");
              this_data.find(".pro-wishlist").addClass("active");
              $(".wish-lbl-wrp .pro-wishlist.active").find("label .wishlist-label").html('<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path><use xlink:href="#icon-close"></use></svg>');
            }
          });
        });  

  //product page
    if (!handleFound) {
        var pro_handle = $('.pdp-summery').find(".pro-wishlist input").attr("pro-handle");
        var this_data = $('.pdp-summery');
        if ($.inArray(pro_handle, splitcookie) !== -1) {
            this_data.find(".pro-wishlist input").addClass("wishlist_active");
            this_data.find(".pro-wishlist").addClass("active");
            $(".pdp-summery .pro-wishlist.active").find("label .wishlist-label").html('<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path><use xlink:href="#icon-close"></use></svg>');
        }
    }
  }



$(document).on("change",'.pro-wishlist input',function(){
    var getoldcookie = getCookie('wishlist');

    if(getoldcookie){
      var splitoldcookie = getoldcookie.split('__');
      var oldcookieLength = splitoldcookie.length;
    }else{
      var oldcookieLength = 0;
    }
  
      $(this).addClass("wishlist_active");
      $(this).parents(".pro-wishlist").addClass("active");
      $(".wish-lbl-wrp .pro-wishlist.active").find("label .wishlist-label").html('<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path><use xlink:href="#icon-close"></use></svg>');
      $(".pdp-summery .pro-wishlist.active").find("label .wishlist-label").html('<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="16" height="16" fill="#ffffff"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path><use xlink:href="#icon-close"></use></svg>');
 
      var DataVal = $(this).attr("pro-handle");
      var getcookie = getCookie('wishlist');

      if(getcookie){
        var splitcookie = getcookie.split('__');
        var inarray = jQuery.inArray( DataVal, splitcookie );
        if(inarray < 0){
          splitcookie.push(DataVal);
        }else{
          splitcookie = $.grep(splitcookie, function(value) {
            return value != DataVal;
          });
        }
        var setcookie = splitcookie.join('__');
        setCookie('wishlist',setcookie,1);
      }else{
        setCookie('wishlist',DataVal,1);
      }

   // Count cookie items and update display
    var getcookie = getCookie('wishlist');
    var splitcookie = getcookie.split('__');
    var active_wishlist = splitcookie.length;
    $('.headwish a').find('span').text(active_wishlist);


  //second-code-card
  var getcookie = getCookie('wishlist');
  $('div.product-card').each(function (index) {
      if (getcookie) {
          var splitcookie = getcookie.split('__');
          var pro_handle = $(this).find(".pro-wishlist input").attr("pro-handle");
          var this_data = $(this);
  
          $.each(splitcookie, function (index, handle) {
              if (pro_handle == handle) {
                  this_data.find(".pro-wishlist input").addClass("wishlist_active");
                  this_data.find(".pro-wishlist").addClass("active");
                  $(".wish-lbl-wrp .pro-wishlist.active").find("label .wishlist-label").html('<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="16" height="16" fill="#ff0000"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path><use xlink:href="#icon-close"></use></svg>');
              }
          });
      }
  });

});
//page redirect
$(document).on("change",'.pro-wishlist input.wishlist_active',function(){
        var DataVal = $(this).attr("pro-handle");
        var getcookie = getCookie('wishlist');

      if(getcookie){
        var splitcookie = getcookie.split('__');

        var inarray = jQuery.inArray( DataVal, splitcookie );
        if(inarray < 0){
          splitcookie.push(DataVal);
        }else{
          splitcookie = $.grep(splitcookie, function(value) {
            return value != DataVal;
          });
        }
        var setcookie = splitcookie.join('__');
        setCookie('wishlist',setcookie,1);
      }else{
        setCookie('wishlist',DataVal,1);
      }

    if (window.location.pathname.includes('/ar')) {
      window.location.href = window.location.origin + "/ar/pages/wishlist";
      
    }else if(window.location.pathname.includes('/es')){
      window.location.href = window.location.origin + "/es/pages/wishlist";
      
    }else if(window.location.pathname.includes('/de')){
      window.location.href = window.location.origin + "/de/pages/wishlist";
      
    }else if(window.location.pathname.includes('/fr')){
      window.location.href = window.location.origin + "/fr/pages/wishlist";
    }else{
      window.location.href = window.location.origin + "/pages/wishlist";
    }
});

// for sigle product remove start
$(document).on('click','.wishlist-prod-remove', function(){
    $(this).closest(".wishlist-wrap").remove();
    var removeItem = $(this).parents(".wishlist-wrap").attr('data-handle');
    var getcookie = getCookie('wishlist');
    var splitcookie = getcookie.split('__');
    splitcookie = $.grep(splitcookie, function(value) {
      return value != removeItem;
    });
    var active_wishlist = splitcookie.length;
     $('.pro-wishlist-section .wishlist-head h3').find('span').text(active_wishlist);
     $('.headwish a').find('span').text(active_wishlist);
    var setcookie = splitcookie.join('__');
    setCookie('wishlist',setcookie,1);
  });
// for sigle product remove end

// for all product clear start
$(document).on("click",".pro-wishlist-section .clear-all-wishlist",function(event){
    event.preventDefault();
    setCookie('wishlist','',1);
    $('.pro-wishlist-section .pro-wishlist-wrap .pro-wishlist-scroll').html('');
    $('.pro-wishlist-section .wishlist-head h3').find('span').text('0');
    $('.headwish a').find('span').text('0');
    
  });
// for all product clear end


//data get
if (window.location.pathname.includes('/ar')) {
  var store_url = window.location.origin + "/ar/pages/wishlist";
  
}else if(window.location.pathname.includes('/es')){
  var store_url = window.location.origin + "/es/pages/wishlist";
  
}else if(window.location.pathname.includes('/de')){
  var store_url = window.location.origin + "/de/pages/wishlist";
  
}else if(window.location.pathname.includes('/fr')){
  var store_url = window.location.origin + "/fr/pages/wishlist";
}else{
  var store_url = window.location.origin + "/pages/wishlist";
}

if(window.location.href == store_url){
  var getcookie = getCookie('wishlist');
    if(getcookie){
      var splitcookie = getcookie.split('__');
      wishlist(splitcookie);
    }
}

function wishlist(handle) {
  var wishlisthtml = '';
  count = 0;
  $.each(handle, function(index,value){

    if (window.location.pathname.includes('/ar')) {
      var href = "/ar/products/"+handle[index]+"?view=for_wishlist";
      
    }else if (window.location.pathname.includes('/es')){
      var href = "/es/products/"+handle[index]+"?view=for_wishlist";
      
    }else if(window.location.pathname.includes('/de')){
      var href = "/de/products/"+handle[index]+"?view=for_wishlist";
      
    }else if(window.location.pathname.includes('/fr')){
      var href = "/fr/products/"+handle[index]+"?view=for_wishlist";
      
    }else{
      var href = "/products/"+handle[index]+"?view=for_wishlist";
    }

    
    $.ajax({
      url:href,
      type:'GET',
      success: function(data1){
        wishlisthtml += data1;
      },
      complete: function(){
        $('.pro-wishlist-section .pro-wishlist-wrap .pro-wishlist-scroll').html(wishlisthtml);
        count++;
        $('.headwish a').find('span').text(count);
      }
    });
  }); 
  
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}