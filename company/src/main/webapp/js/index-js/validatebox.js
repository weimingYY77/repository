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
})