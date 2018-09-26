color_min = 1100;
color_max = 5500;
color_default = 2900;

brightness_min = 0.0;
brightness_max = 1.0;
brightness_default = 0.7;

function planck(l, t) {
	var hc = 1.98644568 * Math.pow(10, -25);
	var kb = 1.38064852 * Math.pow(10, -23);
	return 1. / (l**5.0 * (Math.exp(hc / (l * kb * t)) - 1.0));
}

function plancksLaw(t) {
	var lambda_red = 630. * Math.pow(10, -9);
	var lambda_green = 530. * Math.pow(10, -9);
	var lambda_blue = 475. * Math.pow(10, -9);
	var red = planck(lambda_red, t);
	var green = planck(lambda_green, t);
	var blue = planck(lambda_blue, t);
	var max = Math.max(red, green, blue);
	return [red / max, green / max, blue / max];
}

function logarithmic_intensity(x) {
	return 255 * (Math.pow(2, (5. * x)) - 1) / (Math.pow(2, 5.) - 1);
}

function set_colors() {
	var rgb = plancksLaw(parseFloat($('.color').val()));
// CONTINUE WORKING FROM HERE
	var red =   ('0' + Number(Math.floor(rgb[0] * logarithmic_intensity(parseFloat($('.brightness').val())))).toString(16)).slice(-2);
	var green = ('0' + Number(Math.floor(rgb[1] * logarithmic_intensity(parseFloat($('.brightness').val())))).toString(16)).slice(-2);
	var blue =  ('0' + Number(Math.floor(rgb[2] * logarithmic_intensity(parseFloat($('.brightness').val())))).toString(16)).slice(-2);
	var color = '#' + red + green + blue;
	$('.style1').css('fill', color);
	var red_start   = ('0' + Number(Math.floor(255. / 255. * logarithmic_intensity(parseFloat($('.brightness').val())))).toString(16)).slice(-2);
	var green_start = ('0' + Number(Math.floor(1.   / 255. * logarithmic_intensity(parseFloat($('.brightness').val())))).toString(16)).slice(-2);
	var blue_start  = ('0' + Number(Math.floor(0.   / 255. * logarithmic_intensity(parseFloat($('.brightness').val())))).toString(16)).slice(-2);
	var color_start = '#' + red_start + green_start + blue_start;
	var brightness_slider_position = Number(Math.floor(100. * (parseFloat($('.brightness').val()) - brightness_min) / (brightness_max - brightness_min))).toString();
	var color_slider_position = Number(Math.floor(100. * (parseFloat($('.color').val()) - color_min) / (color_max - color_min))).toString();
	$('.brightness').css('background-image', 'linear-gradient(to right, #000000, ' + color + ' ' + brightness_slider_position + '%)');
	$('.brightness .noUi-handle').css('background', color);
	$('.color').css('background-image', 'linear-gradient(to right, ' + color_start + ', ' + color + ' ' + color_slider_position + '%)');
	$('.color .noUi-handle').css('background', color);
	return color;
}

document.getElementById("power").addEventListener("click", function() {
    var xhr1 = new XMLHttpRequest();
	var xhr2 = new XMLHttpRequest();
	var oldOpacity = Math.round($('.variableOpacity').css('opacity') * 10) / 10;
	if (oldOpacity == 0.3) {
		xhr1.open("POST", "http://northwall-bedroom:5000/lights_on", true);
		xhr2.open("POST", "http://southwall-bedroom:5000/lights_on", true);
		xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr1.send("color_temp="+parseInt($('.color').val())+"&brightness="+parseFloat($('.brightness').val()));
        xhr2.send("color_temp="+parseInt($('.color').val())+"&brightness="+parseFloat($('.brightness').val()));
    }
    else if (oldOpacity == 0.8) {
        xhr1.open("POST", "http://northwall-bedroom:5000/lights_off", true);
        xhr2.open("POST", "http://southwall-bedroom:5000/lights_off", true);
        xhr1.send();
        xhr2.send();
    }
    var oldOpacity = Math.round($('.variableOpacity').css('opacity') * 10) / 10;
    if (oldOpacity == 0.3) {
        $('.variableOpacity').css('opacity', 0.8);
    }
    else if (oldOpacity == 0.8) {
        $('.variableOpacity').css('opacity', 0.3);
    }
	set_colors();
}, false);

$('.color').noUiSlider({
    start: [color_default],
    connect: 'lower',
    range: {'min': color_min, 'max': color_max}
});

$('.brightness').noUiSlider({
	start: [brightness_default],
	connect: 'lower',
	range: {'min': brightness_min, 'max': brightness_max}
});

/*$(function() {
    $.get("latestPWM", function( data ) {
		try {
			var x = parseInt(data.result);
            var currentDimmer = 255.0 * Math.log(Math.exp(1) / 255.0 * x + 1.0)
            $('.slider').val(currentDimmer, { animate: true });
        }
        catch(err) {
        }
    });
});
*/
$('.slider').change(function() {
	var xhr1 = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();
    xhr1.open("POST", "http://northwall-bedroom:5000/lights_on", true);
    xhr2.open("POST", "http://southwall-bedroom:5000/lights_on", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.send("color_temp="+parseInt($('.color').val())+"&brightness="+parseFloat($('.brightness').val()));
    xhr2.send("color_temp="+parseInt($('.color').val())+"&brightness="+parseFloat($('.brightness').val()));
    var oldOpacity = Math.round($('.variableOpacity').css('opacity') * 10) / 10;
    if (oldOpacity == 0.3) {
        $('.variableOpacity').css('opacity', 0.8);
    }
	set_colors();
});

/*$.get("status", function( data ) {
    if ( data.result == 0) {
        $('.variableOpacity').css('opacity', 0.3);
    }
    else {
        $('.variableOpacity').css('opacity', 0.8);
    }
});

*/

set_colors();
