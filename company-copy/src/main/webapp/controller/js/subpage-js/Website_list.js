 function myclick(a){
    	window.location.href="Websiteprofile.html";
    	
    	window.sessionStorage.setItem("siteId", a);
 }
  
$(function(){
       // 选项卡切换
    $(".website li").click(function(){
        var index = $(".website li").index(this)
        $(this).addClass("bg").siblings().removeClass("bg")
        $(".self_total").eq(index).addClass("active").siblings().removeClass("active")
    })
    // 新增
	$(".self_web .add").click(function(){
		$(".self_web>div:last-child").before("<div class='list_desc'>123</div>");
		if ($(".self_web").children().length > 20) {
            alert("最多只能添加20个网站");
		}
	})
	$(".total_web .add").click(function(){
		$(".total_web>div:last-child").before("<div class='list_desc'>123</div>");
		if ($(".total_web").children().length > 20) {
            alert("最多只能添加20个网站");
		}
	})
	
	first();
    
    function first(){
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverviewO.do",
			type : "post",
			data : {},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					for (var a = 0; a < data.data.body.data[0].list.length; a++)  
			        {  
						var s = a+1;
			           //获取div  
			            var div = document.getElementById("trend");  
			  			var str = "";
			  			str+="<div class='list_desc'>";
			  				str+="<span class='domain'><span>"+s+"</span><a href='javascript:void(0)'  onclick='myclick("+data.data.body.data[0].list[a].site_id+")'>"+data.data.body.data[0].list[a].domain+"</a></span>"
			  				str+="<span>三千客信息有限公司</span>";
			  				str+="<span>互联网，计算机</span>";
			  				str+="<span><a href='#' title='' class='modify'>修改</a>";
			  				str+="<a href='#' title='' class='del'>删除</a></span>";
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        } 
					
					var div = document.getElementById("trend");  
			  		var str = "";
			  		str+="<div class='list_desc'>";
	  				str+="<span></span>"
	  				str+="<span></span>";
	  				str+="<span></span>";
	  				str+="<span><a href='javascript:;' title='' class='add'>新增网站</a></span>";
	  				str+="</div>";
	  				var newchild = document.createElement("div");
	  				newchild.innerHTML = str;
	  				div.appendChild(newchild);
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
    }
    
})