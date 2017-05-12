$(document).ready(function(){

  $(".offerta").on("click", function() {
    var productId = $(this).data('productid');
    addProducts([productId]);
    openShoulder();
  });

  function addProducts(productIds){
    Ember.instrument('ecommerce.add_to_cart', { 'productIds': productIds, 'cookies': {} });
  }

  Ember.subscribe('ecommerce.close_shoulder', {
    before: function() {
      Ember.debug('Will close shoulder');
    },
    after: function() {
      closeShoulder();
      Ember.debug('Did close shoulder');
    }
  });

  function openShoulder() {
    $(".shoulder").addClass("open");
    $(".close-shoulder").show();
    $(".overlay").show();
    $("body").css('overflow','hidden');
  }

  function closeShoulder() {
    $('.shoulder').removeClass('open');
    $("body").css('overflow','visible');
    $('.overlay').hide();
  }


});
