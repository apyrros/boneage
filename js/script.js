/*global document, $, Sly */
/*jshint globalstrict: true*/
"use strict";

var undef = '***',
	boneage = {},
	pt = {sex: undef},
	ref = {
		male: {
			ages: [0,3,6,9,12,15,18,24,32,36,42,48,54,60,72,84,96,108,120,132,138,150,156,162,168,180,186,192,204,216,228],
			BFages: [3,6,9,12,18,24,30,36,42,48,54,60,72,84,96,108,120,132,144,156,168,180,192,204],
			BFstdevs: [0.69,1.13,1.43,1.97,3.52,3.92,4.52,5.08,5.4,6.66,8.36,8.79,9.17,8.91,9.1,9,9.79,10.09,10.38,10.44,10.72,11.32,12.86,13.05]
		},
		female: {
			ages: [0,3,6,9,12,15,18,24,30,36,42,50,60,69,82,94,106,120,132,144,156,162,168,180,192,204,216],
			BFages: [3,6,9,12,18,24,30,36,42,48,54,60,72,84,96,108,120,132,144,156,168,180,192],
			BFstdevs: [0.72,1.16,1.36,1.77,3.49,4.64,5.37,5.97,7.48,8.98,10.73,11.65,10.23,9.64,10.23,10.74,11.73,11.94,10.24,10.67,11.3,9.23,7.31]
		},
		range: {}
	},
	SlyCarousel = {};

$(document).ready(function() {

	boneage.update = function() {
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
			'Two standard deviations at this age is ' + ref.stdev +
				' months, giving a normal range of ' + strMtoY(ref.range.low) +
				' to ' + strMtoY(ref.range.high) + ' (+/- 2 standard deviations).' + '<br>' +
			'<br>' +
			'<b>IMPRESSION:</b>' + '<br>' +
			'Sex: ' + pt.sex + '<br>' +
			'Chronological Age: ' + strMtoY(pt.age) + '<br>' +
			'Estimated Bone Age: ' + strMtoY(pt.boneAge) + '<br>' +
			'<br>' +
			'The estimated bone age is ' + ref.concl + '.';

		$('#taReport').html(boneage.report);
	};

	pt.getDOB = function() {
		pt.DOBparsed = undef;
		pt.DOB = $('#inputDOB').val();
		if (pt.DOB === '') pt.DOB = undef;
		pt.reDOB = /([0-9]+)[/-]([0-9]+)[/-]([0-9]+)/g;
		pt.DOBparsed = pt.reDOB.exec(pt.DOB);
		if (pt.DOB !== undef && !$('#inputDOB').is(":focus")) {
			if (/[^0-9\/-]/.exec(pt.DOB) || pt.DOBparsed[1] < 1 || pt.DOBparsed[1] > 12 || pt.DOBparsed[2] < 1 || pt.DOBparsed[2] > 31 || ( pt.DOBparsed[3] > 99 && pt.DOBparsed[3] < 1900 )) {
				$('#inputDOB').tooltip('show');
			} else {
				$('#inputDOB').tooltip('hide');
			}
		}
	};

	pt.getAge = function() {
		if (pt.DOBparsed) {
			pt.birthMonth = +pt.DOBparsed[1];
			pt.birthDay = +pt.DOBparsed[2];
			pt.birthYear = +pt.DOBparsed[3];
			if (pt.birthYear < 100) pt.birthYear += 1900;
			if (pt.birthYear < 1930) pt.birthYear += 100;
			pt.age = (ref.month + (12 * ref.year)) - (pt.birthMonth + (12 * pt.birthYear));
			if (ref.day - pt.birthDay > 14) {
				pt.age += 1;
			}
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
		var i, len;
		if ( pt.age !== undef && (pt.sex === 'male' || pt.sex === 'female') ) {
			for (i = 0, len = ref[pt.sex].BFages.length; i < len; i++) {
				if (ref.age === undef || Math.abs(ref[pt.sex].BFages[i] - pt.age) < Math.abs(ref.age - pt.age)) {
					ref.age = ref[pt.sex].BFages[i];
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

		if (ref.day < 10) ref.day = '0' + ref.day;
		if (ref.month < 10) ref.month = '0' + ref.month;

		ref.today = ref.month + '/' + ref.day + '/' + ref.year;
	};

	ref.getStDev = function() {
		if ( isNaN(pt.boneAge) || isNaN(ref.age) ) {
			ref.concl = undef;
			ref.stdev = undef;
			ref.range = {};
			return;
		}

		ref.stdev = ref[pt.sex].BFstdevs[ ref[pt.sex].BFages.indexOf(ref.age) ];
		ref.range.low = (ref.age - (2 * ref.stdev)).toFixed(2);
		ref.range.high = (ref.age + (2 * ref.stdev)).toFixed(2);

		if (pt.boneAge < ref.range.low) {
			ref.concl = '<span class="text-primary"><strong>delayed</strong></span> (' + ( (ref.age - pt.boneAge) / ref.stdev ).toFixed(1) +
				' standard deviations below the mean)';
		} else if (pt.boneAge > ref.range.high) {
			ref.concl = '<span class="text-primary"><strong>advanced</strong></span> (' + ( (pt.boneAge - ref.age) / ref.stdev ).toFixed(1) +
				' standard deviations above the mean)';
		} else {
			ref.concl = 'normal';
		}
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

		boneage.unSelectAll();
		boneage.update();
	};

	boneage.selectAll = function() {
		document.getElementById('taReport').focus();
		document.execCommand('SelectAll');
	};

	boneage.unSelectAll = function() {
		document.getElementById('taReport').focus();
		document.execCommand('unselect');
	};

	// convert age from months to years, months
	function strMtoY(ageMonths) {
		if ( ageMonths === undef || isNaN(ageMonths) ) {
			return undef;
		}
		if (ageMonths < 24) {
			return ageMonths + ' months';
		} else {
			return Math.floor(ageMonths / 12) + ' years, ' + Math.round(ageMonths % 12) + ' months';
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
		boneage.unSelectAll();
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
		boneage.unSelectAll();
	});

	$('#labelDOB').click(function() {
		$('#inputDOB').select();
	});

	$('#inputDOB').on('input', function() {
		boneage.update();
		// display error tooltip if invalid DOB
		if (pt.DOB !== undef && pt.DOB !== null) {
			if (
				pt.DOBparsed &&
				!/[^0-9\/-]/.exec(pt.DOB) &&
				(pt.DOBparsed[1] > 0 && pt.DOBparsed[1] < 13) &&
				(pt.DOBparsed[2] > 0 && pt.DOBparsed[2] < 32) &&
				(pt.DOBparsed[3] < 99 || pt.DOBparsed[3] > 1900)
			) {
				$('#inputDOB').tooltip('hide');
			}
		} else if (pt.DOB === undef) {
			$('#inputDOB').tooltip('hide');
		}
	});

	$('#inputDOB').blur(function() {
		pt.getDOB();
	});

	$('#inputDOB').tooltip({
		trigger: 'manual',
		html: true
	});

	$('#labelReport').click(function() {
		boneage.selectAll();
	});

	$('#btnSelectAll').click(function() {
		boneage.selectAll();
	});

	$('#btnReset').click(function() {
		boneage.reset();
	});

	$('#references').popover({
		html: true
	});

	// prevent images from being dragged (vertically), e.g. into taReport
	// chrome/IE obey css rules, firefox does not
	// if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	$('img').on( 'dragstart', function() {
		return false;
	});
	// }

	(function popoverInit() {
		var imgNumber, imgHTML;
		for (i = 0, len = ref.male.ages.length; i < len; i++) {
			imgNumber = ref.male.ages[i];
			while (String(imgNumber).length < 3) {
				imgNumber = '0' + imgNumber;
			}
			imgHTML = '<img src="img/male_' + imgNumber + '.jpg" style="transform: scale(1.3)" />';
			$('#m_' + imgNumber).popover({content: imgHTML, placement: 'top', html: true, container: 'div#right', trigger: 'focus'});
		}

		for (i = 0, len = ref.female.ages.length; i < len; i++) {
			imgNumber = ref.female.ages[i];
			while (String(imgNumber).length < 3) {
				imgNumber = '0' + imgNumber;
			}
			imgHTML = '<img src="img/female_' + imgNumber + '.jpg" style="transform: scale(1.3)" />';
			$('#f_' + imgNumber).popover({content: imgHTML, placement: 'top', html: true, container: 'div#right', trigger: 'focus'});
		}
	}());

	boneage.update();

});
