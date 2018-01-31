$(function(){
   // 修改订单模块的显示
   $(".change").click(function(){
   	    $(".change_order").css('zIndex', '10');
   	    $(".tab_content").css('zIndex', '-1');
   })
    // 取消修改订单模块
      $(".cancel").click(function(){
   	    $(".change_order").css('zIndex', '-1');
   	    $(".tab_content").css('zIndex', '10');
   }) 
    // 订单详情付款记录选项卡切换
   $(".tab_list li").click(function(){
   	    $(".change_order").css('zIndex', '-1');
   	    $(".tab_content").css('zIndex', '10');
        var index = $(".tab_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".tab_content").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
  })
     /*付款记录操作列表显示隐藏*/
	$(".op").mousemove(function(){
		$(this).children(".option_list").show();
	})
	$(".op").mouseout(function(){
		$(this).children(".option_list").hide();
	})
	/* 删除遮罩层 修改遮罩层*/
	$(".btn_group .del").click(function(){
		$(".mask").show();
	})
	$(".ch_one").click(function(){
        $(".mask_one").show();
    })
    $(".ch_two").click(function(){
       $(".mask_two").show();
    })
	$(".no").click(function(){
		$(".mask").hide();
		$(".mask_one").hide();
        $(".mask_two").hide();
	})
})