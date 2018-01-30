function zhuxiao(){
	window.sessionStorage.setItem("userName", "");
	window.sessionStorage.setItem("userId", "");
	window.location.reload();
}		

$(function(){
	if(window.sessionStorage.getItem("siteId")==null){
		var siteId = 10512893;
	}else{
		var siteId = window.sessionStorage.getItem("siteId");
	}
	var myDate = new Date();
	var y = myDate.getFullYear();
	var m = myDate.getMonth()+1;
	var d = myDate.getDate();
	if(m.toString().length==1){
		m = "0"+m;
	}
	if(d.toString().length==1){
		d = "0"+d;
	}
	var time = y.toString()+m.toString()+d.toString();
	myDate.setDate(myDate.getDate()-1);
	var yy =  myDate.getFullYear();
	var mm = myDate.getMonth()+1;
	var dd = myDate.getDate();
	if(mm.toString().length==1){
		mm = "0"+mm;
	}
	if(dd.toString().length==1){
		dd = "0"+dd;
	}
	var time1 = yy.toString()+mm.toString()+dd.toString();
	var start_date = time1;
	var end_date = time;
	var source = "";
	var visitor = "";
	var clientDevice = "";
	var method = "visit/landingpage/a";
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
			 $(".visit_count").hide();
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".avg_visit_pages").hide();
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			var metrics = "visitor_count,ip_count,out_pv_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#b").html(data.data.body.data[0].result.sum[0][0]);
						$("#c").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
					
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 };
	 
	 //今天
	 $("#today").click(function(){
		 $("#trend").empty();
		 $("#temp1").val(0);
		 if($("#temp2").val()==0){
			 $(".visit_count").hide();
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".avg_visit_pages").hide();
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			 $(".visitor_count").show();
			 $(".ip_count").show();
			 $(".out_pv_count").show();
			 $(".bounce_ratio").show();
			 $(".avg_visit_time").show();
			 var metrics = "visitor_count,ip_count,out_pv_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#b").html(data.data.body.data[0].result.sum[0][0]);
						$("#c").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
					
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
		 }else if($("#temp2").val()==1){
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			 $(".ip_count").hide();
			 $(".visit_count").show();
			 $(".visitor_count").show();
			 $(".out_pv_count").show();
			 $(".bounce_ratio").show();
			 $(".avg_visit_time").show();
			 var metrics = "visit_count,visitor_count,out_pv_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
						
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
		 }else if($("#temp2").val()==2){
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			 $(".ip_count").hide();
			 $(".avg_visit_time").hide();
			 $(".bounce_ratio").hide();
			 $(".avg_visit_pages").hide();
			 $(".visit_count").hide();
			 $(".visitor_count").show();
			 $(".new_visitor_count").show();
			 $(".new_visitor_ratio").show();
			 $(".out_pv_count").show();
			 var metrics = "visitor_count,new_visitor_count,new_visitor_ratio,out_pv_count";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#b").html(data.data.body.data[0].result.sum[0][0]);
							$("#d").html(data.data.body.data[0].result.sum[0][1]);
							if(data.data.body.data[0].result.sum[0][2]=='--'){
								$("#e").html(data.data.body.data[0].result.sum[0][2]);
							}else{
								$("#e").html(data.data.body.data[0].result.sum[0][2]+"%");
							}
							$("#f").html(data.data.body.data[0].result.sum[0][3]);
							
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if(b==2){
					  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
					  				}else{
					  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  				}
					  				
					  			}
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
			
					        } 
							
							var tbody1 = document.getElementById("trend");  
					  		var str1 = "";
					  		str1+="<td>当前汇总</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==2){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else{
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}
					        }
							var newchild1 = document.createElement("tr");
				  			newchild1.innerHTML = str1;
				  			tbody1.appendChild(newchild1);
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 }else if($("#temp2").val()==3){
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".ip_count").hide();
			 $(".avg_visit_pages").hide();
			 $(".avg_visit_time").hide();
			 $(".visitor_count").hide();
			 $(".bounce_ratio").hide();
			 $(".visit_count").show();
			 $(".out_pv_count").show();
			 $(".trans_count").show();
			 $(".trans_ratio").show();
			 var metrics = "visit_count,out_pv_count,trans_count,trans_ratio";

				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#f").html(data.data.body.data[0].result.sum[0][1]);
							$("#j").html(data.data.body.data[0].result.sum[0][2]);
							if(data.data.body.data[0].result.sum[0][3]=='--'){
								$("#k").html(data.data.body.data[0].result.sum[0][3]);
							}else{
								$("#k").html(data.data.body.data[0].result.sum[0][3]+"%");
							}
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if(b==3){
					  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
					  				}else{
					  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  				}
					  				
					  			}
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
			
					        } 
							
							var tbody1 = document.getElementById("trend");  
					  		var str1 = "";
					  		str1+="<td>当前汇总</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==3){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else{
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}
					        }
							var newchild1 = document.createElement("tr");
				  			newchild1.innerHTML = str1;
				  			tbody1.appendChild(newchild1);
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 }
	 });
	 
	 //昨天
	 $("#yesterday").click(function(){
		 $("#trend").empty();
		 $("#temp1").val(1);
		 var myDate = new Date();
			myDate.setDate(myDate.getDate()-1);
			var y = myDate.getFullYear();
			var m = myDate.getMonth()+1;
			var d = myDate.getDate();
			if(m.toString().length==1){
				m = "0"+m;
			}
			if(d.toString().length==1){
				d = "0"+d;
			}
			var time = y.toString()+m.toString()+d.toString();
			var yeDate = new Date();
			yeDate.setDate(yeDate.getDate()-2);
			var yy =  yeDate.getFullYear();
			var mm = yeDate.getMonth()+1;
			var dd = yeDate.getDate();
			if(mm.toString().length==1){
				mm = "0"+mm;
			}
			if(dd.toString().length==1){
				dd = "0"+dd;
			}
			var time1 = yy.toString()+mm.toString()+dd.toString();
			var start_date = time1;
			var end_date = time;
		 if($("#temp2").val()==0){
			 $(".visit_count").hide();
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".avg_visit_pages").hide();
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			 $(".visitor_count").show();
			 $(".ip_count").show();
			 $(".out_pv_count").show();
			 $(".bounce_ratio").show();
			 $(".avg_visit_time").show();
			 var metrics = "visitor_count,ip_count,out_pv_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#b").html(data.data.body.data[0].result.sum[0][0]);
						$("#c").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
					
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
		 }else if($("#temp2").val()==1){
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			 $(".ip_count").hide();
			 $(".visit_count").show();
			 $(".visitor_count").show();
			 $(".out_pv_count").show();
			 $(".bounce_ratio").show();
			 $(".avg_visit_time").show();
			 var metrics = "visit_count,visitor_count,out_pv_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
						$("#i").html(data.data.body.data[0].result.sum[0][5]);
						
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
		 }else if($("#temp2").val()==2){
			 $(".trans_count").hide();
			 $(".trans_ratio").hide();
			 $(".ip_count").hide();
			 $(".avg_visit_time").hide();
			 $(".bounce_ratio").hide();
			 $(".avg_visit_pages").hide();
			 $(".visit_count").hide();
			 $(".visitor_count").show();
			 $(".new_visitor_count").show();
			 $(".new_visitor_ratio").show();
			 $(".out_pv_count").show();
			 var metrics = "visitor_count,new_visitor_count,new_visitor_ratio,out_pv_count";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#b").html(data.data.body.data[0].result.sum[0][0]);
							$("#d").html(data.data.body.data[0].result.sum[0][1]);
							if(data.data.body.data[0].result.sum[0][2]=='--'){
								$("#e").html(data.data.body.data[0].result.sum[0][2]);
							}else{
								$("#e").html(data.data.body.data[0].result.sum[0][2]+"%");
							}
							$("#f").html(data.data.body.data[0].result.sum[0][3]);
							
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if(b==2){
					  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
					  				}else{
					  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  				}
					  				
					  			}
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
			
					        } 
							
							var tbody1 = document.getElementById("trend");  
					  		var str1 = "";
					  		str1+="<td>当前汇总</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==2){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else{
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}
					        }
							var newchild1 = document.createElement("tr");
				  			newchild1.innerHTML = str1;
				  			tbody1.appendChild(newchild1);
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 }else if($("#temp2").val()==3){
			 $(".new_visitor_count").hide();
			 $(".new_visitor_ratio").hide();
			 $(".ip_count").hide();
			 $(".avg_visit_pages").hide();
			 $(".avg_visit_time").hide();
			 $(".visitor_count").hide();
			 $(".bounce_ratio").hide();
			 $(".visit_count").show();
			 $(".out_pv_count").show();
			 $(".trans_count").show();
			 $(".trans_ratio").show();
			 var metrics = "visit_count,out_pv_count,trans_count,trans_ratio";

				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#f").html(data.data.body.data[0].result.sum[0][1]);
							$("#j").html(data.data.body.data[0].result.sum[0][2]);
							if(data.data.body.data[0].result.sum[0][3]=='--'){
								$("#k").html(data.data.body.data[0].result.sum[0][3]);
							}else{
								$("#k").html(data.data.body.data[0].result.sum[0][3]+"%");
							}
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if(b==3){
					  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
					  				}else{
					  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  				}
					  				
					  			}
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
			
					        } 
							
							var tbody1 = document.getElementById("trend");  
					  		var str1 = "";
					  		str1+="<td>当前汇总</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==3){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else{
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}
					        }
							var newchild1 = document.createElement("tr");
				  			newchild1.innerHTML = str1;
				  			tbody1.appendChild(newchild1);
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 }
	 });
	 
	 //指标概览
	 $("#summary").click(function(){
		 $("#trend").empty();
		 $("#temp2").val(0);
		 $(".visit_count").hide();
		 $(".new_visitor_count").hide();
		 $(".new_visitor_ratio").hide();
		 $(".avg_visit_pages").hide();
		 $(".trans_count").hide();
		 $(".trans_ratio").hide();
		 $(".visitor_count").show();
		 $(".ip_count").show();
		 $(".out_pv_count").show();
		 $(".bounce_ratio").show();
		 $(".avg_visit_time").show();
		 var metrics = "visitor_count,ip_count,out_pv_count,bounce_ratio,avg_visit_time";
		 if($("#temp1").val()==0){
			 
		 }else if($("#temp1").val()==1){
			var myDate = new Date();
			myDate.setDate(myDate.getDate()-1);
			var y = myDate.getFullYear();
			var m = myDate.getMonth()+1;
			var d = myDate.getDate();
			if(m.toString().length==1){
				m = "0"+m;
			}
			if(d.toString().length==1){
				d = "0"+d;
			}
			var time = y.toString()+m.toString()+d.toString();
			var yeDate = new Date();
			yeDate.setDate(yeDate.getDate()-2);
			var yy =  yeDate.getFullYear();
			var mm = yeDate.getMonth()+1;
			var dd = yeDate.getDate();
			if(mm.toString().length==1){
				mm = "0"+mm;
			}
			if(dd.toString().length==1){
				dd = "0"+dd;
			}
			var time1 = yy.toString()+mm.toString()+dd.toString();
			var start_date = time1;
			var end_date = time;
		 }
		 
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#b").html(data.data.body.data[0].result.sum[0][0]);
						$("#c").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
					
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 });
	 
	 //流量质量分析
	 $("#quality").click(function(){
		 $("#trend").empty();
		 $("#temp2").val(1);
		 $(".new_visitor_count").hide();
		 $(".new_visitor_ratio").hide();
		 $(".trans_count").hide();
		 $(".trans_ratio").hide();
		 $(".ip_count").hide();
		 $(".visit_count").show();
		 $(".visitor_count").show();
		 $(".out_pv_count").show();
		 $(".bounce_ratio").show();
		 $(".avg_visit_time").show();
		 var metrics = "visit_count,visitor_count,out_pv_count,bounce_ratio,avg_visit_time";
		 if($("#temp1").val()==0){
			 
		 }else if($("#temp1").val()==1){
			var myDate = new Date();
			myDate.setDate(myDate.getDate()-1);
			var y = myDate.getFullYear();
			var m = myDate.getMonth()+1;
			var d = myDate.getDate();
			if(m.toString().length==1){
				m = "0"+m;
			}
			if(d.toString().length==1){
				d = "0"+d;
			}
			var time = y.toString()+m.toString()+d.toString();
			var yeDate = new Date();
			yeDate.setDate(yeDate.getDate()-2);
			var yy =  yeDate.getFullYear();
			var mm = yeDate.getMonth()+1;
			var dd = yeDate.getDate();
			if(mm.toString().length==1){
				mm = "0"+mm;
			}
			if(dd.toString().length==1){
				dd = "0"+dd;
			}
			var time1 = yy.toString()+mm.toString()+dd.toString();
			var start_date = time1;
			var end_date = time;
		 }
		 
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#f").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#g").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#g").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
						$("#i").html(data.data.body.data[0].result.sum[0][5]);
						
						var time = parseInt(data.data.body.data[0].result.sum[0][4]);
						var hh;
			            var mm;
			            var ss;
			           //传入的时间为空或小于0
			            if(time==null||time<0){
			                return;
			            }
			            //得到小时
			            hh=time/3600|0;
			            time=parseInt(time)-hh*3600;
			            if(parseInt(hh)<10){
			                  hh="0"+hh;
			            }
			            //得到分
			            mm=time/60|0;
			            //得到秒
			            ss=parseInt(time)-mm*60;
			            if(parseInt(mm)<10){
			                 mm="0"+mm;    
			            }
			            if(ss<10){
			                ss="0"+ss;      
			            }
			            if(isNaN(ss)){
			            	ss="00";
			            }
			            var time = hh+":"+mm+":"+ss;
			            $("#h").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else if(b==4){
				  					var time = parseInt(data.data.body.data[0].result.items[1][a][b]);
									var hh;
						            var mm;
						            var ss;
						           //传入的时间为空或小于0
						            if(time==null||time<0){
						                return;
						            }
						            //得到小时
						            hh=time/3600|0;
						            time=parseInt(time)-hh*3600;
						            if(parseInt(hh)<10){
						                  hh="0"+hh;
						            }
						            //得到分
						            mm=time/60|0;
						            //得到秒
						            ss=parseInt(time)-mm*60;
						            if(parseInt(mm)<10){
						                 mm="0"+mm;    
						            }
						            if(ss<10){
						                ss="0"+ss;      
						            }
						            if(isNaN(ss)){
						            	ss="00";
						            }
						            var time = hh+":"+mm+":"+ss;
						            str+="<td>"+time+"</td>";
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==4){
								var time = parseInt(data.data.body.data[0].result.sum[0][a]);
								var hh;
					            var mm;
					            var ss;
					           //传入的时间为空或小于0
					            if(time==null||time<0){
					                return;
					            }
					            //得到小时
					            hh=time/3600|0;
					            time=parseInt(time)-hh*3600;
					            if(parseInt(hh)<10){
					                  hh="0"+hh;
					            }
					            //得到分
					            mm=time/60|0;
					            //得到秒
					            ss=parseInt(time)-mm*60;
					            if(parseInt(mm)<10){
					                 mm="0"+mm;    
					            }
					            if(ss<10){
					                ss="0"+ss;      
					            }
					            if(isNaN(ss)){
					            	ss="00";
					            }
					            var time = hh+":"+mm+":"+ss;
					            str1+="<td>"+time+"</td>";
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 });
	 
	 //新访客分析
	 $("#newV").click(function(){
		 $("#trend").empty();
		 $("#temp2").val(2);
		 $(".trans_count").hide();
		 $(".trans_ratio").hide();
		 $(".ip_count").hide();
		 $(".avg_visit_time").hide();
		 $(".bounce_ratio").hide();
		 $(".avg_visit_pages").hide();
		 $(".visit_count").hide();
		 $(".visitor_count").show();
		 $(".new_visitor_count").show();
		 $(".new_visitor_ratio").show();
		 $(".out_pv_count").show();
		 var metrics = "visitor_count,new_visitor_count,new_visitor_ratio,out_pv_count";
		 if($("#temp1").val()==0){
			 
		 }else if($("#temp1").val()==1){
			var myDate = new Date();
			myDate.setDate(myDate.getDate()-1);
			var y = myDate.getFullYear();
			var m = myDate.getMonth()+1;
			var d = myDate.getDate();
			if(m.toString().length==1){
				m = "0"+m;
			}
			if(d.toString().length==1){
				d = "0"+d;
			}
			var time = y.toString()+m.toString()+d.toString();
			var yeDate = new Date();
			yeDate.setDate(yeDate.getDate()-2);
			var yy =  yeDate.getFullYear();
			var mm = yeDate.getMonth()+1;
			var dd = yeDate.getDate();
			if(mm.toString().length==1){
				mm = "0"+mm;
			}
			if(dd.toString().length==1){
				dd = "0"+dd;
			}
			var time1 = yy.toString()+mm.toString()+dd.toString();
			var start_date = time1;
			var end_date = time;
		 }
		 
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#b").html(data.data.body.data[0].result.sum[0][0]);
						$("#d").html(data.data.body.data[0].result.sum[0][1]);
						if(data.data.body.data[0].result.sum[0][2]=='--'){
							$("#e").html(data.data.body.data[0].result.sum[0][2]);
						}else{
							$("#e").html(data.data.body.data[0].result.sum[0][2]+"%");
						}
						$("#f").html(data.data.body.data[0].result.sum[0][3]);
						
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==2){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==2){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 });
	 
	 //转化分析
	 $("#conversion").click(function(){
		 $("#trend").empty();
		 $("#temp2").val(3);
		 $(".new_visitor_count").hide();
		 $(".new_visitor_ratio").hide();
		 $(".ip_count").hide();
		 $(".avg_visit_pages").hide();
		 $(".avg_visit_time").hide();
		 $(".visitor_count").hide();
		 $(".bounce_ratio").hide();
		 $(".visit_count").show();
		 $(".out_pv_count").show();
		 $(".trans_count").show();
		 $(".trans_ratio").show();
		 var metrics = "visit_count,out_pv_count,trans_count,trans_ratio";
		 if($("#temp1").val()==0){
			 
		 }else if($("#temp1").val()==1){
			var myDate = new Date();
			myDate.setDate(myDate.getDate()-1);
			var y = myDate.getFullYear();
			var m = myDate.getMonth()+1;
			var d = myDate.getDate();
			if(m.toString().length==1){
				m = "0"+m;
			}
			if(d.toString().length==1){
				d = "0"+d;
			}
			var time = y.toString()+m.toString()+d.toString();
			var yeDate = new Date();
			yeDate.setDate(yeDate.getDate()-2);
			var yy =  yeDate.getFullYear();
			var mm = yeDate.getMonth()+1;
			var dd = yeDate.getDate();
			if(mm.toString().length==1){
				mm = "0"+mm;
			}
			if(dd.toString().length==1){
				dd = "0"+dd;
			}
			var time1 = yy.toString()+mm.toString()+dd.toString();
			var start_date = time1;
			var end_date = time;
		 }
		 
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#f").html(data.data.body.data[0].result.sum[0][1]);
						$("#j").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#k").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#k").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==3){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}else{
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}
				  				
				  			}
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
		
				        } 
						
						var tbody1 = document.getElementById("trend");  
				  		var str1 = "";
				  		str1+="<td>当前汇总</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==3){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else{
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}
				        }
						var newchild1 = document.createElement("tr");
			  			newchild1.innerHTML = str1;
			  			tbody1.appendChild(newchild1);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});	 
	 });
});