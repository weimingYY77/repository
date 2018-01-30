 function myclick(a){
    	window.location.href="Websiteprofile.html";
    	
    	window.sessionStorage.setItem("siteId", a);
 }
  
 function zhuxiao(){
		window.sessionStorage.setItem("userName", "");
		window.sessionStorage.setItem("userId", "");
		window.location.reload();
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
	//用户
	var userName = window.sessionStorage.getItem("userName");
    if(userName!=null&&userName!=""){//判断是否有用户昵称
 	   $("#userId").html(userName);
    }else{
      var userId = window.sessionStorage.getItem("userId");
      if(userId!=null&&userId!=""){//判断用户是否已登录
	    	   	var code = userId;
				var leng=code.length;  //定义长度
				if(leng==1){
					code="000"+code;
					}else if(leng==2){
					code="00"+code;
					}else if(leng==3){
					code="0"+code;
				}
				$("#userId").html(code);
   	}else{
   		window.location.href="../../../index.htm";
   	}
   }
	first();
    
    function first(){
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverviewO.do",
			type : "post",
			data : {},
			dataType : "json",
			async : false,
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