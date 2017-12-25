$(function(){
  // 导航栏搜索框
 $(".search").click(function(){
    $(".search_box").fadeIn(500);
    $(".search").fadeOut(500);
 })
   $(".search_txt").change(function(){
      if ($(".search_txt").val()!=" ") {
         console.log(123);
        $(".close").fadeIn();
      }else{
         console.log(456);
         $(".close").fadeOut();
      }
   })
   /* 导航下拉列表*/
$(".drop-down").mouseenter(function() {
      $(this).children("div").stop().fadeIn("slow");
});
   $(".drop-down").mouseleave(function() {
      $(this).children("div").stop().fadeOut("slow");
});
  // 折叠菜单栏
	 $('.inactive').click(function(){
       if($(this).children('ul').css('display') == 'none'){
           $(this).children('ul').slideDown(600);
           $(this).children("a").children("span").removeClass("rjt").addClass("bjt");
       }else{
           $(this).children('ul').slideUp(600);
           $(this).children("a").children("span").removeClass("bjt").addClass("rjt");
       }
     })
   // 选项卡切换
    $(".box_list li").click(function(){
        var index = $(".box_list li").index(this)
        $(this).addClass("active").siblings().removeClass("active")
        $(".service_content").eq(index).addClass("active").siblings().removeClass("active")
    })
})