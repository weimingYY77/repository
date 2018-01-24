$(function(){
	if(window.sessionStorage.getItem("siteId")==null){
		var siteId = 10512893;
	}else{
		var siteId = window.sessionStorage.getItem("siteId");
	}
	
	var hour = new Array();
	var hours = new Array();
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
	
	//第一次
	 first();
	 
	function first(){
		
		var method = "overview/getTimeTrendRpt";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":start_date,"end_date":end_date,"metrics":metrics},
			dataType : "json",
			async : true,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					$("#a").html(data.data.body.data[0].result.items[1][1][0]);
					$("#b").html(data.data.body.data[0].result.items[1][1][1]);
					$("#c").html(data.data.body.data[0].result.items[1][1][2]);
					if(data.data.body.data[0].result.items[1][1][3]=='--'){
						$("#d").html(data.data.body.data[0].result.items[1][1][3]);
					}else{
						$("#d").html(data.data.body.data[0].result.items[1][1][3]+"%");
					}
					$("#e").html(data.data.body.data[0].result.items[1][1][4]);
					$("#f").html(data.data.body.data[0].result.items[1][1][5]);
					$("#g").html(data.data.body.data[0].result.items[1][0][0]);
					$("#h").html(data.data.body.data[0].result.items[1][0][1]);
					$("#i").html(data.data.body.data[0].result.items[1][0][2]);
					if(data.data.body.data[0].result.items[1][0][3]=='--'){
						$("#j").html(data.data.body.data[0].result.items[1][0][3]);
					}else{
						$("#j").html(data.data.body.data[0].result.items[1][0][3]+"%");
					}
					$("#k").html(data.data.body.data[0].result.items[1][0][4]);
					$("#l").html(data.data.body.data[0].result.items[1][0][5]);
				
				
					var time = parseInt(data.data.body.data[0].result.items[1][1][4]);
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
		            
		            var time = parseInt(data.data.body.data[0].result.items[1][0][4]);
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
		            
		            $("#k").html(time);
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
 		//展示内容
 		var method = "overview/getCommonTrackRpt";
 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
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
					//搜索词
					for (var a = 0; a < data.data.body.data[0].result.word.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.word.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.word.items[a][b]+"%</p> </div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.word.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
					
					//来源网站
					for (var a = 0; a < data.data.body.data[0].result.sourceSite.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word1");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.sourceSite.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.sourceSite.items[a][b]+"%</p> </div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.sourceSite.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
					
					//入口页面
					for (var a = 0; a < data.data.body.data[0].result.landingPage.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word2");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.landingPage.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.landingPage.items[a][b]+"%</p> </div>";
			  				}else if(b==0){
			  					str+="<div class='item-a"+b+"'><a href='#'><p>"+data.data.body.data[0].result.landingPage.items[a][b]+"</p></a></div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.landingPage.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
					
					//受访页面
					for (var a = 0; a < data.data.body.data[0].result.visitPage.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word3");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.visitPage.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.visitPage.items[a][b]+"%</p> </div>";
			  				}else if(b==0){
			  					str+="<div class='item-a"+b+"'><a href='#'><p>"+data.data.body.data[0].result.visitPage.items[a][b]+"</p></a></div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.visitPage.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
 		
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
					$("#v").html(data.data.body.data[0].result.sum[0][0]);
					$("#w").html(data.data.body.data[0].result.sum[0][4]);
					if(data.data.body.data[0].result.sum[0][7]=='--'){
						$("#x").html(data.data.body.data[0].result.sum[0][7]);
					}else{
						$("#x").html(data.data.body.data[0].result.sum[0][7]+"%");
					}
					$("#y").html(data.data.body.data[0].result.sum[0][8]);
					$("#z").html(data.data.body.data[0].result.sum[0][9]);
					
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
		            
		            $("#y").html(time);
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
					$("#aa").html(data.data.body.data[0].result.sum[0][0]);
					$("#bb").html(data.data.body.data[0].result.sum[0][3]);
					if(data.data.body.data[0].result.sum[0][7]=='--'){
						$("#cc").html(data.data.body.data[0].result.sum[0][7]);
					}else{
						$("#cc").html(data.data.body.data[0].result.sum[0][7]+"%");
					}
					$("#dd").html(data.data.body.data[0].result.sum[0][8]);
					$("#ee").html(data.data.body.data[0].result.sum[0][9]);
					
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
		            $("#dd").html(time);
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
						$("#t").html("0%");
					}else{
						$("#t").html(data.data.body.data[0].result.sum[0][5]+"%");
					}
					var u = (100 -  parseFloat(data.data.body.data[0].result.sum[0][5])).toFixed(2);
					$("#u").html(u+"%");
					if(isNaN(u)){
						$("#u").html("0%");
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
		//昨天曲线图
 		var method = "trend/time/a";
 		var metrics = "pv_count";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":start_date,"end_date":start_date,"metrics":metrics},
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					var HH = 23;
					var ss = 23;
					for(var a = 0; a <= HH; a++){
						hour[a] = data.data.body.data[0].result.items[1][ss][0];
						if(max<hour[a]){
							max=hour[a];
						}
						if(hour[a]=='--'){
							hour[a] = 0;
						}
						ss--;
					}
					
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
		//今天曲线图
 		var method = "trend/time/a";
 		var metrics = "pv_count";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					var myDate = new Date();
					var HH = parseInt(myDate.getHours());
					var ss = parseInt(myDate.getHours());
				
					for(var a = 0; a <= HH; a++){
						hours[a] = data.data.body.data[0].result.items[1][ss][0];
						if(max<hours[a]){
							max=hours[a];
						}
						if(hours[a]=='--'){
							hours[a] = 0;
						}
						ss--;
					}
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		

	    var myChart10 = echarts.init(document.getElementById('earch'));
	    // option 里面的内容基本涵盖你要画的图表的所有内容
	    var option_ten = {
	    tooltip : {
	        trigger: 'axis'
	    },
	     legend: {
	       x: 'center',
	       y:'bottom',
	       data:["今天","昨天"]
	   },
	    calculable : true,
	    xAxis: [{
	            axisLabel: {
	                interval: 0
	            },
	            axisLine: {

	                lineStyle: {
	                    color: '#646464'                
	                }
	            },
	            axisTick:{
	               show:false
	             },
	            type: 'category',
	            boundaryGap: false,
	            data:[0,'','',3,'','',6,'','',9,'','',12,'','',15,'','',18,'','',21,'',''],
	            axisLabel:{
	                 //X轴刻度配置
	                 interval:0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
	            }
	        }],
	        yAxis: [{
	            min:0,
	            max:max,
	            type: 'value',
	            axisLine: {
	                lineStyle: {
	                    width: 0
	                }
	            },
	            axisTick:{
	               show:false
	             }
	        }],
	        series: [
	        {
	            name: '今天',
	            type: 'line',
	            symbol:'circle',/*折点样式*/
	            symbolSize: 5,
	             color: ['#4fa8f9'],
	            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
	        },
	        {
	            name: '昨天',
	            type: 'line',
	            symbol:'circle',/*折点样式*/
	            symbolSize: 5,
	            color: ['#6ec71e'],
	            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
	        }
	      ]
	    };  
	    myChart10.setOption(option_ten);
	}
	
		
		//今天
		$("#today").click(function(){
		$("#word").empty();
		$("#word1").empty();
		$("#word2").empty();
		$("#word3").empty();
		var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
		var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
    	var max = 2;
		//展示内容
 		var method = "overview/getCommonTrackRpt";
 		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
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
					//搜索词
					for (var a = 0; a < data.data.body.data[0].result.word.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.word.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.word.items[a][b]+"%</p> </div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.word.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
					
					//来源网站
					for (var a = 0; a < data.data.body.data[0].result.sourceSite.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word1");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.sourceSite.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.sourceSite.items[a][b]+"%</p> </div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.sourceSite.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
					
					//入口页面
					for (var a = 0; a < data.data.body.data[0].result.landingPage.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word2");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.landingPage.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.landingPage.items[a][b]+"%</p> </div>";
			  				}else if(b==0){
			  					str+="<div class='item-a"+b+"'><a href='#'><p>"+data.data.body.data[0].result.landingPage.items[a][b]+"</p></a></div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.landingPage.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
					
					//受访页面
					for (var a = 0; a < data.data.body.data[0].result.visitPage.items.length; a++)  
			        {  
			           //获取div  
			            var div = document.getElementById("word3");  
			  			var str = "";
			  			str+="<div class='main-item3'>";
			  			for(var b = 0; b < data.data.body.data[0].result.visitPage.items[a].length; b++){
			  				if(b==2){
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.visitPage.items[a][b]+"%</p> </div>";
			  				}else if(b==0){
			  					str+="<div class='item-a"+b+"'><a href='#'><p>"+data.data.body.data[0].result.visitPage.items[a][b]+"</p></a></div>";
			  				}else{
			  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.visitPage.items[a][b]+"</p> </div>";
			  				}
			  			}
			  			str+="</div>";
			  			var newchild = document.createElement("div");
			  			newchild.innerHTML = str;
			            div.appendChild(newchild);

			        }  
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
 		
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
					$("#v").html(data.data.body.data[0].result.sum[0][0]);
					$("#w").html(data.data.body.data[0].result.sum[0][4]);
					if(data.data.body.data[0].result.sum[0][7]=='--'){
						$("#x").html(data.data.body.data[0].result.sum[0][7]);
					}else{
						$("#x").html(data.data.body.data[0].result.sum[0][7]+"%");
					}
					$("#y").html(data.data.body.data[0].result.sum[0][8]);
					$("#z").html(data.data.body.data[0].result.sum[0][9]);
					
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
		            
		            $("#y").html(time);
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
					$("#aa").html(data.data.body.data[0].result.sum[0][0]);
					$("#bb").html(data.data.body.data[0].result.sum[0][3]);
					if(data.data.body.data[0].result.sum[0][7]=='--'){
						$("#cc").html(data.data.body.data[0].result.sum[0][7]);
					}else{
						$("#cc").html(data.data.body.data[0].result.sum[0][7]+"%");
					}
					$("#dd").html(data.data.body.data[0].result.sum[0][8]);
					$("#ee").html(data.data.body.data[0].result.sum[0][9]);
					
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
		            $("#dd").html(time);
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
						$("#t").html("0%");
					}else{
						$("#t").html(data.data.body.data[0].result.sum[0][5]+"%");
					}
					var u = (100 -  parseFloat(data.data.body.data[0].result.sum[0][5])).toFixed(2);
					$("#u").html(u+"%");
					if(isNaN(u)){
						$("#u").html("0%");
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
		//昨天曲线图
 		var method = "trend/time/a";
 		var metrics = "pv_count";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":start_date,"end_date":start_date,"metrics":metrics},
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					var HH = 23;
					var ss = 23;
					for(var a = 0; a <= HH; a++){
						hour[a] = data.data.body.data[0].result.items[1][ss][0];
						if(max<hour[a]){
							max=hour[a];
						}
						if(hour[a]=='--'){
							hour[a] = 0;
						}
						ss--;
					}
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
		//今天曲线图
 		var method = "trend/time/a";
 		var metrics = "pv_count";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics},
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.code==0010) {
					alert(data.msg);
				}else if(data.code==0000){
					var myDate = new Date();
					var HH = parseInt(myDate.getHours());
					var ss = parseInt(myDate.getHours());
					
					for(var a = 0; a <= HH; a++){
						hours[a] = data.data.body.data[0].result.items[1][ss][0];
						if(max<hours[a]){
							max=hour[a];
						}
						if(hours[a]=='--'){
							hours[a] = 0;
						}
						ss--;
					}
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
	    var myChart10 = echarts.init(document.getElementById('earch'));
	    // option 里面的内容基本涵盖你要画的图表的所有内容
	    var option_ten = {
	    tooltip : {
	        trigger: 'axis'
	    },
	     legend: {
	       x: 'center',
	       y:'bottom',
	       data:["今天","昨天"]
	   },
	    calculable : true,
	    xAxis: [{
	            axisLabel: {
	                interval: 0
	            },
	            axisLine: {

	                lineStyle: {
	                    color: '#646464'                
	                }
	            },
	            axisTick:{
	               show:false
	             },
	            type: 'category',
	            boundaryGap: false,
	            data:[0,'','',3,'','',6,'','',9,'','',12,'','',15,'','',18,'','',21,'',''],
	            axisLabel:{
	                 //X轴刻度配置
	                 interval:0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
	            }
	        }],
	        yAxis: [{
	            min:0,
	            max:max,
	            type: 'value',
	            axisLine: {
	                lineStyle: {
	                    width: 0
	                }
	            },
	            axisTick:{
	               show:false
	             }
	        }],
	        series: [
	        {
	            name: '今天',
	            type: 'line',
	            symbol:'circle',/*折点样式*/
	            symbolSize: 5,
	             color: ['#4fa8f9'],
	            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
	        },
	        {
	            name: '昨天',
	            type: 'line',
	            symbol:'circle',/*折点样式*/
	            symbolSize: 5,
	            color: ['#6ec71e'],
	            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
	        }
	      ]
	    };  
	    myChart10.setOption(option_ten);
		
	});
		

//昨天
$("#yesterday").click(function(){
	$("#word").empty();
	$("#word1").empty();
	$("#word2").empty();
	$("#word3").empty();
	var hour=new Array();
	 for(var a = 0; a <= 23; a++){
			hour[a] = 0;
	 }
	var hours=new Array();
	 for(var a = 0; a <= 23; a++){
			hours[a] = 0;
	 }
	var max = 2;
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
	var start_date1 = time;
	
	//展示內容
	var method = "overview/getCommonTrackRpt";
	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
	$.ajax({
		cache : false,
		url : "../../../StatisticsController/networkOverview.do",
		type : "post",
		data : {"siteId":siteId,"method":method,"start_date":start_date1,"end_date":end_date,"metrics":metrics},
		dataType : "json",
		async : true,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				//搜索词
				for (var a = 0; a < data.data.body.data[0].result.word.items.length; a++)  
		        {  
		           //获取div  
		            var div = document.getElementById("word");  
		  			var str = "";
		  			str+="<div class='main-item3'>";
		  			for(var b = 0; b < data.data.body.data[0].result.word.items[a].length; b++){
		  				if(b==2){
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.word.items[a][b]+"%</p> </div>";
		  				}else{
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.word.items[a][b]+"</p> </div>";
		  				}
		  			}
		  			str+="</div>";
		  			var newchild = document.createElement("div");
		  			newchild.innerHTML = str;
		            div.appendChild(newchild);

		        }  
				
				//来源网站
				for (var a = 0; a < data.data.body.data[0].result.sourceSite.items.length; a++)  
		        {  
		           //获取div  
		            var div = document.getElementById("word1");  
		  			var str = "";
		  			str+="<div class='main-item3'>";
		  			for(var b = 0; b < data.data.body.data[0].result.sourceSite.items[a].length; b++){
		  				if(b==2){
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.sourceSite.items[a][b]+"%</p> </div>";
		  				}else{
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.sourceSite.items[a][b]+"</p> </div>";
		  				}
		  			}
		  			str+="</div>";
		  			var newchild = document.createElement("div");
		  			newchild.innerHTML = str;
		            div.appendChild(newchild);

		        }  
				
				//入口页面
				for (var a = 0; a < data.data.body.data[0].result.landingPage.items.length; a++)  
		        {  
		           //获取div  
		            var div = document.getElementById("word2");  
		  			var str = "";
		  			str+="<div class='main-item3'>";
		  			for(var b = 0; b < data.data.body.data[0].result.landingPage.items[a].length; b++){
		  				if(b==2){
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.landingPage.items[a][b]+"%</p> </div>";
		  				}else if(b==0){
		  					str+="<div class='item-a"+b+"'><a href='#'><p>"+data.data.body.data[0].result.landingPage.items[a][b]+"</p></a></div>";
		  				}else{
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.landingPage.items[a][b]+"</p> </div>";
		  				}
		  			}
		  			str+="</div>";
		  			var newchild = document.createElement("div");
		  			newchild.innerHTML = str;
		            div.appendChild(newchild);

		        }  
				
				//受访页面
				for (var a = 0; a < data.data.body.data[0].result.visitPage.items.length; a++)  
		        {  
		           //获取div  
		            var div = document.getElementById("word3");  
		  			var str = "";
		  			str+="<div class='main-item3'>";
		  			for(var b = 0; b < data.data.body.data[0].result.visitPage.items[a].length; b++){
		  				if(b==2){
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.visitPage.items[a][b]+"%</p> </div>";
		  				}else if(b==0){
		  					str+="<div class='item-a"+b+"'><a href='#'><p>"+data.data.body.data[0].result.visitPage.items[a][b]+"</p></a></div>";
		  				}else{
		  					str+="<div class='item-a"+b+"'> <p>"+data.data.body.data[0].result.visitPage.items[a][b]+"</p> </div>";
		  				}
		  			}
		  			str+="</div>";
		  			var newchild = document.createElement("div");
		  			newchild.innerHTML = str;
		            div.appendChild(newchild);

		        }  
			}
		},
		error : function(request) {
			alert("Connection error");
		},
	});
	
	//新访客
	var method = "source/all/a";
	var visitor = "new"
	var metrics = "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio";
	$.ajax({
		cache : false,
		url : "../../../StatisticsController/networkOverview.do",
		type : "post",
		data : {"siteId":siteId,"method":method,"start_date":start_date1,"end_date":end_date,"metrics":metrics,"visitor":visitor},
		dataType : "json",
		async : true,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				$("#v").html(data.data.body.data[0].result.sum[0][0]);
				$("#w").html(data.data.body.data[0].result.sum[0][4]);
				if(data.data.body.data[0].result.sum[0][7]=='--'){
					$("#x").html(data.data.body.data[0].result.sum[0][7]);
				}else{
					$("#x").html(data.data.body.data[0].result.sum[0][7]+"%");
				}
				$("#y").html(data.data.body.data[0].result.sum[0][8]);
				$("#z").html(data.data.body.data[0].result.sum[0][9]);
				
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
	            $("#y").html(time);
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
		data : {"siteId":siteId,"method":method,"start_date":start_date1,"end_date":end_date,"metrics":metrics,"visitor":visitor},
		dataType : "json",
		async : true,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				$("#aa").html(data.data.body.data[0].result.sum[0][0]);
				$("#bb").html(data.data.body.data[0].result.sum[0][3]);
				if(data.data.body.data[0].result.sum[0][7]=='--'){
					$("#cc").html(data.data.body.data[0].result.sum[0][7]);
				}else{
					$("#cc").html(data.data.body.data[0].result.sum[0][7]+"%");
				}
				$("#dd").html(data.data.body.data[0].result.sum[0][8]);
				$("#ee").html(data.data.body.data[0].result.sum[0][9]);
				
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
	            
	            $("#dd").html(time);
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
		data : {"siteId":siteId,"method":method,"start_date":start_date1,"end_date":end_date,"metrics":metrics,"visitor":visitor},
		dataType : "json",
		async : true,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				if(data.data.body.data[0].result.sum[0][5]=='--'){
					$("#t").html("0%");
				}else{
					$("#t").html(data.data.body.data[0].result.sum[0][5]+"%");
				}
				var u = (100 -  parseFloat(data.data.body.data[0].result.sum[0][5])).toFixed(2);
				$("#u").html(u+"%");
				if(isNaN(u)){
					$("#u").html("0%");
		        }
			}
		},
		error : function(request) {
			alert("Connection error");
		},
	});
	
	//前天曲线图
	var method = "trend/time/a";
	var metrics = "pv_count";
	$.ajax({
		cache : false,
		url : "../../../StatisticsController/networkOverview.do",
		type : "post",
		data : {"siteId":siteId,"method":method,"start_date":start_date,"end_date":start_date,"metrics":metrics},
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				var HH = 23;
				var ss = 23;
				for(var a = 0; a <= HH; a++){
					hour[a] = data.data.body.data[0].result.items[1][ss][0];
					if(max<hour[a]){
						max=hour[a];
					}
					if(hour[a]=='--'){
						hour[a] = 0;
					}
					ss--;
				}
				
			}
		},
		error : function(request) {
			alert("Connection error");
		},
	});
	
	//昨天曲线图
	var method = "trend/time/a";
	var metrics = "pv_count";
	$.ajax({
		cache : false,
		url : "../../../StatisticsController/networkOverview.do",
		type : "post",
		data : {"siteId":siteId,"method":method,"start_date":start_date1,"end_date":end_date,"metrics":metrics},
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.code==0010) {
				alert(data.msg);
			}else if(data.code==0000){
				var HH = 23;
				var ss = 23;
				for(var a = 0; a <= HH; a++){
					hours[a] = data.data.body.data[0].result.items[1][ss][0];
					if(max<hours[a]){
						max=hours[a];
					}
					if(hours[a]=='--'){
						hours[a] = 0;
					}
					ss--;
				}
			}
		},
		error : function(request) {
			alert("Connection error");
		},
	});
	
    var myChart10 = echarts.init(document.getElementById('earch'));
    // option 里面的内容基本涵盖你要画的图表的所有内容
    var option_ten = {
    tooltip : {
        trigger: 'axis'
    },
     legend: {
       x: 'center',
       y:'bottom',
       data:["昨天","前天"]
   },
    calculable : true,
    xAxis: [{
            axisLabel: {
                interval: 0
            },
            axisLine: {

                lineStyle: {
                    color: '#646464'                
                }
            },
            axisTick:{
               show:false
             },
            type: 'category',
            boundaryGap: false,
            data:[0,'','',3,'','',6,'','',9,'','',12,'','',15,'','',18,'','',21,'',''],
            axisLabel:{
                 //X轴刻度配置
                 interval:0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            }
        }],
        yAxis: [{
            min:0,
            max:max,
            type: 'value',
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
            axisTick:{
               show:false
             }
        }],
        series: [
        {
            name: '昨天',
            type: 'line',
            symbol:'circle',/*折点样式*/
            symbolSize: 5,
             color: ['#4fa8f9'],
            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
        },
        {
            name: '前天',
            type: 'line',
            symbol:'circle',/*折点样式*/
            symbolSize: 5,
            color: ['#6ec71e'],
            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
        }
      ]
    };  
    myChart10.setOption(option_ten);
});
	
});