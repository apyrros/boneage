var undef = '***',
	boneage = {},
	pt = {sex: undef},
	ref = {
		male: {
			ages: [0,3,6,9,12,15,18,24,32,36,42,48,54,60,72,84,96,108,120,132,138,150,156,162,168,180,186,192,204,216,228]
		},
		female: {
			ages: [0,3,6,9,12,15,18,24,30,36,42,50,60,69,82,94,106,120,132,144,156,162,168,180,192,204,216]
		},
		range: {}
	},
	SlyCarousel = {};

$(document).ready(function() {

	pt.getDOB = function() {
		pt.DOBparsed = undef;
		pt.DOB = $('#inputDOB').val();
		if (pt.DOB === '') {
			pt.DOB = undef;
		}
		pt.reDOB = /([0-9]+)[/-]([0-9]+)[/-]([0-9]+)/g;
		pt.DOBparsed = pt.reDOB.exec(pt.DOB);
	};

	pt.getAge = function() {
		if (pt.DOBparsed) {
			pt.ageMonth = +pt.DOBparsed[1];
			pt.ageYear = +pt.DOBparsed[3];
			if (pt.ageYear < 100) pt.ageYear += 1900;
			if (pt.ageYear < 1930) pt.ageYear += 100;
			pt.age = (ref.month + (12 * ref.year)) - (pt.ageMonth + (12 * pt.ageYear));
		} else {
			pt.age = undef;
		}
	};

	pt.getBoneAge = function() {
		if (pt.sex === 'male' || pt.sex === 'female') {
			pt.boneAge = ref[pt.sex].ages[SlyCarousel.rel.centerItem];
		} else {
			pt.boneAge = undef;
		}
	};

	// get ref.age (for calculation)
	ref.getAge = function() {
		if (pt.sex === 'male' || pt.sex === 'female') {
			for (i = 0, len = ref[pt.sex].ages.length; i < len; i++) {
				if (ref.age === undef || Math.abs(ref[pt.sex].ages[i] - pt.age) < Math.abs(ref.age - pt.age)) {
					ref.age = ref[pt.sex].ages[i];
				}
			}
		} else {
			ref.age = undef;
		}
	};

	ref.getToday = function() {
		var Today = new Date();
		ref.month = Today.getMonth() + 1;
		ref.day = Today.getDate();
		ref.year = Today.getFullYear();

		if (ref.day < 10) {
			ref.day = '0' + ref.day;
		}

		if(ref.month < 10) {
			ref.month = '0' + ref.month;
		}

		ref.today = ref.month + '/' + ref.day + '/' + ref.year;
	};

	ref.getStDev = function() {
		if ( isNaN(pt.boneAge) || isNaN(ref.age) ) {
			ref.concl = undef;
			ref.stDevText = undef;
		} else {

		}
	};

	boneage.update = function() {
		var i, len;
		pt.getDOB();
		ref.getToday();
		pt.getAge();
		ref.getAge();
		pt.getBoneAge();
		ref.getStDev();

		boneage.report =
			'<b>FINDINGS:</b><br>' +
			'Study Date: ' + ref.today + '<br>' +
			'Sex: ' + pt.sex + '<br>' +
			'Date of Birth: ' + pt.DOB + '<br>' +
			'Chronological Age: ' + strMtoY(pt.age) + '<br>' +
			'<br>' +
			'By the method of Greulich and Pyle, the bone age is estimated to be ' +
				strMtoY(pt.boneAge) + '.<br>' +
			'<br>' +
			'At the chronological age of ' + strMtoY(pt.age) +
				', using the Brush Foundation data, the mean bone age for calculation is ' +
				strMtoY(ref.age) + '.<br>' +
			'<br>' +
			'Two standard deviations at this age is ' + ref.stDev +
				' months, giving a normal range of ' + strMtoY(ref.range.low) +
				' to ' + strMtoY(ref.range.high) + ' (+/- 2 standard deviations).' + '<br>' +
			'<br>' +
			'<b>IMPRESSION:</b>' + '<br>' +
			'Sex: ' + pt.sex + '<br>' +
			'Chronological Age: ' + strMtoY(pt.age) + '<br>' +
			'Estimated Bone Age: ' + strMtoY(pt.boneAge) + '<br>' +
			'<br>' +
			'The estimated bone age is ' + ref.concl + ' (' +
				ref.stDevText+').';

		$('#taReport').html(boneage.report);		//
	};

	boneage.reset = function() {
		// reset LEFT side
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

		pt.sex = undef;

		$('#inputDOB').val('');
		$('#taReport').html('');

		// reset RIGHT side
		$('#h2Instructions').css({'display': 'block'});
		$('#divBoy').css({'display': 'none'});
		$('#divGirl').css({'display': 'none'});

		boneage.update();
	};

	boneage.selectAll = function() {
		document.getElementById('taReport').focus();
		document.execCommand('SelectAll');
	};

	function strMtoY(ageMonths) {
		if ( ageMonths === undef || isNaN(ageMonths) ) {
			return undef;
		}
		if (ageMonths < 24) {
			return ageMonths + ' months';
		} else {
			return Math.floor(ageMonths/12) + ' years, ' + (ageMonths % 12) + ' months';
		}
	}

	function slyInit(div) {
		var $frame = $(div),
			$wrap = $frame.parent();

		SlyCarousel = new Sly($frame, {
			horizontal: 1,
			itemNav: 'forceCentered',
			smart: 1,
			activateOn: 'click',
			activateMiddle: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1
		}).init();

		// SlyCarousel.on('load', function() {
		// 	boneage.update();
		// });

		SlyCarousel.on('move', function() {
			boneage.update();
		});
	}



	$('#btnBoy').click(function() {
		$('#h2Instructions').css({'display': 'none'});
		$('#divBoy').css({'display': 'block'});
		$('#divGirl').css({'display': 'none'});

		slyInit('#divBoy');

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

		pt.sex = 'male';

		boneage.update();
	});

	$('#btnGirl').click(function() {
		$('#h2Instructions').css({'display': 'none'});
		$('#divBoy').css({'display': 'none'});
		$('#divGirl').css({'display': 'block'});

		slyInit('#divGirl');

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

		pt.sex = 'female';

		boneage.update();
	});

	$('#inputDOB').on('input', function() {
		boneage.update();
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


	boneage.update();

});
