$(function(){
	 $(".drop1 ul li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
  })
})