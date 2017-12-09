// 验证
$(function(){
    //滚动改变logo颜色
	console.log($(window).scrollTop());
	$(window).scroll(function(){
		if ($(window).scrollTop() < 820) {
           $(".white").show();
           $(".black").hide();
		}else if ($(window).scrollTop() >= 820 && $(window).scrollTop() < 3600) {
			$(".black").show();
			$(".white").hide();
		}else if ($(window).scrollTop() >= 3600 && $(window).scrollTop() <= 4200){
           $(".white").show();
           $(".black").hide();
		}else{
			$(".black").show();
			$(".white").hide();
		}

	})
	// 注册框和注册框切换
	$(".reg").click(function(){
       	$(".login_box").removeClass("active");
       	$(".login_box").hide();
       	$(".regist_box").show();
       })
	$(".return").click(function(){
       	$(".login_box").addClass("active");
       	$(".login_box").show();
       	$(".regist_box").hide();
       })
	// 注册验证
   // 手机验证
	$(".reg_tel").blur(function(){
		var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/; 
		if ($(".reg_tel").val() == " ") {
			$(".empty_tel").show();
			$(".error_tel").hide();
		}
		else if (!phoneReg.test($(".reg_tel").val())) {
			$(".error_tel").show();
			$(".empty_tel").hide();
		} 
		else{
		$(".empty_tel").hide();
		$(".error_tel").hide();
		}
	})
	$(".reg_tel").focus(function(){
		$(".empty_tel").hide();
		$(".error_tel").hide();
	})
	// 验证码验证
	$(".reg_code").blur(function(){
		if ($(".reg_code").val() == " ") {
			$(".empty_code").show();
		}
	})
	$(".reg_code").focus(function(){
		$(".empty_code").hide();
		$(".error_code").hide();
	})
	// 密码验证
	$(".reg_pwd1").blur(function(){
		if ($(".reg_pwd1").val() == " ") {
			$(".empty_pwd1").show();
		}
	})
	$(".reg_pwd1").focus(function(){
		if ($(".reg_pwd1").val() == " ") {
			$(".empty_pwd1").hide();
		}
	})
	// 确认密码验证
	$(".reg_pwd2").blur(function(){
		if ($(".reg_pwd2").val() != $(".reg_pwd1").val()) {
			$(".error_pwd2").show();
		}else{
			$(".error_pwd2").hide();
		}
	})
	// 邀请码验证
	$(".reg_yq").blur(function(){
		if ($(".reg_yq").val() == " ") {
			$(".empty_yq").show();
		}
	})
	$(".reg_yq").focus(function(){
		if ($(".reg_yq").val() == " ") {
			$(".empty_yq").hide();
		}
	})

})