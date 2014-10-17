var boneage = {};

$(document).ready(function() {
	$('#divMalePics').css({'display': 'none'});
	$('#divFemalePics').css({'display': 'none'});
	var Males = $('#divMalePics');
	var Females = $('#divFemalePics');

	Males.owlCarousel({
		nav: true,
		animateIn: false,
		// margin: '10px',
		autoWidth: true,
		items: 1
	});
	Females.owlCarousel({
		nav: true,
		animateIn: false,
		center: true,
		// margin: '10px',
		items: 2
	});

	var owl = $('.owl-carousel');
	owl.on('mousewheel', '.owl-stage', function (e) {
		if (e.deltaY>0) {
			owl.trigger('next.owl');
		} else {
			owl.trigger('prev.owl');
		}
		e.preventDefault();
	});


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

		$('#divMalePics').css({'display': 'block'});
		$('#divFemalePics').css({'display': 'none'});
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

		$('#divFemalePics').css({'display': 'none'});
		$('#divMalePics').css({'display': 'block'});
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
