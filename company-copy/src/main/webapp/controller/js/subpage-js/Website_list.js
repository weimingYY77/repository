$(function(){
       // 选项卡切换
    $(".website li").click(function(){
        var index = $(".website li").index(this)
        $(this).addClass("bg").siblings().removeClass("bg")
        $(".self_total").eq(index).addClass("active").siblings().removeClass("active")
    })
    // 新增
	$(".self_web .add").click(function(){
		$(".self_web>div:last-child").before("<div class='list_desc'>123</div>");
		if ($(".self_web").children().length > 20) {
            alert("最多只能添加20个网站");
		}
	})
	$(".total_web .add").click(function(){
		$(".total_web>div:last-child").before("<div class='list_desc'>123</div>");
		if ($(".total_web").children().length > 20) {
            alert("最多只能添加20个网站");
		}
	})
})