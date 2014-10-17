$(document).ready(function() {












	$('#btnBoy').click(function() {
		$('#spanBoy').css({
			'font-weight': 'bold',
			'color': 'white',
			'text-shadow': '0 0 0 rgba(255, 255, 255, 1)'
		});

		$('#spanGirl').css({
			'font-weight': 'normal',
			'color': 'transparent',
			'text-shadow': '0 0 2px rgba(255, 255, 255, 1)'
		});
	});

	$('#btnGirl').click(function() {
		$('#spanGirl').css({
			'font-weight': 'bold',
			'color': 'white',
			'text-shadow': '0 0 0 rgba(255, 255, 255, 1)'
		});

		$('#spanBoy').css({
			'font-weight': 'normal',
			'color': 'transparent',
			'text-shadow': '0 0 2px rgba(255, 255, 255, 1)'
		});
	});


});
