$(document).ready(function(){
	var myDate = $('#wrapper-timer').data('countdown-start');
	var arrTime = myDate.split(':');
	var totalMs;
	
	function countMs(arr){
		var dayMs;
		var hourMs;
		var minMs;
		var secMs;
		var ms;
		if(arr.length === 4){
			arr.push(0);
		}else if(arr.length === 3){
			arr.push(0);
			arr.unshift(0);
		}else if(arr.length === 2){
			arr.push(0);
			arr.unshift(0);
			arr.unshift(0);
		}else if(arr.length === 1){
			arr.push(0);
			arr.unshift(0);
			arr.unshift(0);
			arr.unshift(0);
		}
		dayMs = arr[0] * 24 * 60 * 60 * 1000;
		hourMs = arr[1] * 60 * 60 * 1000;
		minMs = arr[2] * 60 * 1000;
		secMs = arr[3] * 1000;
		ms = arr[4] * 10;
		totalMs = dayMs + hourMs + minMs + secMs + ms;
	}
	countMs(arrTime);

	var finalDate = Date.now() + totalMs;

	function setTime(){
		var timer = finalDate - Date.now();
		var day;
		var hour;
		var min;
		var sec;
		var ms = String(timer).slice(-3,-1);
		if(timer > 0) {
			day = parseInt(timer/(60*60*1000*24));
			if(day < 10){
				day = '0' + day;
			}
			hour = parseInt(timer/(60*60*1000))%24;
			if(hour < 10){
				hour = '0' + hour;
			}
			min = parseInt(timer/(1000*60))%60;
			if(min < 10){
				min = '0' + min;
			}
			sec = parseInt(timer/1000)%60;
			if(sec < 10){
				sec = '0' + sec;
			}
		}else{
			$('#wrapper-timer').text('The End :)');
			return false;
		}
		$('#day').text(day);
		$('#hour').text(hour);
		$('#min').text(min);
		$('#sec').text(sec);
		$('#ms').text(ms);
		_.delay(setTime, 10);
	}
	setTime();
});