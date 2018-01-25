$(function(){
	$(".pwd1").blur(function(){
		if ($(".pwd1").val() == '') {
			$(".pwd_error1").show();
		}
	})
	$(".pwd1").keydown(function(){
		$(".pwd_error2").hide();
		if ($(".pwd1").val() != '') {
			$(".pwd_error1").hide();
		}
	})
	$(".pwd1").focus(function(){
		  $(".pwd_error2").hide();  
	})
	$(".pwd2").blur(function(){
		if ($(".pwd1").val() != $(".pw2").val()) {
			$(".pwd_error2").show();
			$(".pwd2").val('');
		}
	})
	$(".pwd2").focus(function(){
		  $(".pwd_error2").hide();  
	})
	/*密码验证*/
})