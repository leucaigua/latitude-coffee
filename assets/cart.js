$(document).ready(function() {

  // for dropdown cart
  function addToCartSuccess(){
    $.get("/cart",function(data){
      var miniCartBodyHTML = $(data).find('.mini-cart-has-item').html();
      $('.mini-cart-has-item').html(miniCartBodyHTML);
      $('.cartDrawer').removeClass('is-empty');
      });
    }
  
  // for refresh cart
  function refreshCart(cart) {
    var mf = "{{ shop.money_format }}";
      $('.cart-header .cart-price b').text(Shopify.formatMoney(cart.original_total_price), mf);
      $('.cart-header .count').text(cart.item_count+' items');
  }
  
    // for main cart
    function addToMainCartSuccess(){
    $.get("/cart",function(data){
      var miniCartBodyHTML = $(data).find('cart-items').html();
      $('cart-items').html(miniCartBodyHTML);
      $('.cart-item-wrap').removeClass('is-empty');
      $('.cart-footer-wrap').removeClass('is-empty');
      $('.cart-empty-block').removeClass('is-empty');
      var cart_total = $(data).find('#main-cart-footer').html(); 
      $('#main-cart-footer').html(cart_total);
    });
  }
  
// for add to cart button
 $('body').on('click', '.cart-btn', function(e){
   e.preventDefault();
    var btn = $(this);
    var variant = $(this).siblings('input[name="id"]').val();
   if ($(this).parents('.product-card').length > 0) {
    var quantity = 1;
   }else if($(this).parents('.quickview_popup_data').length > 0){
     var quantity = $('.quickview_popup_data').find('.quantity__input').val();
   }else{
     var quantity = $('.product-main-section').find('.quantity__input').val();
   }

      $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: {id: variant, quantity: quantity},    
      dataType: 'json',
      success: function(){
        addToCartSuccess();
        setTimeout(function () {
        $('body').addClass('no-scroll cartOpen');
        $('.overlay').addClass('cart_overlay');
        }, 50);
        $('.disclosure__list-wrapper').addClass('hide');
        $.getJSON("/cart.js",function(cart){
        refreshCart(cart);
      });
      }
    });
  }); 

  
  // for cart-drawer and main cart quantity
  $(document).on('click', '.cart-item__quantity-wrapper .qty-spinner .quantity__button, .cartDrawer .quantity__button', function(e) {
    e.preventDefault();

    var id = parseInt($(this).siblings('input').attr('data-qid'));
    var ip = parseInt($(this).siblings('input').val());
    var cart_quan = $(this);
    
     if($(this).hasClass('quantity-increment')) {
      ip = ip + 1;
    } else {
      ip = ip - 1;
    }
    if(ip==0) {
      return false;
    }
    $(this).siblings('input').val(ip);
    
    $.ajax({
      type: 'POST',
      url: '/cart/update.js',
      data: 'updates['+id+']='+ip,
      dataType: 'json',
      success: function( data ) {
        
      if(cart_quan.hasClass('cart-quan')){
         addToMainCartSuccess();
      }else{
        addToCartSuccess();
      }
      $.getJSON("/cart.js", function(cart) {
        refreshCart(cart);
      });
    }
  });
 
  });
  
// for remove cart drawer and main cart
  $('body').on('click', 'cart-remove-button', function(e) {
  e.preventDefault();
  var id = $(this).find('a').data("id");
  var cart_button = $(this); 
    
  $.ajax({
    type: "POST",
    url: "/cart/change.js",
    data: {
      id: id,
      quantity: 0
    },
    dataType: "json",
    success: function(data) {
      if(cart_button.hasClass('cart-drawer-remove')){
        
         if (data.item_count === 0) {
          $('.mini-cart-has-item').empty();
          $('.cartDrawer').addClass('is-empty');
          refreshCart(data);
        } else {
          addToCartSuccess();
           $.getJSON("/cart.js", function(cart) {
            refreshCart(cart);
          });
        }
        
      }else{
         if (data.item_count === 0) {
          $('#main-cart-items').empty();
          $('.cart-item-wrap').addClass('is-empty');
          $('.cart-footer-wrap').addClass('is-empty');
          $('.cart-empty-block').addClass('is-empty');
          refreshCart(data);
        } else {
          addToMainCartSuccess();
           $.getJSON("/cart.js", function(cart) {
            refreshCart(cart);
          });
        }
        
      }
      
     
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
});


// main cart
$('body').on("click", ".gift-cart-btn", function(e) {
  e.preventDefault();
  var variant = $(this).siblings('input[name="id"]').val();
  
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: {id:variant,quantity:1},    
    dataType: 'json',
    success: function(){
      addToMainCartSuccess();
      $.getJSON("/cart.js", function(cart) {
        refreshCart(cart);
      });
    }
  });
});

  
$('body').on("change", ".gift_wrap_check", function(e) {
  e.preventDefault();

  // Check if the checkbox is checked
  if ($(this).is(':checked')) {
    var variant = $(this).siblings('input[name="id"]').val();
  
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: {id: variant, quantity: 1},    
      dataType: 'json',
      success: function(){
        addToCartSuccess();
        $.getJSON("/cart.js", function(cart) {
          refreshCart(cart);
        });
        $('.gift-popup').removeClass('active');
      }
       
    });
  }
});

  
});

