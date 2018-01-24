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


// 大选项卡
  $(".main_conter ul li").click(function(event) {
    var index = $(".main_conter ul li").index(this);
    $(this).children("a").addClass("active").parent().siblings().children("a").removeClass("active");
    $(".tab").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
 }) 

  // 小选项卡
    $(".tab_list li").click(function(){
    var index = $(".tab_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".tab_content").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
  })
// 小切换按钮
  $(".dianji li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
  })
  
  	var ajaxbg = $("#progressBar");
    var ajaxbgO = $("#background");
	ajaxbg.hide();
	ajaxbgO.hide();
	$(document).ajaxStart(function () { 
	ajaxbg.show(); 
	ajaxbgO.show();
	}).ajaxStop(function () { 
	ajaxbg.hide(); 
	ajaxbgO.hide();
	}); 
  })