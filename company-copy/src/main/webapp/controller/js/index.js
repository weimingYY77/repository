$(function(){
	 $('.inactive').click(function(){
       if($(this).siblings('ul').css('display')=='none'){
           $(this).siblings('ul').slideDown(100);
       }else{
           $(this).siblings('ul').slideUp(100);
       }
     })
     $('.inactive').click(function(){
     	if ($(this).children("span").attr("class")=="rjt") {
     		$(this).children("span").removeClass("rjt").addClass("bjt");
     	}else{
           $(this).children("span").removeClass("bjt").addClass("rjt");
     	}
     })

    $(".box_list li").click(function(){
        var index=$(".box_list li").index(this)
        $(this).addClass("active").siblings().removeClass("active")
        $(".service_content").eq(index).addClass("active").siblings().removeClass("active")
    })
})