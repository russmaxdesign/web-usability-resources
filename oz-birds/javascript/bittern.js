// //remove fallback HTML class
// $('html')
// 	.removeClass('no-js')
// 	.addClass('js');

// //detecting tab key press
// $('body').on('keydown', function(e) {
// 	var keyCode = e.keyCode || e.which;

// 	if(keyCode == 9) {
// 		$('html').addClass('is-keyboarduser');

// 		$('body').off('keydown');
// 	}
// });

// Slideshow
$('.js-slideshow').slick();