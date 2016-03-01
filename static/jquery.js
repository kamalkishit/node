	/*side nav bar*/
	$(function(){
		var navToggle = $('body').find('.nav-toggle-btn');
		navToggle.on('click',function(){
			$('body').addClass('active-nav');
			$('.nav-toggle-btn').addClass('nav-toggle-btn-active');
		});
		$('.row,.card,nav.side-nav ul li a').on('click',function(){
			$('body').removeClass('active-nav');
			$('.nav-toggle-btn').removeClass('nav-toggle-btn-active');
		});
	});

(function (window, $) {
  
  $(function() {
    
    
    $('.ripple').on('click', function (event) {
      event.preventDefault();
      
      var $div = $('<div/>'),
          btnOffset = $(this).offset(),
      		xPos = event.pageX - btnOffset.left,
      		yPos = event.pageY - btnOffset.top;
      

      
      $div.addClass('ripple-effect');
      var $ripple = $(".ripple-effect");
      
      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
        .css({
          top: yPos - ($ripple.height()/2),
          left: xPos - ($ripple.width()/2),
          background: $(this).data("ripple-color")
        }) 
        .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 2000);
    });
    
  });
  
})(window, jQuery);