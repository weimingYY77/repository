$(function(){
   // 修改客户模块的显示
   $(".change").click(function(){
        $(".change_guest").css('zIndex', '10');
        $(".tab_content").css('zIndex', '-1');
   })
    // 取消修改客户模块
      $(".cancel").click(function(){
        $(".change_guest").css('zIndex', '-1');
        $(".tab_content").css('zIndex', '10');
   }) 
      // 客户详情服务信息选项卡切换
   $(".tab_list li").click(function(){
        $(".change_guest").css('zIndex', '-1');
        $(".tab_content").css('zIndex', '10');
        var index = $(".tab_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".tab_content").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
  })
   
	   	/* 删除 遮罩层 */
	$(".btn_group .del").click(function(){
		$(".mask").show();
	})
	  // 修改遮罩层
  $(".pen_one").click(function(){
     $(".mask_one").show();
  })
  $(".pen_two").click(function(){
     $(".mask_two").show();
  })
  $(".no").click(function(){
    $(".mask").hide();
    $(".mask_one").hide();
    $(".mask_two").hide();
  })
})