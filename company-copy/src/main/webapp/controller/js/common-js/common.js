$(function(){
  // 导航栏搜索框
 $(".search").click(function(){
    $(".search_box").fadeIn(500);
    $(".search").fadeOut(500);
 })
   $(".search_txt").keydown(function(){
      $(".close").show();
   })
   $(".close").click(function(){
     $(".search_txt").val(' ');
     $(".close").hide();
   });
   /* 导航下拉列表*/
$(".drop-down").mouseenter(function() {
      $(this).children("div").stop().fadeIn("slow");
});
   $(".drop-down").mouseleave(function() {
      $(this).children("div").stop().fadeOut("slow");
});
  // 折叠菜单栏
	 $('.main_left .list>ul>li').click(function(){
       if($(this).children('ul').css('display') == 'none'){
           $(this).children('ul').slideDown(600);
           $(this).children("a").children("span").removeClass("rjt").addClass("bjt");
       }else{
           $(this).children('ul').slideUp(600);
           $(this).children("a").children("span").removeClass("bjt").addClass("rjt");
       }
     })
})
// 小切换按钮
  $(".dianji li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
  })