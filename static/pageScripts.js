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
}, false);

$('.color').noUiSlider({
    start: [2900],
    connect: 'lower',
    range: {'min': 1100, 'max': 4200}
});

$('.brightness').noUiSlider({
	start: [0.7],
	connect: 'lower',
	range: {'min': 0.0, 'max': 1.0}
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
