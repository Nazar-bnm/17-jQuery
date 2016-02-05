$(document).ready(function(){
	var min = $('#user-name').attr('validate-minlength');
	var max = $('#user-name').attr('validate-maxlength');
	var validStr = '^[a-zA-Z.]{' + min + ',' + max + '}$';
	var validName = new RegExp(validStr);
	var validEmail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	var validDate = /^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
	var validIp = new RegExp($('#ip').attr('validate-regexp'));
	// object to check form
	var valObj = {
		'user-name': 'empty',
		'email': 'empty',
		'date': 'empty',
		'ip': 'empty'
	};
	// object reg exp
	var regExpObj = {
		'user-name': validName,
		'email': validEmail,
		'date': validDate,
		'ip': validIp
	};
	// reset error message
	$('input').focus(function(){
			if(this.type !== 'submit'){
				$(this)
					.addClass('not-error')
						.next()
							.text('');
			}
	});
	// check inputs to empty
	$('input').blur(function(){
		var checkRequired = $(this).attr('validate-required');
		if(!checkRequired) return;
		var value = $(this).val();
		if(value === ""){
			valObj[this.id] = 'empty';
			$(this)
				.next()
					.text('field is empty')
					.addClass('error');
		}
	});
	// valid inputs
	$('input').not('#submit').blur(function(){
		var checkRequired = $(this).attr('validate-required');
		if(!checkRequired) return;
		var value = $(this).val();		
		var curRegExp = regExpObj[this.id];
		if(curRegExp.test(value)){
			valObj[this.id] = true;
			$(this).addClass('not-error');
		}else if(value !== ""){
			valObj[this.id] = false;
			$(this)
				.removeClass("not-error")
				.addClass('error');
			$(this)
				.next()
					.text((this.name) + ' is wrong')
					.addClass('error');
		}
	});
	// validate form
	$('#submit').click(function(){
		var check = true;
		// use underscore
		_.each(valObj, function(value, key){
			var checkRequired = $("#" + key).attr('validate-required');
			if(!checkRequired) value = true;
			if(value === 'empty' || !check || !value) check = false;
			if(value === 'empty'){
				$("#" + key)
					.next()
						.text('field is empty')
						.addClass('error');
			}
		});

		if(!check){
			alert('Your data is invalid');
			return false;
		}
	});
});
