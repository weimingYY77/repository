//关键词排名
function illustrate(a,b){
	var host = $("#host").val(); 
	var params = a;
	$.ajax({
		cache : false,
		url : "../../../StatisticsController/keyTop.do",
		type : "post",
		data : {"host":host,"params":params},
		dataType : "json",
		async : true,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				$("#greentxt"+b+"").html(data.data.data.sort);
			}
		},
		error : function(request) {
			alert("Connection error");
		},
	});
}


$(function(){
	$(".addword").click(function(){	
		if(host==''){
			alert("请输入网址！");
		}else{
			$(".mask").show();
		}
	})
	$(".cancel").click(function(){	
		$(".mask").hide();
	})
	var count = 0;
	$("#Notput").hide();//隐藏域名未备案
	
	//用户
	 var userName = window.sessionStorage.getItem("userName");
	 if(userName==null){
		 var userId = window.sessionStorage.getItem("userId");
		 if(userId!=null){
			var code = userId;
			var leng=code.length;  //定义长度
			if(leng==1){
			code="00000"+code;
			}else if(leng==2){
			code="0000"+code;
			}else if(leng==3){
			code="000"+code;
			}else if(leng==4){
			code="00"+code;
			}else if(leng==5){
			code="0"+code;
			}
			$("#userId").html(code);
		 }else{
			 window.location.href="../../../index.htm";
		 }
	 }else{
		 $("#userId").html(userName);
	 }
	// 遮罩层的显示和隐藏
	//查看分析
	$("#ViewAnalysis").click(function(){
		var host = $("#host").val();
		if(host==''){
			alert("请输入网址！");
		}else{
			var appkey = 31245;
			var sign = "9449971c961c11912b8eb50fb4fe00da";
			
			//百度权重
			var key= "0f4128e687c449a39de351b721e6dc18";
			var params = "key="+key+"&host="+host+"";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/seo.do",
				type : "post",
				data : {"params":params},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#seo").html(data.data.data.keywordcount);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//同ip域名
			var key= "699e34a7bdda412590b4a6cb19e8ef73";
			var params = "key="+key+"&ip="+host+"";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/WithIP.do",
				type : "post",
				data : {"params":params},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#WithIP").html(data.data.data.hosts.length);
						$("#WithIPN").html(data.data.data.ip);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//域名注册和过期时间
			var key= "dc21d41e02df414a8de5a65cad3db10b";
			var params = "key="+key+"&host="+host+"";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/register.do",
				type : "post",
				data : {"params":params},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#register").html(data.data.data.regtime);
						$("#overdue").html(data.data.data.expiretime);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//alexa
			var key= "f7882245d64b4bff99f6333e7120cc65";
			var params = "key="+key+"&host="+host+"";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/alexa.do",
				type : "post",
				data : {"params":params},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(typeof(data.data.data.traffic_data[0]) == 'undefined'){
							$("#collection").html(0);
							$("#Aweek").html(0);
							$("#month").html(0);
							$("#anti-chain").html(data.data.data.backlinks);
						}else{
							$("#collection").html(data.data.data.traffic_data[3].traffic_rank);
							$("#Aweek").html(data.data.data.traffic_data[2].traffic_rank);
							$("#month").html(data.data.data.traffic_data[1].traffic_rank);
							$("#anti-chain").html(data.data.data.backlinks);
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
		
		};
	});
	
	//添加关键词
	$("#addKeyword").click(function(){
		var illustrate = $("#illustrate").val();
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/addKeyword.do",
			type : "post",
			data : {"params":illustrate},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					for (var a = 0; a < data.data.data.length; a++)  
			        {
						count++;
			           //获取tbody  
			            var tbody = document.getElementById("trend");  
			  			var str = "";
			  			str+="<td class='greentxt'>"+data.data.data[a].keyword+"</td>";
			  			str+="<td class='greentxt'>"+data.data.data[a].allindex+"</td>";
			  			str+="<td class='greentxt'>"+data.data.data[a].mobileindex+"</td>";
			  			str+="<td class='greentxt'>"+data.data.data[a].so360index+"</td>";
			  			str+="<td class='greentxt' id='greentxt"+count+"'><a href='javascript:void(0);' onclick=illustrate('"+data.data.data[a].keyword+"','"+count+"')>查询</a></td>";
			  			var newchild = document.createElement("tr");
			  			newchild.innerHTML = str;
			  			tbody.appendChild(newchild);
			        } 
					
					$(".mask").hide();
					$("#illustrate").val("");
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
	});
})