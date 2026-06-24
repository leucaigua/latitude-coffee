 //compare product
var getcookie = getCookie('compare');
if(getcookie){
    var splitcookie = getcookie.split('__');
    var active_compare = splitcookie.length;
  
    $( 'div.product-card' ).each(function( index ) {
        var pro_handle = $(this).find(".pro-compare input").attr("pro-handle");
        var this_data = $(this);
        $.each(splitcookie, function( index, handle ) {
          if(pro_handle == handle){
            this_data.find(".pro-compare input").addClass("compare_active");
            this_data.find(".pro-compare").addClass("active");
          }

        });
      });    

  }


$(document).on("change",'.pro-compare input',function(){
    var getoldcookie = getCookie('compare');

    if(getoldcookie){
      var splitoldcookie = getoldcookie.split('__');
      var oldcookieLength = splitoldcookie.length;
    }else{
      var oldcookieLength = 0;
    }
  
      $(this).addClass("compare_active");
      $(this).parents(".pro-compare").addClass("active");
      
      var DataVal = $(this).attr("pro-handle");
      var getcookie = getCookie('compare');

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
        setCookie('compare',setcookie,1);
      }else{
        setCookie('compare',DataVal,1);
      }
});

$(document).on("change",'.pro-compare input.compare_active',function(){
        var DataVal = $(this).attr("pro-handle");
        var getcookie = getCookie('compare');

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
        setCookie('compare',setcookie,1);
      }else{
        setCookie('compare',DataVal,1);
      }

    if (window.location.pathname.includes('/ar')) {
      window.location.href = window.location.origin + "/ar/pages/compare";
      
    }else if (window.location.pathname.includes('/es')){
      window.location.href = window.location.origin + "/es/pages/compare";
      
    }else if (window.location.pathname.includes('/de')){
      window.location.href = window.location.origin + "/de/pages/compare";
      
    }else if (window.location.pathname.includes('/fr')){
      window.location.href = window.location.origin + "/fr/pages/compare";
    }else{
      window.location.href = window.location.origin + "/pages/compare";
    }
 
});

// for sigle product remove start
$(document).on('click','.compare-prod-remove', function(){
    $(this).closest(".compare-wrap").remove();
    var removeItem = $(this).parents(".compare-wrap").attr('data-handle');
    var getcookie = getCookie('compare');
    var splitcookie = getcookie.split('__');
    splitcookie = $.grep(splitcookie, function(value) {
      return value != removeItem;
    });
    var active_compare = splitcookie.length;
    var setcookie = splitcookie.join('__');
    setCookie('compare',setcookie,1);
  });
// for sigle product remove end

// for all product clear start
$(document).on("click",".pro-compare-section .clear-all-compare",function(event){
    event.preventDefault();
    setCookie('compare','',1);
    $('.pro-compare-section .pro-compare-wrap .pro-compare-scroll').html('');
  });
// for all product clear end

if (window.location.pathname.includes('/ar')) {
  var store_url = window.location.origin + "/ar/pages/compare";
  
}else if (window.location.pathname.includes('/es')){
  var store_url = window.location.origin + "/es/pages/compare";
  
}else if (window.location.pathname.includes('/de')){
  var store_url = window.location.origin + "/de/pages/compare";
  
}else if (window.location.pathname.includes('/fr')){
  var store_url = window.location.origin + "/fr/pages/compare";
}else{
  var store_url = window.location.origin + "/pages/compare";
}

if(window.location.href == store_url){
  var getcookie = getCookie('compare');
    if(getcookie){
      var splitcookie = getcookie.split('__');
      compare(splitcookie);
    }
}

function compare(handle) {
  var comparehtml = '';
  count = 0;
  $.each(handle, function(index,value){

    if (window.location.pathname.includes('/ar')) {
      var href = "/ar/products/"+handle[index]+"?view=for_compare";
      
    }else if (window.location.pathname.includes('/es')){
      var href = "/es/products/"+handle[index]+"?view=for_compare";
      
    }else if (window.location.pathname.includes('/de')){
      var href = "/de/products/"+handle[index]+"?view=for_compare";
      
    }else if (window.location.pathname.includes('/fr')){
      var href = "/fr/products/"+handle[index]+"?view=for_compare";
      
    }else{
      var href = "/products/"+handle[index]+"?view=for_compare";
    }

    
    $.ajax({
      url:href,
      type:'GET',
      success: function(data1){
        comparehtml += data1;
      },
      complete: function(){
        $('.pro-compare-section .pro-compare-wrap .pro-compare-scroll').html(comparehtml);
        count++;
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