function isTouchDevice() {
	return 'ontouchstart' in document.documentElement;
}

function detectIosDevice() {
	if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
		$('body').addClass('ios_device');       
	};	 
}

function closeAllMenues(evt) {
	detectIosDevice();
	$('.search_form').removeClass('opened');
}

function mobMenuTrigger(e){
	e.preventDefault();
	if(!$(this).hasClass('active')) {
		$(this).addClass('active');
	}
	if ($('body').hasClass('menu_opened')) {
		$('body').removeClass('menu_opened');
	} else {
		$('.menu_inner').animate({scrollTop: 0},0);
		$('body').addClass('menu_opened');
	}
}

function detectContentHeight() {
	var freeSpace = window.innerHeight - $('.header').height() - $('.footer').height();
	if (freeSpace > 0) {
		$('.content').css('min-height',freeSpace);
	} else {
		$('.content').css('min-height',0);
	};
	$('.footer').css('opacity',1);
}

var passwordConfirm;
function checkFields() {
	$('form input, form textarea').change(function() {
		if ($(this).val().length > 0) {
			$(this).addClass('filled');
			$(this).parent().find('.individual_hint').show();
			$(this).parent().find('.standard_hint').hide();
		} else {
			$(this).removeClass('filled');
			$(this).parent().find('.individual_hint').hide();
			$(this).parent().find('.standard_hint').show();
		}

		if($('input[name="pass_confirm"]').length > 0) {
			$('input[name="pass_confirm"]').on('keyup change',function(){
				if($(this).val() == $('input[name="password"]').val()) {
					$(this).parent().removeClass('has-error');
					passwordConfirm = true;
				}
			})
		}
  });
}

function checkPassConfirm() {
	var passValue = $('.password_field').val();
	var passConfirm = $('.confirm_field').val();
	if(passValue && passValue != passConfirm && $('.pass_fields').css('display') != "none") {
		$('.confirm_field').parent().addClass('has-error');
		passwordConfirm = null;
	} else {
		passwordConfirm = true;
	}
}

function checkForm() {
	checkPassConfirm();
	$.validate({
		scrollToTopOnError: false,
		onSuccess: function() {
			if(!passwordConfirm) {
				return false;
			}
		}
	});
}

function comboHover() {
	$(this).parents('.combo_hover').addClass('hovered');
}
function comboUnHover() {
	$(this).parents('.combo_hover').removeClass('hovered');
}
function detectCallPosibillity() {
	if (/Android|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	  $('.phone_link').addClass('clickable');
	}
	$('.phone_link').click(function(e){
	  if(!$(this).hasClass('clickable')) {
		e.preventDefault();
	  }
	})
}

function activateHomeScreen() {
	$('.main_top').addClass('hovered');
	$('.category_block.active').removeClass('active');
	$(this).addClass('active');
}

function activateHomeTouch(e) {
	e.preventDefault();
	var pageURL = $(this).attr('href');
	setTimeout(function(){
		window.location.assign(pageURL);
	},1500);
	
}
//Customer Service Tab Functions

function scrollTop(){
	if($('.has-error')){
		window.scrollTo(0,0)
	}else{
		return false;
	}
}

function reactivateHomeScreen() {
	$('.main_top').removeClass('hovered');
	$(this).removeClass('active');
}

//faq page
function accordionFaq(e, $this, $parent, $block, $list, $class) {
    e.preventDefault();
    if ($this.parents($parent).hasClass($class)) {
        $this.parents($parent).removeClass($class).find($block).slideUp(300);
    } else {
        $this.parents($list).children().removeClass($class);
        $this.parents($list).find($block).slideUp(300);
        $this.parents($parent).addClass($class).find($block).stop(true, true).slideDown(300);
    }
}

$(document).ready(function(){
	detectIosDevice();
	detectCallPosibillity();

	
	if(isTouchDevice()) {
		$('html').addClass('touch');
	} else {
		$('html').addClass('web');
	}

	$('body').click(closeAllMenues);

	$('.menu_button').click(mobMenuTrigger);


	// form front validation
	if($('.validate_button').length > 0) {
		checkFields();
		$('.validate_button').click(checkForm);
	}

	//hover effect with multiple links hover
	$('.combo_link').hover(comboHover,comboUnHover);


	if ($('.sorting_select').length > 0) {
        $('.sorting_select').selectpicker();
	}

	//$('.validate_button').click(scrollTop);

	$('.category_block').hover(activateHomeScreen,reactivateHomeScreen);
	if(isTouchDevice()) {
		$('.category_block').click(activateHomeTouch);
	}


	if($('.animation_block').length > 0) {
		$(window).scroll(function(){
			$('.animation_block').each(function(){
				if($(this).offset().top + $(this).height()/2 < $(document).scrollTop() + window.innerHeight) {
					$(this).addClass('showed');
				} else if($(this).offset().top > $(document).scrollTop() + window.innerHeight) {
					$(this).removeClass('showed');
				}
			})
		}).trigger('scroll');
	}

    //faq drop
    $('.faq_list .drop_btn').click(function (e) {
        accordionFaq(e, $(this), 'li', '.drop_block', '.faq_list', 'opened');
    })
});

$(window).on('load',function(){
	$(window).resize(function(){
		//detect content min height and show footer 
		detectContentHeight();

		// if($('.main_top').length > 0) {
		// 	detectMainScreenHeight()
		// }

        $('.loader').fadeOut(300);
        setTimeout(function () {
            $('.loader').remove();
        }, 1000)

	}).trigger('resize');

});