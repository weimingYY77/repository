$(function(){
	$(".new_pwd").blur(function(){
		if ($(".new_pwd").val() == '') {
			$(".pwd_error1").show();
		}
	})
	$(".new_pwd").keydown(function(){
		$(".pwd_error2").hide();
		if ($(".new_pwd").val() != '') {
			$(".pwd_error1").hide();
		}
	})
	$(".new_pwd").focus(function(){
		  $(".pwd_error2").hide();  
	})
	$(".new_pwd1").blur(function(){
		if ($(".new_pwd1").val() != $(".new_pwd").val()) {
			$(".pwd_error2").show();
			$(".new_pwd1").val('');
		}
	})
	$(".new_pwd1").focus(function(){
		  $(".pwd_error2").hide();  
	})
	/*密码验证*/
})