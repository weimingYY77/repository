$(function(){
	$(".tab_list li").click(function(){
		var index = $(".tab_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".tab_content").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
	})
})