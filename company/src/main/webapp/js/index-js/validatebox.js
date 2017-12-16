// 验证
$(function(){
    //滚动改变logo颜色
	console.log($(window).scrollTop());
	$(window).scroll(function(){
		if ($(window).scrollTop() < 820) {
           $(".white").show();
           $(".black").hide();
           $('.toggle > div > div').css('background','#FFFFFF')
		}else if ($(window).scrollTop() >= 820 && $(window).scrollTop() < 3700) {
			$(".black").show();
			$(".white").hide();
			$('.toggle > div > div').css('background','#000000')
		}else if ($(window).scrollTop() >= 3700 && $(window).scrollTop() <= 4200){
           $(".white").show();
           $(".black").hide();
           $('.toggle > div > div').css('background','#FFFFFF')
		}else{
			$(".black").show();
			$(".white").hide();
			$('.toggle > div > div').css('background','#000000')
		}

	})

})