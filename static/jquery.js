	/*side nav bar*/
	$(function(){
		var navToggle = $('body').find('.nav-toggle-btn');
		$('.nav-toggle-btn').on('click',function(){
      console.log('i m herer');
			$('body').addClass('active-nav');

		});
		$('.row,.card,nav.side-nav ul li a,div.upper,div.text-block').on('click',function(){
			$('body').removeClass('active-nav');

		});
});

  /*Hover effect*/

  /*Modal*/
      $(function() {
    //----- OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
 
        e.preventDefault();
    });
 
    //----- CLOSE
    $('[data-popup-close],div.popup').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
 
    });
});
    $(document).on("pagecontainerload",function(){
       var targeted_popup_class = $(this).attr('data-popup-open');
          $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
    });


/*Trending for small screen*/
$(document).ready(function(){
  $("trending-btn").on("click",function(e){
    $("div.row-trends").css("display","block");
    $("div.row-main").css("display","none");


    e.preventDefault();
  });
});