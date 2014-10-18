var boneage = {};

$(document).ready(function() {
	// $('#divMalePics').css({'display': 'none'});
	// $('#divFemale').css({'display': 'none'});
	// var Males = $('#divMalePics');
	// var Females = $('#divFemalePics');

	var $scrollBar = $('.scrollbar');
	var $frame = $('#divMale');

	var $wrap = $frame.parent();
	var $slidee = $frame.children('ul').eq(0);

	$frame.sly({
		itemNav: 'basic',
		smart: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 0,
		scrollBar: $wrap.find('.scrollbar'),
		scrollBy: 1,
		pagesBar: $wrap.find('.pages'),
		activatePageOn: 'click',
		speed: 300,
		elasticBounds: 1,
		easing: 'easeOutExpo',
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,

		// Buttons
		forward: $wrap.find('.forward'),
		backward: $wrap.find('.backward'),
		prev: $wrap.find('.prev'),
		next: $wrap.find('.next'),
		prevPage: $wrap.find('.prevPage'),
		nextPage: $wrap.find('.nextPage')
	});
	// var sly = new Sly($frame, {
	// 	horizontal: 1,
	// 	itemNav: 'centered',
	// 	smart: 1,
	// 	activateOn: 'click',
	// 	mouseDragging: 1,
	// 	touchDragging: 1,
	// 	releaseSwing: 1,
	// 	startAt: 0,
	// 	scrollBar: $scrollBar,
	// 	scrollBy: 1,
	// 	speed: 300,
	// 	elasticBounds: 1,
	// 	easing: 'easeOutExpo',
	// 	dragHandle: 1,
	// 	dynamicHandle: 1,
	// 	clickBar: 1
	// }).init();



	// -------------------------------------------------------------
	//   Centered Navigation
	// -------------------------------------------------------------
	// (function () {
	// 	var $frame = $('#centered');
	// 	var $wrap  = $frame.parent();

	// 	// Call Sly on frame
	// 	$frame.sly({
	// 		horizontal: 1,
	// 		itemNav: 'centered',
	// 		smart: 1,
	// 		activateOn: 'click',
	// 		mouseDragging: 1,
	// 		touchDragging: 1,
	// 		releaseSwing: 1,
	// 		startAt: 4,
	// 		scrollBar: $wrap.find('.scrollbar'),
	// 		scrollBy: 1,
	// 		speed: 300,
	// 		elasticBounds: 1,
	// 		easing: 'easeOutExpo',
	// 		dragHandle: 1,
	// 		dynamicHandle: 1,
	// 		clickBar: 1,

	// 		// Buttons
	// 		prev: $wrap.find('.prev'),
	// 		next: $wrap.find('.next')
	// 	});
	// }());

	boneage.update = function() {
		//
	};

	boneage.reset = function() {
		$('#spanGirl').css({
			'font-weight': 300,
			'color': 'white',
			'text-shadow': '0 0 0'
		});

		$('#spanBoy').css({
			'font-weight': 300,
			'color': 'white',
			'text-shadow': '0 0 0'
		});

		$('#inputDOB').val('');

		$('#taReport').html('');
		boneage.update();
	};

	boneage.selectAll = function() {
		document.getElementById('taReport').focus();
		document.execCommand('SelectAll');
	};

	$('#btnBoy').click(function() {
		$('#spanBoy').css({
			'font-weight': 'bold',
			'color': 'white',
			'text-shadow': '0 0 0'
		});

		$('#spanGirl').css({
			'font-weight': 'normal',
			'color': 'transparent',
			'text-shadow': '0 0 2px rgba(200, 200, 200, 1)'
		});

	});

	$('#btnGirl').click(function() {
		$('#spanGirl').css({
			'font-weight': 'bold',
			'color': 'white',
			'text-shadow': '0 0 0'
		});

		$('#spanBoy').css({
			'font-weight': 'normal',
			'color': 'transparent',
			'text-shadow': '0 0 2px rgba(200, 200, 200, 1)'
		});

	});

	$('#labelReport').click(function() {
		boneage.selectAll();
	});

	$('#labelDOB').click(function() {
		$('#inputDOB').select();
	});

	$('#btnSelectAll').click(function() {
		boneage.selectAll();
	});

	$('#btnReset').click(function() {
		boneage.reset();
	});

	$('#labelSex').click(function() {

	});

});
