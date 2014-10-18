var boneage = {},
	pt = {},
	ref = {range: {}};

$(document).ready(function() {
	// $('#divMalePics').css({'display': 'none'});
	// $('#divFemale').css({'display': 'none'});
	// var Males = $('#divMalePics');
	// var Females = $('#divFemalePics');

	var $scrollBar = $('.scrollbar');
	var $frame = $('#divMale');

	var $wrap = $frame.parent();
	var $slidee = $frame.children('ul').eq(0);
	var strMtoY = function(orig) {
		return orig;
	};


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

	boneage.update = function() {
		boneage.report =
			'<b>FINDINGS:</b><br>' +
			'Sex: ' + pt.sex + '<br>' +
			'Date of Birth: ' + pt.dob + '<br>' +
			'Study Date: ' + pt.studyDate + '<br>' +
			'Chronological Age: ' + strMtoY(pt.age) + '<br>' +
			'<br>' +
			'By the method of Greulich and Pyle, the bone age is estimated to be ' +
				strMtoY(pt.boneAge) + ' (' + pt.boneAge + ' months).<br>' +
			'<br>' +
			'At the chronological age of ' + strMtoY(pt.age) + '( ' + pt.age + ')' +
				', using the Brush Foundation data, the mean bone age for calculation is ' +
				strMtoY(ref.boneAge) + ' (' + ref.boneAge + ' months).<br>' +
			'<br>' +
			'Two standard deviations at this age is ' + ref.stDev +
				' months, giving a normal range of ' + strMtoY(ref.range.low) +
				' to ' + strMtoY(ref.range.high) + ' (+/- 2 standard deviations).' + '<br>' +
			'<br>' +
			'<b>IMPRESSION:</b>' + '<br>' +
			'Sex: ' + pt.sex + '<br>' +
			'Chronological Age: ' + pt.age + '<br>' +
			'Estimated Bone Age: ' + strMtoY(pt.boneAge) + '<br>' +
			'<br>' +
			'The estimated bone age is ';

		$('#taReport').html(boneage.report);		//
	};

	boneage.update();



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
