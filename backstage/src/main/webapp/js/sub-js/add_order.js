$(function(){
	/*动态添加信息*/
	$(".service_demo .add_one").click(function(){
		$(".one_off>div:last-child").after("<div class='service_demo'><span class='demo'><input type='text' name='' value=''></span><span class='people'><input type='text' name='' value=''></span><span class='option'><i class='reduce'></i></span></div>");
			$(".service_demo .reduce").on('click',function(){
		    $(this).parent().parent().remove();
	       });
	})
	$(".service_demo .add_two").click(function(){
		$(".two_off>div:last-child").after("<div class='service_demo'><span class='demo'><input type='text' name='' value=''></span><span class='people'><input type='text' name='' value=''></span><span class='option'><i class='reduce'></i></span></div>");
		$(".service_demo .reduce").on('click',function(){
		    $(this).parent().parent().remove();
	       });
	})
   	$(".service_demo .reduce").on('click',function(){
		    $(this).parent().parent().remove();
	       });

})

/*字数限制*/
window.onload = function() 
{ 
document.getElementById('remark_txt').onkeydown = function() 
{    
    if(this.value.length >= 300) 
      event.returnValue = false; 
} 
} 