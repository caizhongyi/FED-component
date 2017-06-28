$(".drag").dragdrop({
	container: $('body'),
	didDrop: function($src, $dst) {
		$(window).resize(function() {
			$src.stop().animate({
				top: $dst.offset().top,
				left: $dst.offset().left
			});
		}).resize();
	}
});



$('#onoff').click(function() {
	if (this.value === 'Disable') {
		$('.drag').dragdrop('off');
		this.value = 'Enable';
	} else {
		$('.drag').dragdrop('on');
		this.value = 'Disable';
	}
});


// adding extra methods
$.dragdrop.addMethod.option = function(settings, key, val) {
	if (val) {
		settings[key] = val;
	} else if (key) {
		return settings[key];
	}
};
$('#axis').change(function() {
	var option = $(this).find('option:selected').text();
	$('.drag').dragdrop('option', 'axis', option)
});
//$('div').grid('option', 'foo', 'baz');