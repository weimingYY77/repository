$(function(){
	
	if(window.sessionStorage.getItem("siteId")==null){
		var siteId = 10512893;
	}else{
		var siteId = window.sessionStorage.getItem("siteId");
	}
	
	var engine = new Array();
	engine[0] = 0;
	engine[1] = 0;
	engine[2] = 0;
	engine[3] = 0;
	
	var hour=new Array(); //百度
	var hours=new Array(); //搜狗
	var hourss=new Array(); // 360
	var hoursss=new Array(); // Google
	var max = 2;
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
	
	//显示全部	
	function first(){
		
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}

							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	    

	}
	
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
	 first();
	 
	 //今天
	 $("#today").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
		 var max = 2;
		 $("#trend").empty();
		 $("#temp1").val(0);
		 if($("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0){
			 var clientDevice = "pc";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1){
			 var clientDevice = "pc";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2){
			 var clientDevice = "pc";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "old";
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	    
	 });
	 
	 //昨天
	 $("#yesterday").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp1").val(1);
		 if($("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0){
			 var clientDevice = "pc";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1){
			 var clientDevice = "pc";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2){
			 var clientDevice = "pc";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "old";
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
		
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var HH = 23;
						var ss = 23;
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var HH = 23;
						var ss = 23;
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	   
	 });
	 
	 //设备
	 $("#device").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp2").val(0);
		 if($("#temp1").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1){
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
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0){
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
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if($("#temp1").val()==1){
								var HH = 23;
								var ss = 23;
							}
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	   
	 });
	
	 //计算机
	 $("#computer").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp2").val(1);
		 if($("#temp1").val()==0&&$("#temp3").val()==0){
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1){
			 var clientDevice = "pc";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2){
			 var clientDevice = "pc";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1){
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
			 var visitor = "new";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==2){
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
				 var visitor = "old";
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if($("#temp1").val()==1){
								var HH = 23;
								var ss = 23;
							}
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	 
	 });
	 
	 //移动设备
	 $("#Mobile").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp2").val(2);
		 if($("#temp1").val()==0&&$("#temp3").val()==0){
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1){
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
			 var visitor = "new";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==2){
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
				 var visitor = "old";
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if($("#temp1").val()==1){
								var HH = 23;
								var ss = 23;
							}
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	
	 });
	 
	 //访客
	 $("#visitor").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp3").val(0);
		 if($("#temp1").val()==0&&$("#temp2").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1){
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2){
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2){
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
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if($("#temp1").val()==1){
								var HH = 23;
								var ss = 23;
							}
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	   
	 });
	 
	 //新访客
	 $("#newV").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp3").val(1);
		 if($("#temp1").val()==0&&$("#temp2").val()==0){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1){
			 var visitor = "new";
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2){
			 var visitor = "new";
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1){
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
				var clientDevice = "pc";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2){
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
				var clientDevice = "mobile";
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if($("#temp1").val()==1){
								var HH = 23;
								var ss = 23;
							}
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	   
	 });
	 
	 //老访客
	 $("#oldV").click(function(){
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 engine[3] = 0;
		 var hour=new Array();
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
		 }
			
		 var hours=new Array();
		 for(var a = 0; a <= 23; a++){
				hours[a] = 0;
		 }
		 var hourss=new Array();
		 for(var a = 0; a <= 23; a++){
				hourss[a] = 0;
		 }
		 var hoursss=new Array();
		 for(var a = 0; a <= 23; a++){
				hoursss[a] = 0;
		 }	
			var max = 2;
		 $("#trend").empty();
		 $("#temp3").val(2);
		 if($("#temp1").val()==0&&$("#temp2").val()==0){
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1){
			 var visitor = "old";
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2){
			 var visitor = "old";
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1){
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
				var clientDevice = "pc";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2){
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
				var clientDevice = "mobile";
		 }
		 
		  var method = "source/engine/a";
			
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/engine/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
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
			
			//饼状图
			var method = "source/engine/a";
				
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine[3] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
		//百度曲线图
		var method = "trend/time/a";
		var source = "search,1";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
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
			
			//搜狗曲线图
			var method = "trend/time/a";
			var source = "search,4";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							var myDate = new Date();
							var HH = parseInt(myDate.getHours());
							var ss = parseInt(myDate.getHours());
							if($("#temp1").val()==1){
								var HH = 23;
								var ss = 23;
							}
							if(HH==24){
								var HH = 23;
								var ss = 23;
							}
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
				
		//360搜索曲线图
		var method = "trend/time/a";
		var source = "search,14";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hourss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hourss[a]){
								max=hourss[a];
							}
							if(hourss[a]=='--'){
								hourss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
		
		//Google曲线图
		var method = "trend/time/a";
		var source = "search,2";
		var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						var myDate = new Date();
						var HH = parseInt(myDate.getHours());
						var ss = parseInt(myDate.getHours());
						if($("#temp1").val()==1){
							var HH = 23;
							var ss = 23;
						}
						if(HH==24){
							var HH = 23;
							var ss = 23;
						}
						for(var a = 0; a <= HH; a++){
							hoursss[a] = data.data.body.data[0].result.items[1][ss][0];
							if(max<hoursss[a]){
								max=hoursss[a];
							}
							if(hoursss[a]=='--'){
								hoursss[a] = 0;
							}
							ss--;
						}
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});				
			
			 var myChart = echarts.init(document.getElementById('engines_chart1'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '30%'],

			            label: {
			                normal: {
			                    position: 'inner'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['40%', '55%'],
			            label: {
			                normal: {
			                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
			                    // backgroundColor: '#eee',
			                    // borderColor: '#aaa',
			                    // borderWidth: 2,
			                    // borderRadius: 4,
			                    // shadowBlur:3,
			                    // shadowOffsetX: 2,
			                    // shadowOffsetY: 2,
			                    // shadowColor: '#999',
			                    // padding: [0, 7],
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        // abg: {
			                        //     backgroundColor: '#333',
			                        //     width: '100%',
			                        //     align: 'right',
			                        //     height: 22,
			                        //     borderRadius: [4, 4, 0, 0]
			                        // },
			                        b: {
			                            fontSize: 12,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:engine[0], name:'百度',fontSize:12},
			                {value:engine[1], name:'搜狗',fontSize:12},
			                {value:engine[2], name:'360搜索',fontSize:12},
			                {value:engine[3], name:'Google',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40']
			        }
			    ]
			};
			    myChart.setOption(option);
			    
			    var myChart = echarts.init(document.getElementById('engines_chart2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["百度","搜狗","360搜索","Google"]
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
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hoursss[0],hoursss[1],hoursss[2],hoursss[3],hoursss[4],hoursss[5],hoursss[6],hoursss[7],hoursss[8],hoursss[9],hoursss[10],hoursss[11],hoursss[12],hoursss[13],hoursss[14],hoursss[15],hoursss[16],hoursss[17],hoursss[18],hoursss[19],hoursss[20],hoursss[21],hoursss[22],hoursss[23]]
			            
			        }
			      ]
			    };  
			    myChart.setOption(option);	   
	 });
 });