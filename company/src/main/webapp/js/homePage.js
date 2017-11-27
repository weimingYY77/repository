$(function(){
	var timer;
	var index = 0;
    timer = setInterval(function(){
    	index++;
    	if (index>= $(".imgList li").length){
         index = 0;
    	}
        $(".imgList li").eq(index).fadeIn().siblings().fadeOut();
    },1500)
/*登录弹出框*/
    $("#log").click(function(){
       $(".loginBox").show();
       $(".lightBox").show();
    }); 
    /*关闭弹出框*/
    $(".close").click(function(){
       $(".loginBox").hide();
        $(".lightBox").hide();
    });  
    $("#header").load('../index/common-html/common-footer.html');
    
})