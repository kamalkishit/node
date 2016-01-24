	/*side nav bar*/
	$(function(){
		var navToggle = $('body').find('.nav-toggle-btn');
		navToggle.on('click',function(){
			$('body').addClass('active-nav');
			$('.nav-toggle-btn').addClass('nav-toggle-btn-active');
		});
		$('.row,.card').on('click',function(){
			$('body').removeClass('active-nav');
			$('.nav-toggle-btn').removeClass('nav-toggle-btn-active');
		});
	});