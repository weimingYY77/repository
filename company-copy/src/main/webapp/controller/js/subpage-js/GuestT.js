$(function(){
	
	if(window.sessionStorage.getItem("siteId")==null){
		var siteId = 10512893;
	}else{
		var siteId = window.sessionStorage.getItem("siteId");
	}
	
	var mapValue = 0;
	var mapValue1 = 0;
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

	
	//第一次
	 first();
	 
	 function first(){
		 	$("#main_map3").hide();
		//新访客
	 		var method = "source/all/a";
	 		var visitor = "new"
	 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#g").html(data.data.body.data[0].result.sum[0][0]);
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#i").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#i").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
						$("#j").html(data.data.body.data[0].result.sum[0][8]);
						$("#k").html(data.data.body.data[0].result.sum[0][9]);
						
					 	var time = parseInt(data.data.body.data[0].result.sum[0][8]);
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
			            
			            $("#j").html(time);
			            
			            var tbody1 = document.getElementById("trend2");  
				  		var str1 = "";
				  		str1+="<td>1&nbsp;&nbsp;&nbsp;新访客</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==0){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==4){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==6){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==7){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==8){
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
			
			//老访客
	 		var method = "source/all/a";
	 		var visitor = "old"
	 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#l").html(data.data.body.data[0].result.sum[0][5]);
						$("#m").html(data.data.body.data[0].result.sum[0][0]);
						$("#n").html(data.data.body.data[0].result.sum[0][3]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#o").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#o").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
						$("#p").html(data.data.body.data[0].result.sum[0][8]);
						$("#q").html(data.data.body.data[0].result.sum[0][9]);
						
						var time = parseInt(data.data.body.data[0].result.sum[0][8]);
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
			            $("#p").html(time);
			            
			            var tbody1 = document.getElementById("trend2");  
				  		var str1 = "";
				  		str1+="<td>2&nbsp;&nbsp;&nbsp;老访客</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==0){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==4){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==6){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==7){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==8){
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
			
			//新老访客占比
	 		var method = "source/all/a";
	 		var visitor ="";
	 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][5]=='--'){
							$("#f").html("0%");
						}else{
							$("#f").html(data.data.body.data[0].result.sum[0][5]+"%");
						}
						var l = (100 -  parseFloat(data.data.body.data[0].result.sum[0][5])).toFixed(2);
						$("#l").html(l+"%");
						if(isNaN(l)){
							$("#l").html("0%");
				        }
						
						  var tbody1 = document.getElementById("trend2");  
					  		var str1 = "";
					  		str1+="<td>当前汇总</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==0){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==4){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==6){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==7){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else if(a==8){
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
			
			//展示内容
	 		var method = "source/engine/a";
	 		var source = "search,0";
	 		var visitor = "new";
	 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("word");  
				  			var str = "";
				  			str+="<td>"+s+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
	 		var method = "source/engine/a";
	 		var source = "search,0";
	 		var visitor = "old";
	 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("word1");  
				  			var str = "";
				  			str+="<td>"+s+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
	 		var method = "visit/toppage/a";
	 		var source = "";
	 		var visitor = "new";
	 		var metrics = "visit1_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
							if(data.data.body.data[0].result.items[1][a][0]!=0){
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("word2");  
					  			var str = "";
					  			str+="<td>"+s+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
							}
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
	 		var method = "visit/toppage/a";
	 		var source = "";
	 		var visitor = "old";
	 		var metrics = "visit1_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
							if(data.data.body.data[0].result.items[1][a][0]!=0){
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("word3");  
					  			var str = "";
					  			str+="<td>"+s+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
							}
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
			//系统环境
		 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
		 	var method = "source/all/a";
		 	var clientDeviceO = "pc";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][0]==0){
							
						}else{
							mapValue = data.data.body.data[0].result.sum[0][0];
						} 
					}
					
					var tbody1 = document.getElementById("trend3");  
			  		var str1 = "";
			  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机端浏览器</td>";
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
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//系统环境
		 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
		 	var method = "source/all/a";
		 	var clientDeviceO = "mobile";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][0]==0){
							
						}else{
							mapValue1 = data.data.body.data[0].result.sum[0][0];
						} 
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;移动端浏览器</td>";
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

			
			
		    // 路径配置
		    require.config({
		        paths: {
		            echarts: 'http://echarts.baidu.com/build/dist'
		        }
		    });
		    // 使用
		    require(
		            [
		                'echarts',
		                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
		                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
		                'echarts/chart/pie'
		            ],
		            function (ec) {
		                // 基于准备好的dom，初始化echarts图表
		                var myChart_map2 = ec.init(document.getElementById('main_map2'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_bin = {
						    color: ['#3398DB'],
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis : [
						        {
						            type : 'category',
						            data : ['计算机端浏览器', '移动端浏览器'],
						            axisTick: {
						                alignWithLabel: true
						            },
						             axisLine:{  
		                                lineStyle:{  
		                                    color:'#cccccc',  
		                                    width:0.1,//这里是为了突出显示加上的  
		                                }  
		                            }  
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value',
						            axisLine:{  
		                                lineStyle:{  
		                                    color:'#cccccc',  
		                                    width:1,//这里是为了突出显示加上的  
		                                }  
		                            }  
						        }
						    ],
						    series : [
						        {
						            name:'浏览量(PV)',
						            type:'bar',
						            barWidth: '10',
						            data:[mapValue, mapValue1]
						        }
						    ]
						};

		                // 为echarts对象加载数据
		                myChart_map2.setOption(option_bin);
		    });
			
	 }
	 
	 //今天
	 $("#todayT").click(function(){
		 $("#trend2").empty();
		 $("#word").empty();
		 $("#word1").empty();
		 $("#word2").empty();
		 $("#word3").empty();
			//新访客
		 		var method = "source/all/a";
		 		var visitor = "new"
		 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#g").html(data.data.body.data[0].result.sum[0][0]);
							$("#h").html(data.data.body.data[0].result.sum[0][4]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#i").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#i").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
							$("#j").html(data.data.body.data[0].result.sum[0][8]);
							$("#k").html(data.data.body.data[0].result.sum[0][9]);
							
						 	var time = parseInt(data.data.body.data[0].result.sum[0][8]);
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
				            
				            $("#j").html(time);
				            
				            var tbody1 = document.getElementById("trend2");  
					  		var str1 = "";
					  		str1+="<td>1&nbsp;&nbsp;&nbsp;新访客</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==0){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==4){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==6){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==7){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else if(a==8){
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
				
				//老访客
		 		var method = "source/all/a";
		 		var visitor = "old"
		 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#l").html(data.data.body.data[0].result.sum[0][5]);
							$("#m").html(data.data.body.data[0].result.sum[0][0]);
							$("#n").html(data.data.body.data[0].result.sum[0][3]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#o").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#o").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
							$("#p").html(data.data.body.data[0].result.sum[0][8]);
							$("#q").html(data.data.body.data[0].result.sum[0][9]);
							
							var time = parseInt(data.data.body.data[0].result.sum[0][8]);
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
				            $("#p").html(time);
				            
				            var tbody1 = document.getElementById("trend2");  
					  		var str1 = "";
					  		str1+="<td>2&nbsp;&nbsp;&nbsp;老访客</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==0){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==4){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==6){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==7){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else if(a==8){
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
				
				//新老访客占比
		 		var method = "source/all/a";
		 		var visitor ="";
		 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][5]=='--'){
								$("#f").html("0%");
							}else{
								$("#f").html(data.data.body.data[0].result.sum[0][5]+"%");
							}
							var l = (100 -  parseFloat(data.data.body.data[0].result.sum[0][5])).toFixed(2);
							$("#l").html(l+"%");
							if(isNaN(l)){
								$("#l").html("0%");
					        }
							
							  var tbody1 = document.getElementById("trend2");  
						  		var str1 = "";
						  		str1+="<td>当前汇总</td>";
								for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
						        {  
									if(a==0){
										str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
									}else if(a==4){
										str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
									}else if(a==6){
										str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
									}else if(a==7){
										if(data.data.body.data[0].result.sum[0][a]=='--'){
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
					  					}else{
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
					  					}
									}else if(a==8){
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
				
				//展示内容
		 		var method = "source/engine/a";
		 		var source = "search,0";
		 		var visitor = "new";
		 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
		 		$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var leng = data.data.body.data[0].result.items[0].length;
							if(parseInt(leng)>=5){
								leng = 5;
							}
							for (var a = 0; a < leng; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("word");  
					  			var str = "";
					  			str+="<td>"+s+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
					        } 
							
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 		
		 		var method = "source/engine/a";
		 		var source = "search,0";
		 		var visitor = "old";
		 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
		 		$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var leng = data.data.body.data[0].result.items[0].length;
							if(parseInt(leng)>=5){
								leng = 5;
							}
							for (var a = 0; a < leng; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("word1");  
					  			var str = "";
					  			str+="<td>"+s+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
					        } 
							
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 		
		 		var method = "visit/toppage/a";
		 		var source = "";
		 		var visitor = "new";
		 		var metrics = "visit1_count";
		 		$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var leng = data.data.body.data[0].result.items[0].length;
							if(parseInt(leng)>=5){
								leng = 5;
							}
							for (var a = 0; a < leng; a++)  
					        {  
								if(data.data.body.data[0].result.items[1][a][0]!=0){
						           //获取tbody  
						            var s= a+1;
						            var tbody = document.getElementById("word2");  
						  			var str = "";
						  			str+="<td>"+s+"</td>";
						  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
						  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
						  			var newchild = document.createElement("tr");
						  			newchild.innerHTML = str;
						  			tbody.appendChild(newchild);
								}
					        } 
							
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
		 		
		 		var method = "visit/toppage/a";
		 		var source = "";
		 		var visitor = "old";
		 		var metrics = "visit1_count";
		 		$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var leng = data.data.body.data[0].result.items[0].length;
							if(parseInt(leng)>=5){
								leng = 5;
							}
							for (var a = 0; a < leng; a++)  
					        {  
								if(data.data.body.data[0].result.items[1][a][0]!=0){
						           //获取tbody  
						            var s= a+1;
						            var tbody = document.getElementById("word3");  
						  			var str = "";
						  			str+="<td>"+s+"</td>";
						  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
						  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
						  			var newchild = document.createElement("tr");
						  			newchild.innerHTML = str;
						  			tbody.appendChild(newchild);
								}
					        } 
							
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
	 });
	 
	 //昨天
	 $("#yesterdayT").click(function(){
		 $("#trend2").empty();
		 $("#word").empty();
		 $("#word1").empty();
		 $("#word2").empty();
		 $("#word3").empty();
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
			
			//新访客
	 		var method = "source/all/a";
	 		var visitor = "new"
	 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#g").html(data.data.body.data[0].result.sum[0][0]);
						$("#h").html(data.data.body.data[0].result.sum[0][4]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#i").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#i").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
						$("#j").html(data.data.body.data[0].result.sum[0][8]);
						$("#k").html(data.data.body.data[0].result.sum[0][9]);
						
					 	var time = parseInt(data.data.body.data[0].result.sum[0][8]);
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
			            
			            $("#j").html(time);
			            
			            var tbody1 = document.getElementById("trend2");  
				  		var str1 = "";
				  		str1+="<td>1&nbsp;&nbsp;&nbsp;新访客</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==0){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==4){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==6){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==7){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==8){
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
			
			//老访客
	 		var method = "source/all/a";
	 		var visitor = "old"
	 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#l").html(data.data.body.data[0].result.sum[0][5]);
						$("#m").html(data.data.body.data[0].result.sum[0][0]);
						$("#n").html(data.data.body.data[0].result.sum[0][3]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#o").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#o").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
						$("#p").html(data.data.body.data[0].result.sum[0][8]);
						$("#q").html(data.data.body.data[0].result.sum[0][9]);
						
						var time = parseInt(data.data.body.data[0].result.sum[0][8]);
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
			            $("#p").html(time);
			            
			            var tbody1 = document.getElementById("trend2");  
				  		var str1 = "";
				  		str1+="<td>2&nbsp;&nbsp;&nbsp;老访客</td>";
						for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
				        {  
							if(a==0){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==4){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==6){
								str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
							}else if(a==7){
								if(data.data.body.data[0].result.sum[0][a]=='--'){
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
			  					}
							}else if(a==8){
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
			
			//新老访客占比
	 		var method = "source/all/a";
	 		var visitor ="";
	 		var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][5]=='--'){
							$("#f").html("0%");
						}else{
							$("#f").html(data.data.body.data[0].result.sum[0][5]+"%");
						}
						var l = (100 -  parseFloat(data.data.body.data[0].result.sum[0][5])).toFixed(2);
						$("#l").html(l+"%");
						if(isNaN(l)){
							$("#l").html("0%");
				        }
						
						  var tbody1 = document.getElementById("trend2");  
					  		var str1 = "";
					  		str1+="<td>当前汇总</td>";
							for (var a = 0; a < data.data.body.data[0].result.sum[0].length; a++)  
					        {  
								if(a==0){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==4){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==6){
									str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
								}else if(a==7){
									if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
								}else if(a==8){
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
			
			//展示内容
	 		var method = "source/engine/a";
	 		var source = "search,0";
	 		var visitor = "new";
	 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("word");  
				  			var str = "";
				  			str+="<td>"+s+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
	 		var method = "source/engine/a";
	 		var source = "search,0";
	 		var visitor = "old";
	 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("word1");  
				  			var str = "";
				  			str+="<td>"+s+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
				  			var newchild = document.createElement("tr");
				  			newchild.innerHTML = str;
				  			tbody.appendChild(newchild);
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
	 		var method = "visit/toppage/a";
	 		var source = "";
	 		var visitor = "new";
	 		var metrics = "visit1_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
							if(data.data.body.data[0].result.items[1][a][0]!=0){
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("word2");  
					  			var str = "";
					  			str+="<td>"+s+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
							}
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
	 		
	 		var method = "visit/toppage/a";
	 		var source = "";
	 		var visitor = "old";
	 		var metrics = "visit1_count";
	 		$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"source":source},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var leng = data.data.body.data[0].result.items[0].length;
						if(parseInt(leng)>=5){
							leng = 5;
						}
						for (var a = 0; a < leng; a++)  
				        {  
							if(data.data.body.data[0].result.items[1][a][0]!=0){
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("word3");  
					  			var str = "";
					  			str+="<td>"+s+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			str+="<td>"+data.data.body.data[0].result.items[1][a][0]+"</td>"
					  			var newchild = document.createElement("tr");
					  			newchild.innerHTML = str;
					  			tbody.appendChild(newchild);
							}
				        } 
						
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});	
	 });
	 
	 //系统环境今天
	 $("#todayO").click(function(){
		 $("#trend3").empty();
		 $("#temp4").val(0);
		 var mapValue = 0;
		 var mapValue1 = 0;
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
		 
		 	var method = "source/all/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						  $("#r").html(data.data.body.data[0].result.sum[0][0]);
							$("#s").html(data.data.body.data[0].result.sum[0][1]);
							$("#t").html(data.data.body.data[0].result.sum[0][2]);
							if(data.data.body.data[0].result.sum[0][3]=='--'){
								$("#u").html(data.data.body.data[0].result.sum[0][3]);
							}else{
								$("#u").html(data.data.body.data[0].result.sum[0][3]+"%");
							}
							$("#v").html(data.data.body.data[0].result.sum[0][4]);
						
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
				            $("#v").html(time);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
		 if($("#temp5").val()==0){
			 $("#main_map2").show();
			 $("#main_map3").hide();
			//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "pc";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue = data.data.body.data[0].result.sum[0][0];
							} 
						}
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机端浏览器</td>";
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
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
				//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "mobile";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue1 = data.data.body.data[0].result.sum[0][0];
							} 
							
							var tbody1 = document.getElementById("trend3");  
					  		var str1 = "";
					  		str1+="<td>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;移动端浏览器</td>";
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

				
				
			    // 路径配置
			    require.config({
			        paths: {
			            echarts: 'http://echarts.baidu.com/build/dist'
			        }
			    });
			    // 使用
			    require(
			            [
			                'echarts',
			                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/pie'
			            ],
			            function (ec) {
			                // 基于准备好的dom，初始化echarts图表
			                var myChart_map2 = ec.init(document.getElementById('main_map2'));

			                var itemStyle = {
			                    normal:{label:{
			                        show:true,
			                        formatter:'{b}',
			                        textStyle: {fontSize: 10,fontWeight : 'bold'}
			                    }},
			                    emphasis:{label:{show:true}}
			                };
			                var option_bin = {
							    color: ['#3398DB'],
							    tooltip : {
							        trigger: 'axis',
							        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							        }
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis : [
							        {
							            type : 'category',
							            data : ['计算机端浏览器', '移动端浏览器'],
							            axisTick: {
							                alignWithLabel: true
							            },
							             axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:0.1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							    ],
							    yAxis : [
							        {
							            type : 'value',
							            axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							    ],
							    series : [
							        {
							            name:'浏览量(PV)',
							            type:'bar',
							            barWidth: '10',
							            data:[mapValue, mapValue1]
							        }
							    ]
							};

			                // 为echarts对象加载数据
			                myChart_map2.setOption(option_bin);
			    });
		 }else if($("#temp5").val()==1){
			 $("#main_map2").hide();
			 $("#main_map3").show();
			//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "pc";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue = data.data.body.data[0].result.sum[0][0];
							} 
						}
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机</td>";
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
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
				//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "mobile";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue1 = data.data.body.data[0].result.sum[0][0];
							} 
							
							var tbody1 = document.getElementById("trend3");  
					  		var str1 = "";
					  		str1+="<td>2&nbsp;&nbsp;移动设备</td>";
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
				
			    // 路径配置
			    require.config({
			        paths: {
			            echarts: 'http://echarts.baidu.com/build/dist'
			        }
			    });
			    // 使用
			    require(
			            [
			                'echarts',
			                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/pie'
			            ],
			            function (ec) {
			                // 基于准备好的dom，初始化echarts图表
			                var myChart_map3 = ec.init(document.getElementById('main_map3'));

			                var itemStyle = {
			                    normal:{label:{
			                        show:true,
			                        formatter:'{b}',
			                        textStyle: {fontSize: 10,fontWeight : 'bold'}
			                    }},
			                    emphasis:{label:{show:true}}
			                };
			                var option_bin = {
							    color: ['#3398DB'],
							    tooltip : {
							        trigger: 'axis',
							        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							        }
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis : [
							        {
							            type : 'category',
							            data : ['计算机', '移动设备'],
							            axisTick: {
							                alignWithLabel: true
							            },
							             axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:0.1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							    ],
							    yAxis : [
							        {
							            type : 'value',
							            axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							        
							    ],
							    series : [
							        {
							            name:'浏览量(PV)',
							            type:'bar',
							            barWidth: '10',
							            data:[mapValue, mapValue1]
							        }
							    ]
							};

			                // 为echarts对象加载数据
			                myChart_map3.setOption(option_bin);
			            });
		 }
		
	 });
	 
	 //系统环境昨天
	 $("#yesterdayO").click(function(){
		 var mapValue = 0;
		 var mapValue1 = 0;
		 $("#trend3").empty();
		 $("#temp4").val(1);
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
		
			var method = "source/all/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						  $("#r").html(data.data.body.data[0].result.sum[0][0]);
							$("#s").html(data.data.body.data[0].result.sum[0][1]);
							$("#t").html(data.data.body.data[0].result.sum[0][2]);
							if(data.data.body.data[0].result.sum[0][3]=='--'){
								$("#u").html(data.data.body.data[0].result.sum[0][3]);
							}else{
								$("#u").html(data.data.body.data[0].result.sum[0][3]+"%");
							}
							$("#v").html(data.data.body.data[0].result.sum[0][4]);
						
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
				            $("#v").html(time);
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
		 if($("#temp5").val()==0){
			 $("#main_map2").show();
			 $("#main_map3").hide();
			//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "pc";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue = data.data.body.data[0].result.sum[0][0];
							} 
						}
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机端浏览器</td>";
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
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
				//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "mobile";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue1 = data.data.body.data[0].result.sum[0][0];
							} 
							
							var tbody1 = document.getElementById("trend3");  
					  		var str1 = "";
					  		str1+="<td>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;移动端浏览器</td>";
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

				
				
			    // 路径配置
			    require.config({
			        paths: {
			            echarts: 'http://echarts.baidu.com/build/dist'
			        }
			    });
			    // 使用
			    require(
			            [
			                'echarts',
			                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/pie'
			            ],
			            function (ec) {
			                // 基于准备好的dom，初始化echarts图表
			                var myChart_map2 = ec.init(document.getElementById('main_map2'));

			                var itemStyle = {
			                    normal:{label:{
			                        show:true,
			                        formatter:'{b}',
			                        textStyle: {fontSize: 10,fontWeight : 'bold'}
			                    }},
			                    emphasis:{label:{show:true}}
			                };
			                var option_bin = {
							    color: ['#3398DB'],
							    tooltip : {
							        trigger: 'axis',
							        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							        }
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis : [
							        {
							            type : 'category',
							            data : ['计算机端浏览器', '移动端浏览器'],
							            axisTick: {
							                alignWithLabel: true
							            },
							             axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:0.1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							    ],
							    yAxis : [
							        {
							            type : 'value',
							            axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							    ],
							    series : [
							        {
							            name:'浏览量(PV)',
							            type:'bar',
							            barWidth: '10',
							            data:[mapValue, mapValue1]
							        }
							    ]
							};

			                // 为echarts对象加载数据
			                myChart_map2.setOption(option_bin);
			    });
		 }else if($("#temp5").val()==1){
			 $("#main_map3").show();
			 $("#main_map2").hide();
			//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "pc";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue = data.data.body.data[0].result.sum[0][0];
							} 
						}
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机</td>";
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
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
				//系统环境
			 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			 	var method = "source/all/a";
			 	var clientDeviceO = "mobile";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							if(data.data.body.data[0].result.sum[0][0]==0){
								
							}else{
								mapValue1 = data.data.body.data[0].result.sum[0][0];
							} 
							
							var tbody1 = document.getElementById("trend3");  
					  		var str1 = "";
					  		str1+="<td>2&nbsp;&nbsp;移动设备</td>";
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
				
			    // 路径配置
			    require.config({
			        paths: {
			            echarts: 'http://echarts.baidu.com/build/dist'
			        }
			    });
			    // 使用
			    require(
			            [
			                'echarts',
			                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
			                'echarts/chart/pie'
			            ],
			            function (ec) {
			                // 基于准备好的dom，初始化echarts图表
			                var myChart_map3 = ec.init(document.getElementById('main_map3'));

			                var itemStyle = {
			                    normal:{label:{
			                        show:true,
			                        formatter:'{b}',
			                        textStyle: {fontSize: 10,fontWeight : 'bold'}
			                    }},
			                    emphasis:{label:{show:true}}
			                };
			                var option_bin = {
							    color: ['#3398DB'],
							    tooltip : {
							        trigger: 'axis',
							        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							        }
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis : [
							        {
							            type : 'category',
							            data : ['计算机', '移动设备'],
							            axisTick: {
							                alignWithLabel: true
							            },
							             axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:0.1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							    ],
							    yAxis : [
							        {
							            type : 'value',
							            axisLine:{  
			                                lineStyle:{  
			                                    color:'#cccccc',  
			                                    width:1,//这里是为了突出显示加上的  
			                                }  
			                            }  
							        }
							        
							    ],
							    series : [
							        {
							            name:'浏览量(PV)',
							            type:'bar',
							            barWidth: '10',
							            data:[mapValue, mapValue1]
							        }
							    ]
							};

			                // 为echarts对象加载数据
			                myChart_map3.setOption(option_bin);
			            });
		 }
	 });
	 
	 //系统环境浏览器
	 $("#browser").click(function(){
		 $("#trend3").empty();
		 $("#temp5").val(0);
		 $("#main_map3").hide();
		 $("#main_map2").show();
		 if($("#temp4").val()==0){
				
		}else if($("#temp4").val()==1){
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
		//系统环境
		 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
		 	var method = "source/all/a";
		 	var clientDeviceO = "pc";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][0]==0){
							
						}else{
							mapValue = data.data.body.data[0].result.sum[0][0];
						} 
					}
					
					var tbody1 = document.getElementById("trend3");  
			  		var str1 = "";
			  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机端浏览器</td>";
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
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//系统环境
		 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
		 	var method = "source/all/a";
		 	var clientDeviceO = "mobile";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][0]==0){
							
						}else{
							mapValue1 = data.data.body.data[0].result.sum[0][0];
						} 
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;移动端浏览器</td>";
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

			
			  // 路径配置
		    require.config({
		        paths: {
		            echarts: 'http://echarts.baidu.com/build/dist'
		        }
		    });
		    // 使用
		    require(
		            [
		                'echarts',
		                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
		                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
		                'echarts/chart/pie'
		            ],
		            function (ec) {
		                // 基于准备好的dom，初始化echarts图表
		                var myChart_map2 = ec.init(document.getElementById('main_map2'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_bin = {
						    color: ['#3398DB'],
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis : [
						        {
						            type : 'category',
						            data : ['计算机端浏览器', '移动端浏览器'],
						            axisTick: {
						                alignWithLabel: true
						            },
						             axisLine:{  
		                                lineStyle:{  
		                                    color:'#cccccc',  
		                                    width:0.1,//这里是为了突出显示加上的  
		                                }  
		                            }  
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value',
						            axisLine:{  
		                                lineStyle:{  
		                                    color:'#cccccc',  
		                                    width:1,//这里是为了突出显示加上的  
		                                }  
		                            }  
						        }
						    ],
						    series : [
						        {
						            name:'浏览量(PV)',
						            type:'bar',
						            barWidth: '10',
						            data:[mapValue, mapValue1]
						        }
						    ]
						};

		                // 为echarts对象加载数据
		                myChart_map2.setOption(option_bin);
		    });
	 });
	 
	 //网络设备
	 $("#devices").click(function(){
		 $("#trend3").empty();
		 $("#temp5").val(1);
		 $("#main_map2").hide();
		 $("#main_map3").show();
		 if($("#temp4").val()==0){
				
		}else if($("#temp4").val()==1){
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
		 
		//系统环境
		 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
		 	var method = "source/all/a";
		 	var clientDeviceO = "pc";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][0]==0){
							
						}else{
							mapValue = data.data.body.data[0].result.sum[0][0];
						} 
					}
					
					var tbody1 = document.getElementById("trend3");  
			  		var str1 = "";
			  		str1+="<td>1&nbsp;&nbsp;&nbsp;计算机</td>";
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
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//系统环境
		 	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
		 	var method = "source/all/a";
		 	var clientDeviceO = "mobile";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"clientDevice":clientDeviceO},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						if(data.data.body.data[0].result.sum[0][0]==0){
							
						}else{
							mapValue1 = data.data.body.data[0].result.sum[0][0];
						} 
						
						var tbody1 = document.getElementById("trend3");  
				  		var str1 = "";
				  		str1+="<td>2&nbsp;&nbsp;移动设备</td>";
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
			
		    // 路径配置
		    require.config({
		        paths: {
		            echarts: 'http://echarts.baidu.com/build/dist'
		        }
		    });
		    // 使用
		    require(
		            [
		                'echarts',
		                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
		                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
		                'echarts/chart/pie'
		            ],
		            function (ec) {
		                // 基于准备好的dom，初始化echarts图表
		                var myChart_map3 = ec.init(document.getElementById('main_map3'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_bin = {
						    color: ['#3398DB'],
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis : [
						        {
						            type : 'category',
						            data : ['计算机', '移动设备'],
						            axisTick: {
						                alignWithLabel: true
						            },
						             axisLine:{  
		                                lineStyle:{  
		                                    color:'#cccccc',  
		                                    width:0.1,//这里是为了突出显示加上的  
		                                }  
		                            }  
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value',
						            axisLine:{  
		                                lineStyle:{  
		                                    color:'#cccccc',  
		                                    width:1,//这里是为了突出显示加上的  
		                                }  
		                            }  
						        }
						        
						    ],
						    series : [
						        {
						            name:'浏览量(PV)',
						            type:'bar',
						            barWidth: '10',
						            data:[mapValue, mapValue1]
						        }
						    ]
						};

		                // 为echarts对象加载数据
		                myChart_map3.setOption(option_bin);
		            });
	 });
 });