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
	var max = 2;
	var source = "";
	var visitor = "";
	var clientDevice = "";
	var viewType = "domain"; //按域名
	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
	first();
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
	 //显示全部
	function first(){
		 	var method = "source/link/a";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						if(data.data.body.data[0].result.sum[0][3]=='--'){
							$("#d").html(data.data.body.data[0].result.sum[0][3]);
						}else{
							$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
						}
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
					
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
			            $("#e").html(time);
			            
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
		if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
		}else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var viewType = "url";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var viewType = "url";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "old";
			var viewType = "url";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//昨天
	$("#yesterday").click(function(){
		$("#trend").empty();
		$("#temp1").val(1);
		if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
		}else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var viewType = "url";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var viewType = "url";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "old";
			var viewType = "url";
		}
		
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
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//设备
	$("#device").click(function(){
		$("#trend").empty();
		$("#temp2").val(0);
		if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
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
			var viewType = "domain";
		}else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
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
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
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
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
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
			var visitor = "old";
			var viewType = "url";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//计算机
	$("#computer").click(function(){
		$("#trend").empty();
		$("#temp2").val(1);
		if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
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
			var viewType = "url";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "new";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
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
			var visitor = "new";
			var viewType = "url";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "old";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
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
			var visitor = "old";
			var viewType = "url";
			var clientDevice = "pc";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//移动设备
	$("#Mobile").click(function(){
		$("#trend").empty();
		$("#temp2").val(2);
		if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
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
			var viewType = "url";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "new";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
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
			var visitor = "new";
			var viewType = "url";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "old";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
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
			var visitor = "old";
			var viewType = "url";
			var clientDevice = "mobile";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//访客
	$("#visitor").click(function(){
		$("#trend").empty();
		$("#temp3").val(0);
		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==0){
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
			var viewType = "domain";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==1){
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
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==1){
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
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==1){
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
			var clientDevice = "mobile";
			var viewType = "url";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//新访客
	$("#newV").click(function(){
		$("#trend").empty();
		$("#temp3").val(1);
		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			var visitor = "new";
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			var visitor = "new";
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			var visitor = "new";
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			var visitor = "new";
			var clientDevice = "mobile";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==1){
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
			var visitor = "new";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==1){
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
			var clientDevice = "pc";
			var viewType = "url";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==1){
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
			var clientDevice = "mobile";
			var viewType = "url";
			var visitor = "new";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//老访客
	$("#oldV").click(function(){
		$("#trend").empty();
		$("#temp3").val(2);
		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			var visitor = "old";
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			var visitor = "old";
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			var visitor = "old";
			var clientDevice = "pc";
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			var visitor = "old";
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var clientDevice = "mobile";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==1){
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
			var visitor = "old";
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==1){
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
			var clientDevice = "pc";
			var viewType = "url";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==0){
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
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==1){
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
			var clientDevice = "mobile";
			var viewType = "url";
			var visitor = "old";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//按域名
	$("#realm").click(function(){
		$("#trend").empty();
		$("#temp4").val(0);
		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			var viewType = "domain";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp3").val()==0){
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
			var viewType = "domain";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp3").val()==1){
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
			var viewType = "domain";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp3").val()==2){
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
			var viewType = "domain";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp3").val()==0){
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
			var viewType = "domain";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp3").val()==1){
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
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp3").val()==2){
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
			var viewType = "domain";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp3").val()==0){
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
			var viewType = "domain";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp3").val()==1){
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
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp3").val()==2){
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
			var viewType = "domain";
			var clientDevice = "mobile";
			var visitor = "old";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
	
	//按url
	$("#url").click(function(){
		$("#trend").empty();
		$("#temp4").val(0);
		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			var viewType = "url";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			var viewType = "url";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			var viewType = "url";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			var viewType = "url";
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			var viewType = "url";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			var viewType = "url";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			var viewType = "url";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			var viewType = "url";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			var viewType = "url";
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp3").val()==0){
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
			var viewType = "url";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp3").val()==1){
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
			var viewType = "url";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp3").val()==2){
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
			var viewType = "url";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp3").val()==0){
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
			var viewType = "url";
			var clientDevice = "pc";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp3").val()==1){
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
			var viewType = "url";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp3").val()==2){
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
			var viewType = "url";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp3").val()==0){
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
			var viewType = "url";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp3").val()==1){
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
			var viewType = "url";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp3").val()==2){
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
			var viewType = "url";
			var clientDevice = "mobile";
			var visitor = "old";
		}
		
		var method = "source/link/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.sum[0][0]);
					$("#b").html(data.data.body.data[0].result.sum[0][1]);
					$("#c").html(data.data.body.data[0].result.sum[0][2]);
					if(data.data.body.data[0].result.sum[0][3]=='--'){
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.sum[0][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#e").html(time);
		            
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
 });