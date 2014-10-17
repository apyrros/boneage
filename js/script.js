var boneage = {};

$(document).ready(function() {
	$('#divMalePics').css({'display': 'none'});
	$(".owl-carousel").owlCarousel();






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
