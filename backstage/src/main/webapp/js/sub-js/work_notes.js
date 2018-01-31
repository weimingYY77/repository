$(function(){
     /*操作列表显示隐藏*/
  $(".op").mousemove(function(){
    $(this).children(".option_list").show();
  })
  $(".op").mouseout(function(){
    $(this).children(".option_list").hide();
  })

  // 添加笔记遮罩层
  $(".add_note").click(function(){
     $(".mask_add").show();
  })
  $(".note_detail").click(function(){
     $(".mask_change").show();
  })
    $(".no").click(function(){
     $(".mask_add").hide();
     $(".mask_change").hide();
  })
})