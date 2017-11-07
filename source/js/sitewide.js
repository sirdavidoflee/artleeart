// Basic JS function based setup, will most likely be changed later
//	on with something like React, but for now put all page-specific
//	functions into there respective functions below (people_page, gifs_page, etc.)

// Everything is housed within the SITE object.
// Call all functions inside by referring back to SITE
//	example: to call gifs_page call SITE.gifs_page();
//	You *could* technically call this.gifs_page(); but lets
//	just use SITE for now since these will all be refactored
//	later into new functions.

var SITE = {
	
/* Globals Variables
=============================================*/	
	//cat: 'cat',


/* Methods
=============================================*/	
	init: function(){
		var page = $('body').prop('class');
		$('nav li.link-' + page).addClass('active');
		
		$('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true
		});
		
		// Modal with transition
		$('.grid-item').click(function(event) {
			// Check if not already open
			if (!$(this).hasClass('item-opened')) {
				// Values
				var elWidth = $(this).outerWidth() / 2;
				var elPosition = this.getBoundingClientRect();

				// Store position
				$(this).attr('data-coord-left', $(this).css('left'));
				$(this).attr('data-coord-top', $(this).css('top'));

				// Transition effect
					$(this).css({
						top:	elPosition.top,
						left:	elPosition.left
					}).delay(400).css({
						top: 			'120px',
						left:			'10%',
						zIndex:		'99999',
						// marginLeft:	'-20%'
						// position: 'fixed'
					}).addClass('item-opened');

				$('.grid-alpha').fadeIn();

				// Scroll to the top
				$('html, body').animate({
					scrollTop: $('.grid').offset().top
				}, 650);
				$('.grid').css('overflow', 'visible');
			} else{
				$('.grid').css('overflow', 'hidden');
			}
		});
		
		// Close item Modal
		$(document).on('click', function(e) {
			if ($('.item-opened').length > 0) {
				if (!$(e.target).closest('.grid-item').length && !$(e.target).hasClass('item-opened')) {
					$('.grid-alpha').fadeOut(650);

					$('.item-opened').css({
						top: 			$('.item-opened').data('coord-top'),
						left:			$('.item-opened').data('coord-left'),
						marginLeft:	''
					});

					$('html, body').animate({
						scrollTop: ($('.grid').offset().top + parseFloat($('.item-opened').data('coord-top'))) - 30
					}, 650);

					setTimeout(function() {
						$('.grid-item').css('z-index', '').removeClass('item-opened');
					}, 350);
					$('.grid').css('overflow', 'hidden');
				}
			}
		});
	},
	
	functions: {
		track_links: function(category, action, label) { //generic google analytics function for event tracking
			ga('send', 'event', category, action, label);
		},
		
		scroll_to: function(scroll_place) { //scrolls to an ID, scroll_place should be passed as the name of the ID you want to scroll to
			var target = $('#' + scroll_place);
			$('html, body').animate({
				scrollTop: target.offset().top - 150
			}, 1000);
		},
		
		get_params: function(param) { // generic function for reading URL parameters
			var query = window.location.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				if (decodeURIComponent(pair[0]) == param) {
					return decodeURIComponent(pair[1]);
				}
			}
		}
	}
	
};


//Document.ready function below, when ready call the init() function
$(window).on('load', function() { //on load waits for all images to load, you can switch to .ready instead if you want
	SITE.init();
});