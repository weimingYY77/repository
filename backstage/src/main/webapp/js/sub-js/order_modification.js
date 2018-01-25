$(function(){
    // 选项卡切换
   $(".tab_list li").click(function(){
    var index = $(".tab_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".tab_content").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
  })
     /*操作列表显示隐藏*/
	$(".op").mousemove(function(){
		$(".option_list").show();
	})
	$(".op").mouseout(function(){
		$(".option_list").hide();
	})
  // 遮罩层
  $(".ch_one").click(function(){
     $(".mask_one").show();
  })
  $(".ch_two").click(function(){
     $(".mask_two").show();
  })
  $(".no").click(function(){
     $(".mask_one").hide();
     $(".mask_two").hide();
  })
})