$(function(){
   // 选项卡切换
    $(".box_list li").click(function(){
        var index = $(".box_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".service_content").eq(index).addClass("active").siblings().removeClass("active");
    })
    
})