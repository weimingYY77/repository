$(function(){

// 获取时间
  function showDT() {  
  var currentDT = new Date();  
  var y,m,date,day,hs,ms,ss,theDateStr;  
  y = currentDT.getFullYear(); //四位整数表示的年份  
  m = currentDT.getMonth() + 1; //月  
  date = currentDT.getDate(); //日  
  hs = currentDT.getHours(); //时  
  ms = currentDT.getMinutes(); //分  
  ss = currentDT.getSeconds(); //秒 
  if (ss<10) {
    ss = "0" + ss;
  } 
  if (ms<10) {
    ms = "0" + ms;
  } 
  if (hs<10) {
    hs = "0" + hs;
  } 
  theDateStr = y+"年"+  m +"月"+date+"日"+hs+":"+ms+":"+ss;  
  $("#Specific_date").html(theDateStr);  
  window.setTimeout( showDT, 1000);  
}
showDT();

// 选项卡
  $(".main_conter ul li").click(function(event) {
    var index = $(".main_conter ul li").index(this);
    $(this).children("a").addClass("active").parent().siblings().children("a").removeClass("active");
    $(".tab").eq(index).addClass("show_tab").siblings().removeClass("show_tab");
  });

      // var $li = $('#tab li');
      // var $ul = $('#content ul');
            
      // $li.click(function(){
      //   var $this = $(this);
      //   var $t = $this.index();
      //   $ul.css('display','none');
      //   $ul.eq($t).css('display','block');
      // })

// 小切换按钮
  $(".dianji li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
  })
})



