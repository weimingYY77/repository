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
	
	var engine1 = new Array();
	
	var hour=new Array(); //直接访问
	var hours=new Array(); //搜索引擎
	var hours1 =new Array();//百度
	var hours2 =new Array();//搜狗
	var hours3 =new Array();//360搜索
	var hours4 =new Array();//Google
	var hourss=new Array(); // 外部链接
	
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
	var viewType = "type"; //默认来源类型
	var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
	first();
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
	 //显示全部
	function first(){
			//头部
  		 	$("#earch3").hide();
  		 	$("#echart_4").hide();
			var method = "source/all/a";
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
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
			
			//展示
			var method = "source/all/a";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				var method = "source/all/a";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
					dataType : "json",
					async : false,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}
					        }
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});
				
				//直接访问
				var method = "trend/time/a";
				var source = "through";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
				//搜索引擎
				var method = "trend/time/a";
				var source = "search,0";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
			//外部链接
			var method = "trend/time/a";
			var source = "link";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			 // 路径配置   全部来源来源类型饼状图
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
		   var myChart1 = echarts.init(document.getElementById('earch2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
				option_one = {
				    tooltip: {
				        trigger: 'item',
				        // formatter: "{a}<br/>{b}:{c}({d}%)"
				    },
				    series: [
				        {
				            name:'',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '20%'],
				
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
				                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
				                            align: 'right'
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
				                {value:engine[0], name:'直接访问',fontSize:12},
				                {value:engine[1], name:'搜索引擎',fontSize:12},
				                {value:engine[2], name:'外部链接',fontSize:12}
				            ],
				            color:['#4fa8f9','#6ec71e','#f56e6a']
				        }
				    ]
				};
		    myChart1.setOption(option_one);
		                }
		    );
		    
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
		   var myChart2 = echarts.init(document.getElementById('echart_2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_two = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["搜索引擎","外部链接","直接访问"],
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '搜索引擎',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart2.setOption(option_two);
		                    }
		    );
	};
	
	//今天
	$("#today").click(function(){
		 var max = 2;
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp1").val(0);
		if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			
		}else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var viewType = "site";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var visitor = "new";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var visitor = "old";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "site";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "pc";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "site";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "site";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "mobile";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var viewType = "site";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "old";
			var viewType = "site";
		}
		
		var method = "source/all/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : false,
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
		  			
		  			//饼状图
		  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
			        {
						if($("#temp4").val()==1){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine1[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
								engine1[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
								engine1[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
								engine1[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
								engine1[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine1[5] = data.data.body.data[0].result.items[1][a][0];
							}
						}else if($("#temp4").val()==0){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
								engine[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine[2] = data.data.body.data[0].result.items[1][a][0];
							}
						}
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
				
		//直接访问
		var method = "trend/time/a";
		var source = "through";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
		//搜索引擎
		var method = "trend/time/a";
		var source = "search,0";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//百度曲线图
			var method = "trend/time/a";
			var source = "search,1";
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
							for(var a = 0; a <= HH; a++){
								hours1[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours1[a]){
									max=hours1[a];
								}
								if(hours1[a]=='--'){
									hours1[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours2[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours2[a]){
									max=hours2[a];
								}
								if(hours2[a]=='--'){
									hours2[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours3[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours3[a]){
									max=hours3[a];
								}
								if(hours3[a]=='--'){
									hours3[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours4[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours4[a]){
									max=hours4[a];
								}
								if(hours4[a]=='--'){
									hours4[a] = 0;
								}
								ss--;
							}
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});						
				//外部链接
				var method = "trend/time/a";
				var source = "link";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
		
		//判断是否为来源网站
		if($("#temp4").val()==1){
			//饼状图
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
		    var myChart3 = echarts.init(document.getElementById('earch3'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		option_three = {
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
		                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
		                            lineHeight: 30,
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
		                {value:engine1[0], name:'直接访问',fontSize:12},
		                {value:engine1[1], name:'百度',fontSize:12},
		                {value:engine1[2], name:'搜狗',fontSize:12},
		                {value:engine1[3], name:'360搜索',fontSize:12},
		                {value:engine1[4], name:'Google',fontSize:12},
		                {value:engine1[5], name:'外部链接',fontSize:12}
		            ],
		            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
		        }
		    ]
		};
		    myChart3.setOption(option_three);
		                    }
		    );
		    
		    //曲线图
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
		    var myChart4 = echarts.init(document.getElementById('echart_4'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_four = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '百度',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
		        },
		        {
		            name: '搜狗',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
		            
		        },
		        {
		            name: '360搜索',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#fc8b40'],
		            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
		            
		        },
		        {
		            name: 'Google',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#818af8'],
		            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
		            
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#30c9d7'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart4.setOption(option_four);
		                    }
		    );   
		}else if($("#temp4").val()==0){
			
			 // 路径配置   全部来源来源类型饼状图
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
		   var myChart1 = echarts.init(document.getElementById('earch2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
				option_one = {
				    tooltip: {
				        trigger: 'item',
				        // formatter: "{a}<br/>{b}:{c}({d}%)"
				    },
				    series: [
				        {
				            name:'',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '20%'],
				
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
				                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
				                            align: 'right'
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
				                {value:engine[0], name:'直接访问',fontSize:12},
				                {value:engine[1], name:'搜索引擎',fontSize:12},
				                {value:engine[2], name:'外部链接',fontSize:12}
				            ],
				            color:['#4fa8f9','#6ec71e','#f56e6a']
				        }
				    ]
				};
		    myChart1.setOption(option_one);
		                }
		    );
		    
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
		   var myChart2 = echarts.init(document.getElementById('echart_2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_two = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["搜索引擎","外部链接","直接访问"],
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '搜索引擎',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart2.setOption(option_two);
		                    }
		    );
			
		}
		
	});
	
	//昨天
	$("#yesterday").click(function(){
		 var max = 2;
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp1").val(1);
		if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			
		}else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var viewType = "site";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var visitor = "new";
		}else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var visitor = "old";
		}else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "site";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "pc";
		}else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "site";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "site";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "mobile";
		}else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var viewType = "site";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "mobile";
			var visitor = "old";
		}else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "mobile";
			var visitor = "old";
			var viewType = "site";
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
		
		var method = "source/all/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : false,
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
		  			
		  			//饼状图
		  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
			        {
						if($("#temp4").val()==1){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine1[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
								engine1[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
								engine1[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
								engine1[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
								engine1[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine1[5] = data.data.body.data[0].result.items[1][a][0];
							}
						}else if($("#temp4").val()==0){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
								engine[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine[2] = data.data.body.data[0].result.items[1][a][0];
							}
						}
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
				
		//直接访问
		var method = "trend/time/a";
		var source = "through";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
		//搜索引擎
		var method = "trend/time/a";
		var source = "search,0";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//百度曲线图
			var method = "trend/time/a";
			var source = "search,1";
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
								hours1[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours1[a]){
									max=hours1[a];
								}
								if(hours1[a]=='--'){
									hours1[a] = 0;
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
								hours2[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours2[a]){
									max=hours2[a];
								}
								if(hours2[a]=='--'){
									hours2[a] = 0;
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
								hours3[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours3[a]){
									max=hours3[a];
								}
								if(hours3[a]=='--'){
									hours3[a] = 0;
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
								hours4[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours4[a]){
									max=hours4[a];
								}
								if(hours4[a]=='--'){
									hours4[a] = 0;
								}
								ss--;
							}
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});						
				//外部链接
				var method = "trend/time/a";
				var source = "link";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
		//判断是否为来源网站
		if($("#temp4").val()==1){
			//饼状图
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
		    var myChart3 = echarts.init(document.getElementById('earch3'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		option_three = {
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
		                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
		                            lineHeight: 30,
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
		                {value:engine1[0], name:'直接访问',fontSize:12},
		                {value:engine1[1], name:'百度',fontSize:12},
		                {value:engine1[2], name:'搜狗',fontSize:12},
		                {value:engine1[3], name:'360搜索',fontSize:12},
		                {value:engine1[4], name:'Google',fontSize:12},
		                {value:engine1[5], name:'外部链接',fontSize:12}
		            ],
		            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
		        }
		    ]
		};
		    myChart3.setOption(option_three);
		                    }
		    );
		    
		    //曲线图
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
		    var myChart4 = echarts.init(document.getElementById('echart_4'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_four = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '百度',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
		        },
		        {
		            name: '搜狗',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
		            
		        },
		        {
		            name: '360搜索',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#fc8b40'],
		            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
		            
		        },
		        {
		            name: 'Google',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#818af8'],
		            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
		            
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#30c9d7'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart4.setOption(option_four);
		                    }
		    );   
		}else if($("#temp4").val()==0){
			
			 // 路径配置   全部来源来源类型饼状图
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
		   var myChart1 = echarts.init(document.getElementById('earch2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
				option_one = {
				    tooltip: {
				        trigger: 'item',
				        // formatter: "{a}<br/>{b}:{c}({d}%)"
				    },
				    series: [
				        {
				            name:'',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '20%'],
				
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
				                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
				                            align: 'right'
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
				                {value:engine[0], name:'直接访问',fontSize:12},
				                {value:engine[1], name:'搜索引擎',fontSize:12},
				                {value:engine[2], name:'外部链接',fontSize:12}
				            ],
				            color:['#4fa8f9','#6ec71e','#f56e6a']
				        }
				    ]
				};
		    myChart1.setOption(option_one);
		                }
		    );
		    
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
		   var myChart2 = echarts.init(document.getElementById('echart_2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_two = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["搜索引擎","外部链接","直接访问"],
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '搜索引擎',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart2.setOption(option_two);
		                    }
		    );
			
		}
	});
	
	//设备
	$("#device").click(function(){
		 var max = 2;
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp2").val(0);
		if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			
		}else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var viewType = "site"; 
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var visitor = "old";
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
		}
		
		var method = "source/all/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : false,
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
		  			
		  			//饼状图
		  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
			        {
						if($("#temp4").val()==1){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine1[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
								engine1[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
								engine1[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
								engine1[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
								engine1[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine1[5] = data.data.body.data[0].result.items[1][a][0];
							}
						}else if($("#temp4").val()==0){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
								engine[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine[2] = data.data.body.data[0].result.items[1][a][0];
							}
						}
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
				
		//直接访问
		var method = "trend/time/a";
		var source = "through";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
		//搜索引擎
		var method = "trend/time/a";
		var source = "search,0";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//百度曲线图
			var method = "trend/time/a";
			var source = "search,1";
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
							for(var a = 0; a <= HH; a++){
								hours1[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours1[a]){
									max=hours1[a];
								}
								if(hours1[a]=='--'){
									hours1[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours2[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours2[a]){
									max=hours2[a];
								}
								if(hours2[a]=='--'){
									hours2[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours3[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours3[a]){
									max=hours3[a];
								}
								if(hours3[a]=='--'){
									hours3[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours4[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours4[a]){
									max=hours4[a];
								}
								if(hours4[a]=='--'){
									hours4[a] = 0;
								}
								ss--;
							}
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});						
				//外部链接
				var method = "trend/time/a";
				var source = "link";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
		
		//判断是否为来源网站
		if($("#temp4").val()==1){
			//饼状图
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
		    var myChart3 = echarts.init(document.getElementById('earch3'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		option_three = {
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
		                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
		                            lineHeight: 30,
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
		                {value:engine1[0], name:'直接访问',fontSize:12},
		                {value:engine1[1], name:'百度',fontSize:12},
		                {value:engine1[2], name:'搜狗',fontSize:12},
		                {value:engine1[3], name:'360搜索',fontSize:12},
		                {value:engine1[4], name:'Google',fontSize:12},
		                {value:engine1[5], name:'外部链接',fontSize:12}
		            ],
		            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
		        }
		    ]
		};
		    myChart3.setOption(option_three);
		                    }
		    );
		    
		    //曲线图
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
		    var myChart4 = echarts.init(document.getElementById('echart_4'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_four = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '百度',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
		        },
		        {
		            name: '搜狗',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
		            
		        },
		        {
		            name: '360搜索',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#fc8b40'],
		            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
		            
		        },
		        {
		            name: 'Google',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#818af8'],
		            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
		            
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#30c9d7'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart4.setOption(option_four);
		                    }
		    );   
		}else if($("#temp4").val()==0){
			
			 // 路径配置   全部来源来源类型饼状图
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
		   var myChart1 = echarts.init(document.getElementById('earch2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
				option_one = {
				    tooltip: {
				        trigger: 'item',
				        // formatter: "{a}<br/>{b}:{c}({d}%)"
				    },
				    series: [
				        {
				            name:'',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '20%'],
				
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
				                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
				                            align: 'right'
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
				                {value:engine[0], name:'直接访问',fontSize:12},
				                {value:engine[1], name:'搜索引擎',fontSize:12},
				                {value:engine[2], name:'外部链接',fontSize:12}
				            ],
				            color:['#4fa8f9','#6ec71e','#f56e6a']
				        }
				    ]
				};
		    myChart1.setOption(option_one);
		                }
		    );
		    
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
		   var myChart2 = echarts.init(document.getElementById('echart_2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_two = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["搜索引擎","外部链接","直接访问"],
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '搜索引擎',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart2.setOption(option_two);
		                    }
		    );
			
		}
	});
	
	//计算机
	$("#computer").click(function(){
		 var max = 2;
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
			$("#trend").empty();
			$("#temp2").val(1);
		if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var viewType = "site";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "site";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "site";
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
			var clientDevice = "pc";
			var viewType = "site";
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
			var clientDevice = "pc";
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
			var clientDevice = "pc";
			var visitor = "new";
			var viewType = "site";
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
			var clientDevice = "pc";
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
			var clientDevice = "pc";
			var visitor = "old";
			var viewType = "site";
		}
		
		var method = "source/all/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : false,
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
		  			
		  			//饼状图
		  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
			        {
						if($("#temp4").val()==1){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine1[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
								engine1[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
								engine1[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
								engine1[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
								engine1[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine1[5] = data.data.body.data[0].result.items[1][a][0];
							}
						}else if($("#temp4").val()==0){
							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
								engine[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
								engine[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
								engine[2] = data.data.body.data[0].result.items[1][a][0];
							}
						}
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
				
		//直接访问
		var method = "trend/time/a";
		var source = "through";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
		//搜索引擎
		var method = "trend/time/a";
		var source = "search,0";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//百度曲线图
			var method = "trend/time/a";
			var source = "search,1";
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
							for(var a = 0; a <= HH; a++){
								hours1[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours1[a]){
									max=hours1[a];
								}
								if(hours1[a]=='--'){
									hours1[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours2[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours2[a]){
									max=hours2[a];
								}
								if(hours2[a]=='--'){
									hours2[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours3[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours3[a]){
									max=hours3[a];
								}
								if(hours3[a]=='--'){
									hours3[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours4[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours4[a]){
									max=hours4[a];
								}
								if(hours4[a]=='--'){
									hours4[a] = 0;
								}
								ss--;
							}
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});						
				//外部链接
				var method = "trend/time/a";
				var source = "link";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
		
		//判断是否为来源网站
		if($("#temp4").val()==1){
			//饼状图
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
		    var myChart3 = echarts.init(document.getElementById('earch3'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		option_three = {
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
		                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
		                            lineHeight: 30,
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
		                {value:engine1[0], name:'直接访问',fontSize:12},
		                {value:engine1[1], name:'百度',fontSize:12},
		                {value:engine1[2], name:'搜狗',fontSize:12},
		                {value:engine1[3], name:'360搜索',fontSize:12},
		                {value:engine1[4], name:'Google',fontSize:12},
		                {value:engine1[5], name:'外部链接',fontSize:12}
		            ],
		            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
		        }
		    ]
		};
		    myChart3.setOption(option_three);
		                    }
		    );
		    
		    //曲线图
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
		    var myChart4 = echarts.init(document.getElementById('echart_4'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_four = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '百度',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
		        },
		        {
		            name: '搜狗',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
		            
		        },
		        {
		            name: '360搜索',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#fc8b40'],
		            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
		            
		        },
		        {
		            name: 'Google',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#818af8'],
		            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
		            
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#30c9d7'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart4.setOption(option_four);
		                    }
		    );   
		}else if($("#temp4").val()==0){
			
			 // 路径配置   全部来源来源类型饼状图
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
		   var myChart1 = echarts.init(document.getElementById('earch2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
				option_one = {
				    tooltip: {
				        trigger: 'item',
				        // formatter: "{a}<br/>{b}:{c}({d}%)"
				    },
				    series: [
				        {
				            name:'',
				            type:'pie',
				            selectedMode: 'single',
				            radius: [0, '20%'],
				
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
				                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
				                            align: 'right'
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
				                {value:engine[0], name:'直接访问',fontSize:12},
				                {value:engine[1], name:'搜索引擎',fontSize:12},
				                {value:engine[2], name:'外部链接',fontSize:12}
				            ],
				            color:['#4fa8f9','#6ec71e','#f56e6a']
				        }
				    ]
				};
		    myChart1.setOption(option_one);
		                }
		    );
		    
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
		   var myChart2 = echarts.init(document.getElementById('echart_2'));
		    // option 里面的内容基本涵盖你要画的图表的所有内容
		    var option_two = {
		    tooltip : {
		        trigger: 'axis'
		    },
		     legend: {
		       x: 'center',
		       y:'bottom',
		       data:["搜索引擎","外部链接","直接访问"],
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
		            name: '直接访问',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		             color: ['#4fa8f9'],
		            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
		        },
		        {
		            name: '搜索引擎',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#6ec71e'],
		            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
		        },
		        {
		            name: '外部链接',
		            type: 'line',
		            symbol:'circle',/*折点样式*/
		            symbolSize: 5,
		            color: ['#f56e6a'],
		            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
		            
		        }
		      ]
		    };  
		    myChart2.setOption(option_two);
		                    }
		    );
			
		}
	});
	
	//移动设备
	$("#Mobile").click(function(){
		var max = 2;
		var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp2").val(2);
		 if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
				var clientDevice = "mobile";
			}else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
				var clientDevice = "mobile";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
				var clientDevice = "mobile";
				var visitor = "new";
			}else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
				var clientDevice = "mobile";
				var visitor = "new";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
				var clientDevice = "mobile";
				var visitor = "old";
			}else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
				var clientDevice = "mobile";
				var visitor = "old";
				var viewType = "site";
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
				var clientDevice = "mobile";
				var viewType = "site";
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
				var clientDevice = "mobile";
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
				var clientDevice = "mobile";
				var visitor = "new";
				var viewType = "site";
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
				var clientDevice = "mobile";
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
				var clientDevice = "mobile";
				var visitor = "old";
				var viewType = "site";
			}
			
			var method = "source/all/a";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
				dataType : "json",
				async : false,
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
			  			
			  			//饼状图
			  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if($("#temp4").val()==1){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine1[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine1[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine1[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine1[3] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine1[4] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine1[5] = data.data.body.data[0].result.items[1][a][0];
								}
							}else if($("#temp4").val()==0){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}
							}
				        }
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
					
			//直接访问
			var method = "trend/time/a";
			var source = "through";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
			//搜索引擎
			var method = "trend/time/a";
			var source = "search,0";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
				//百度曲线图
				var method = "trend/time/a";
				var source = "search,1";
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
								for(var a = 0; a <= HH; a++){
									hours1[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours1[a]){
										max=hours1[a];
									}
									if(hours1[a]=='--'){
										hours1[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours2[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours2[a]){
										max=hours2[a];
									}
									if(hours2[a]=='--'){
										hours2[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours3[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours3[a]){
										max=hours3[a];
									}
									if(hours3[a]=='--'){
										hours3[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours4[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours4[a]){
										max=hours4[a];
									}
									if(hours4[a]=='--'){
										hours4[a] = 0;
									}
									ss--;
								}
							}
						},
						error : function(request) {
							alert("Connection error");
						},
					});						
					//外部链接
					var method = "trend/time/a";
					var source = "link";
					$.ajax({
						cache : false,
						url : "../../../StatisticsController/networkOverview.do",
						type : "post",
						data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//判断是否为来源网站
			if($("#temp4").val()==1){
				//饼状图
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
			    var myChart3 = echarts.init(document.getElementById('earch3'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option_three = {
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
			                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
			                            lineHeight: 30,
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
			                {value:engine1[0], name:'直接访问',fontSize:12},
			                {value:engine1[1], name:'百度',fontSize:12},
			                {value:engine1[2], name:'搜狗',fontSize:12},
			                {value:engine1[3], name:'360搜索',fontSize:12},
			                {value:engine1[4], name:'Google',fontSize:12},
			                {value:engine1[5], name:'外部链接',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
			        }
			    ]
			};
			    myChart3.setOption(option_three);
			                    }
			    );
			    
			    //曲线图
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
			    var myChart4 = echarts.init(document.getElementById('echart_4'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_four = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
			            
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#818af8'],
			            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
			            
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#30c9d7'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart4.setOption(option_four);
			                    }
			    );   
			}else if($("#temp4").val()==0){
				
				 // 路径配置   全部来源来源类型饼状图
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
			   var myChart1 = echarts.init(document.getElementById('earch2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
					option_one = {
					    tooltip: {
					        trigger: 'item',
					        // formatter: "{a}<br/>{b}:{c}({d}%)"
					    },
					    series: [
					        {
					            name:'',
					            type:'pie',
					            selectedMode: 'single',
					            radius: [0, '20%'],
					
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
					                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
					                            align: 'right'
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
					                {value:engine[0], name:'直接访问',fontSize:12},
					                {value:engine[1], name:'搜索引擎',fontSize:12},
					                {value:engine[2], name:'外部链接',fontSize:12}
					            ],
					            color:['#4fa8f9','#6ec71e','#f56e6a']
					        }
					    ]
					};
			    myChart1.setOption(option_one);
			                }
			    );
			    
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
			   var myChart2 = echarts.init(document.getElementById('echart_2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_two = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["搜索引擎","外部链接","直接访问"],
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜索引擎',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart2.setOption(option_two);
			                    }
			    );
				
			}
	});
	
	//访客
	$("#visitor").click(function(){
		 var max = 2;
		 var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp3").val(0);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 
			}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
				
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
				var clientDevice = "pc";
			}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
				var clientDevice = "pc";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
				var clientDevice = "mobile";
			}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
				var clientDevice = "mobile";
				var viewType = "site";
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
				var viewType = "site";
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
				var viewType = "site";
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
				var viewType = "site";
			}
		 
			var method = "source/all/a";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
				dataType : "json",
				async : false,
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
			  			
			  			//饼状图
			  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if($("#temp4").val()==1){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine1[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine1[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine1[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine1[3] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine1[4] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine1[5] = data.data.body.data[0].result.items[1][a][0];
								}
							}else if($("#temp4").val()==0){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}
							}
				        }
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
					
			//直接访问
			var method = "trend/time/a";
			var source = "through";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
			//搜索引擎
			var method = "trend/time/a";
			var source = "search,0";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
				//百度曲线图
				var method = "trend/time/a";
				var source = "search,1";
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
								for(var a = 0; a <= HH; a++){
									hours1[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours1[a]){
										max=hours1[a];
									}
									if(hours1[a]=='--'){
										hours1[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours2[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours2[a]){
										max=hours2[a];
									}
									if(hours2[a]=='--'){
										hours2[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours3[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours3[a]){
										max=hours3[a];
									}
									if(hours3[a]=='--'){
										hours3[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours4[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours4[a]){
										max=hours4[a];
									}
									if(hours4[a]=='--'){
										hours4[a] = 0;
									}
									ss--;
								}
							}
						},
						error : function(request) {
							alert("Connection error");
						},
					});						
					//外部链接
					var method = "trend/time/a";
					var source = "link";
					$.ajax({
						cache : false,
						url : "../../../StatisticsController/networkOverview.do",
						type : "post",
						data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//判断是否为来源网站
			if($("#temp4").val()==1){
				//饼状图
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
			    var myChart3 = echarts.init(document.getElementById('earch3'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option_three = {
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
			                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
			                            lineHeight: 30,
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
			                {value:engine1[0], name:'直接访问',fontSize:12},
			                {value:engine1[1], name:'百度',fontSize:12},
			                {value:engine1[2], name:'搜狗',fontSize:12},
			                {value:engine1[3], name:'360搜索',fontSize:12},
			                {value:engine1[4], name:'Google',fontSize:12},
			                {value:engine1[5], name:'外部链接',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
			        }
			    ]
			};
			    myChart3.setOption(option_three);
			                    }
			    );
			    
			    //曲线图
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
			    var myChart4 = echarts.init(document.getElementById('echart_4'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_four = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
			            
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#818af8'],
			            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
			            
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#30c9d7'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart4.setOption(option_four);
			                    }
			    );   
			}else if($("#temp4").val()==0){
				
				 // 路径配置   全部来源来源类型饼状图
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
			   var myChart1 = echarts.init(document.getElementById('earch2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
					option_one = {
					    tooltip: {
					        trigger: 'item',
					        // formatter: "{a}<br/>{b}:{c}({d}%)"
					    },
					    series: [
					        {
					            name:'',
					            type:'pie',
					            selectedMode: 'single',
					            radius: [0, '20%'],
					
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
					                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
					                            align: 'right'
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
					                {value:engine[0], name:'直接访问',fontSize:12},
					                {value:engine[1], name:'搜索引擎',fontSize:12},
					                {value:engine[2], name:'外部链接',fontSize:12}
					            ],
					            color:['#4fa8f9','#6ec71e','#f56e6a']
					        }
					    ]
					};
			    myChart1.setOption(option_one);
			                }
			    );
			    
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
			   var myChart2 = echarts.init(document.getElementById('echart_2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_two = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["搜索引擎","外部链接","直接访问"],
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜索引擎',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart2.setOption(option_two);
			                    }
			    );
				
			}
	});
	
	//新访客
	$("#newV").click(function(){
		var max = 2;
		var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp3").val(1);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 	var visitor = "new";
			}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
				var visitor = "new";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
				var visitor = "new";
				var clientDevice = "pc";
			}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
				var visitor = "new";
				var clientDevice = "pc";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
				var visitor = "new";
				var clientDevice = "mobile";
			}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
				var visitor = "new";
				var clientDevice = "mobile";
				var viewType = "site";
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
				var viewType = "site";
				var visitor = "new";
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
				var visitor = "new";
				var clientDevice = "pc";
				var viewType = "site";
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
				var visitor = "new";
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
				var visitor = "new";
				var clientDevice = "mobile";
				var viewType = "site";
			}
		 
			var method = "source/all/a";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
				dataType : "json",
				async : false,
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
			  			
			  			//饼状图
			  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if($("#temp4").val()==1){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine1[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine1[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine1[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine1[3] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine1[4] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine1[5] = data.data.body.data[0].result.items[1][a][0];
								}
							}else if($("#temp4").val()==0){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}
							}
				        }
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
					
			//直接访问
			var method = "trend/time/a";
			var source = "through";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
			//搜索引擎
			var method = "trend/time/a";
			var source = "search,0";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
				//百度曲线图
				var method = "trend/time/a";
				var source = "search,1";
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
								for(var a = 0; a <= HH; a++){
									hours1[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours1[a]){
										max=hours1[a];
									}
									if(hours1[a]=='--'){
										hours1[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours2[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours2[a]){
										max=hours2[a];
									}
									if(hours2[a]=='--'){
										hours2[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours3[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours3[a]){
										max=hours3[a];
									}
									if(hours3[a]=='--'){
										hours3[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours4[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours4[a]){
										max=hours4[a];
									}
									if(hours4[a]=='--'){
										hours4[a] = 0;
									}
									ss--;
								}
							}
						},
						error : function(request) {
							alert("Connection error");
						},
					});						
					//外部链接
					var method = "trend/time/a";
					var source = "link";
					$.ajax({
						cache : false,
						url : "../../../StatisticsController/networkOverview.do",
						type : "post",
						data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//判断是否为来源网站
			if($("#temp4").val()==1){
				//饼状图
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
			    var myChart3 = echarts.init(document.getElementById('earch3'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option_three = {
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
			                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
			                            lineHeight: 30,
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
			                {value:engine1[0], name:'直接访问',fontSize:12},
			                {value:engine1[1], name:'百度',fontSize:12},
			                {value:engine1[2], name:'搜狗',fontSize:12},
			                {value:engine1[3], name:'360搜索',fontSize:12},
			                {value:engine1[4], name:'Google',fontSize:12},
			                {value:engine1[5], name:'外部链接',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
			        }
			    ]
			};
			    myChart3.setOption(option_three);
			                    }
			    );
			    
			    //曲线图
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
			    var myChart4 = echarts.init(document.getElementById('echart_4'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_four = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
			            
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#818af8'],
			            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
			            
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#30c9d7'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart4.setOption(option_four);
			                    }
			    );   
			}else if($("#temp4").val()==0){
				
				 // 路径配置   全部来源来源类型饼状图
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
			   var myChart1 = echarts.init(document.getElementById('earch2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
					option_one = {
					    tooltip: {
					        trigger: 'item',
					        // formatter: "{a}<br/>{b}:{c}({d}%)"
					    },
					    series: [
					        {
					            name:'',
					            type:'pie',
					            selectedMode: 'single',
					            radius: [0, '20%'],
					
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
					                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
					                            align: 'right'
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
					                {value:engine[0], name:'直接访问',fontSize:12},
					                {value:engine[1], name:'搜索引擎',fontSize:12},
					                {value:engine[2], name:'外部链接',fontSize:12}
					            ],
					            color:['#4fa8f9','#6ec71e','#f56e6a']
					        }
					    ]
					};
			    myChart1.setOption(option_one);
			                }
			    );
			    
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
			   var myChart2 = echarts.init(document.getElementById('echart_2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_two = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["搜索引擎","外部链接","直接访问"],
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜索引擎',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart2.setOption(option_two);
			                    }
			    );
				
			}
	});
	
	//老访客
	$("#oldV").click(function(){
		var max = 2;
		var engine = new Array();
		 engine[0] = 0;
		 engine[1] = 0;
		 engine[2] = 0;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 if($("#temp4").val()==0){
			 $("#earch2").show();
			 $("#echart_2").show();
			 $("#earch3").hide();
			 $("#echart_4").hide();
		 }else if($("#temp4").val()==1){
			 $("#earch2").hide();
			 $("#echart_2").hide();
			 $("#earch3").show();
			 $("#echart_4").show();
		 }
		 $("#trend").empty();
		 $("#temp3").val(2);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 	var visitor = "old";
			}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
				var visitor = "old";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
				var visitor = "old";
				var clientDevice = "pc";
			}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
				var visitor = "old";
				var clientDevice = "pc";
				var viewType = "site";
			}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
				var visitor = "old";
				var clientDevice = "mobile";
			}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
				var visitor = "old";
				var clientDevice = "mobile";
				var viewType = "site";
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
				var viewType = "site";
				var visitor = "old";
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
				var visitor = "old";
				var clientDevice = "pc";
				var viewType = "site";
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
				var visitor = "old";
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
				var visitor = "old";
				var clientDevice = "mobile";
				var viewType = "site";
			}
		 
			var method = "source/all/a";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
				dataType : "json",
				async : false,
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
			  			
			  			//饼状图
			  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if($("#temp4").val()==1){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine1[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
									engine1[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
									engine1[2] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
									engine1[3] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
									engine1[4] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine1[5] = data.data.body.data[0].result.items[1][a][0];
								}
							}else if($("#temp4").val()==0){
								if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
									engine[0] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
									engine[1] = data.data.body.data[0].result.items[1][a][0];
								}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
									engine[2] = data.data.body.data[0].result.items[1][a][0];
								}
							}
				        }
					}
				},
				error : function(request) {
					alert("Connection error");
				},
			});
					
			//直接访问
			var method = "trend/time/a";
			var source = "through";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
			//搜索引擎
			var method = "trend/time/a";
			var source = "search,0";
			$.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
				
				//百度曲线图
				var method = "trend/time/a";
				var source = "search,1";
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
								for(var a = 0; a <= HH; a++){
									hours1[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours1[a]){
										max=hours1[a];
									}
									if(hours1[a]=='--'){
										hours1[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours2[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours2[a]){
										max=hours2[a];
									}
									if(hours2[a]=='--'){
										hours2[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours3[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours3[a]){
										max=hours3[a];
									}
									if(hours3[a]=='--'){
										hours3[a] = 0;
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
								for(var a = 0; a <= HH; a++){
									hours4[a] = data.data.body.data[0].result.items[1][ss][0];
									if(max<hours4[a]){
										max=hours4[a];
									}
									if(hours4[a]=='--'){
										hours4[a] = 0;
									}
									ss--;
								}
							}
						},
						error : function(request) {
							alert("Connection error");
						},
					});						
					//外部链接
					var method = "trend/time/a";
					var source = "link";
					$.ajax({
						cache : false,
						url : "../../../StatisticsController/networkOverview.do",
						type : "post",
						data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//判断是否为来源网站
			if($("#temp4").val()==1){
				//饼状图
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
			    var myChart3 = echarts.init(document.getElementById('earch3'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			option_three = {
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
			                    formatter: '{b|{b}：}{c} \n{per|{d}%}\n',
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
			                            lineHeight: 30,
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
			                {value:engine1[0], name:'直接访问',fontSize:12},
			                {value:engine1[1], name:'百度',fontSize:12},
			                {value:engine1[2], name:'搜狗',fontSize:12},
			                {value:engine1[3], name:'360搜索',fontSize:12},
			                {value:engine1[4], name:'Google',fontSize:12},
			                {value:engine1[5], name:'外部链接',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
			        }
			    ]
			};
			    myChart3.setOption(option_three);
			                    }
			    );
			    
			    //曲线图
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
			    var myChart4 = echarts.init(document.getElementById('echart_4'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_four = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"]
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '百度',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
			        },
			        {
			            name: '搜狗',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
			            
			        },
			        {
			            name: '360搜索',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#fc8b40'],
			            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
			            
			        },
			        {
			            name: 'Google',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#818af8'],
			            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
			            
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#30c9d7'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart4.setOption(option_four);
			                    }
			    );   
			}else if($("#temp4").val()==0){
				
				 // 路径配置   全部来源来源类型饼状图
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
			   var myChart1 = echarts.init(document.getElementById('earch2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
					option_one = {
					    tooltip: {
					        trigger: 'item',
					        // formatter: "{a}<br/>{b}:{c}({d}%)"
					    },
					    series: [
					        {
					            name:'',
					            type:'pie',
					            selectedMode: 'single',
					            radius: [0, '20%'],
					
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
					                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
					                            align: 'right'
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
					                {value:engine[0], name:'直接访问',fontSize:12},
					                {value:engine[1], name:'搜索引擎',fontSize:12},
					                {value:engine[2], name:'外部链接',fontSize:12}
					            ],
					            color:['#4fa8f9','#6ec71e','#f56e6a']
					        }
					    ]
					};
			    myChart1.setOption(option_one);
			                }
			    );
			    
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
			   var myChart2 = echarts.init(document.getElementById('echart_2'));
			    // option 里面的内容基本涵盖你要画的图表的所有内容
			    var option_two = {
			    tooltip : {
			        trigger: 'axis'
			    },
			     legend: {
			       x: 'center',
			       y:'bottom',
			       data:["搜索引擎","外部链接","直接访问"],
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
			            name: '直接访问',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			             color: ['#4fa8f9'],
			            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
			        },
			        {
			            name: '搜索引擎',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#6ec71e'],
			            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
			        },
			        {
			            name: '外部链接',
			            type: 'line',
			            symbol:'circle',/*折点样式*/
			            symbolSize: 5,
			            color: ['#f56e6a'],
			            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
			            
			        }
			      ]
			    };  
			    myChart2.setOption(option_two);
			                    }
			    );
				
			}
	});
	
	
	//来源类型
	$("#sourceType").click(function(){
        	 var max = 2;
    		 var engine = new Array();
    		 engine[0] = 0;
    		 engine[1] = 0;
    		 engine[2] = 0;
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
    		 $("#earch2").show();
    		 $("#echart_2").show();
    		 $("#earch3").hide();
    		 $("#echart_4").hide();
    		 $("#trend").empty();
    		 $("#temp4").val(0);
    		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
    			
    		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
    			var visitor = "new";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
    			var visitor = "old";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
    			var clientDevice = "pc";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
    			var clientDevice = "pc";
    			var visitor = "new";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
    			var clientDevice = "pc";
    			var visitor = "old";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
    			var clientDevice = "mobile";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
    			var clientDevice = "mobile";
    			var visitor = "new";
    		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
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
    			var clientDevice = "mobile";
    			var visitor = "old";
    		}
    		
    		var method = "source/all/a";
    		$.ajax({
    			cache : false,
    			url : "../../../StatisticsController/networkOverview.do",
    			type : "post",
    			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
    			dataType : "json",
    			async : false,
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
    		var method = "source/all/a";
    		$.ajax({
    			cache : false,
    			url : "../../../StatisticsController/networkOverview.do",
    			type : "post",
    			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
    			dataType : "json",
    			async : false,
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
    			var method = "source/all/a";
    			$.ajax({
    				cache : false,
    				url : "../../../StatisticsController/networkOverview.do",
    				type : "post",
    				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
    				dataType : "json",
    				async : false,
    				success : function(data) {
    					if (data.code==0010) {
    						alert(data.msg);
    					}else if(data.code==0000){
    						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
    				        {
    							if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
    								engine[0] = data.data.body.data[0].result.items[1][a][0];
    							}else if(data.data.body.data[0].result.items[0][a][0].name=='搜索引擎'){
    								engine[1] = data.data.body.data[0].result.items[1][a][0];
    							}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
    								engine[2] = data.data.body.data[0].result.items[1][a][0];
    							}
    				        }
    					}
    				},
    				error : function(request) {
    					alert("Connection error");
    				},
    			});
    			
    			//直接访问
    			var method = "trend/time/a";
    			var source = "through";
    			$.ajax({
    				cache : false,
    				url : "../../../StatisticsController/networkOverview.do",
    				type : "post",
    				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
    			
    			//搜索引擎
    			var method = "trend/time/a";
    			var source = "search,0";
    			$.ajax({
    				cache : false,
    				url : "../../../StatisticsController/networkOverview.do",
    				type : "post",
    				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
    			
    		//外部链接
    		var method = "trend/time/a";
    		var source = "link";
    		$.ajax({
    			cache : false,
    			url : "../../../StatisticsController/networkOverview.do",
    			type : "post",
    			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
    		
    		 // 路径配置   全部来源来源类型饼状图
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
    	   var myChart1 = echarts.init(document.getElementById('earch2'));
    	    // option 里面的内容基本涵盖你要画的图表的所有内容
    			option_one = {
    			    tooltip: {
    			        trigger: 'item',
    			        // formatter: "{a}<br/>{b}:{c}({d}%)"
    			    },
    			    series: [
    			        {
    			            name:'',
    			            type:'pie',
    			            selectedMode: 'single',
    			            radius: [0, '20%'],
    			
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
    			                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
    			                            align: 'right'
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
    			                {value:engine[0], name:'直接访问',fontSize:12},
    			                {value:engine[1], name:'搜索引擎',fontSize:12},
    			                {value:engine[2], name:'外部链接',fontSize:12}
    			            ],
    			            color:['#4fa8f9','#6ec71e','#f56e6a']
    			        }
    			    ]
    			};
    	    myChart1.setOption(option_one);
    	                }
    	    );
    	    
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
    	   var myChart2 = echarts.init(document.getElementById('echart_2'));
    	    // option 里面的内容基本涵盖你要画的图表的所有内容
    	    var option_two = {
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	     legend: {
    	       x: 'center',
    	       y:'bottom',
    	       data:["搜索引擎","外部链接","直接访问"],
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
    	            name: '直接访问',
    	            type: 'line',
    	            symbol:'circle',/*折点样式*/
    	            symbolSize: 5,
    	             color: ['#4fa8f9'],
    	            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
    	        },
    	        {
    	            name: '搜索引擎',
    	            type: 'line',
    	            symbol:'circle',/*折点样式*/
    	            symbolSize: 5,
    	            color: ['#6ec71e'],
    	            data: [hours[0],hours[1],hours[2],hours[3],hours[4],hours[5],hours[6],hours[7],hours[8],hours[9],hours[10],hours[11],hours[12],hours[13],hours[14],hours[15],hours[16],hours[17],hours[18],hours[19],hours[20],hours[21],hours[22],hours[23]]
    	        },
    	        {
    	            name: '外部链接',
    	            type: 'line',
    	            symbol:'circle',/*折点样式*/
    	            symbolSize: 5,
    	            color: ['#f56e6a'],
    	            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
    	            
    	        }
    	      ]
    	    };  
    	    myChart2.setOption(option_two);
    	                    }
    	    );
	});
	
	//来源网站
	$("#sourceWebsite").click(function(){
		 var max = 2;
		 var engine1 = new Array();
		 engine1[0] = 0;
		 engine1[1] = 0;
		 engine1[2] = 0;
		 engine1[3] = 0;
		 engine1[4] = 0;
		 engine1[5] = 0;
		 for(var a = 0; a <= 23; a++){
				hour[a] = 0;
				hours[a] = 0;
				hours1[a] = 0;
				hours2[a] = 0;
				hours3[a] = 0;
				hours4[a] = 0;
				hourss[a] = 0;
		 }
		 $("#earch2").hide();
		 $("#echart_2").hide();
		 $("#earch3").show();
		 $("#echart_4").show();
		 $("#trend").empty();
		 $("#temp4").val(1);
		
		if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			var viewType = "site";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			var viewType = "site";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			var viewType = "site";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			var viewType = "site";
			var clientDevice = "pc";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			var viewType = "site";
			var clientDevice = "pc";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			var viewType = "site";
			var clientDevice = "pc";
			var visitor = "old";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			var viewType = "site";
			var clientDevice = "mobile";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			var viewType = "site";
			var clientDevice = "mobile";
			var visitor = "new";
		}else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
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
			var viewType = "site";
			var clientDevice = "mobile";
			var visitor = "old";
		}
		
		var method = "source/all/a";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
			dataType : "json",
			async : false,
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
		  			
		  			//饼状图
		  			for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
			        {
						if(data.data.body.data[0].result.items[0][a][0].name=='直接访问'){
							engine1[0] = data.data.body.data[0].result.items[1][a][0];
						}else if(data.data.body.data[0].result.items[0][a][0].name=='百度'){
							engine1[1] = data.data.body.data[0].result.items[1][a][0];
						}else if(data.data.body.data[0].result.items[0][a][0].name=='搜狗'){
							engine1[2] = data.data.body.data[0].result.items[1][a][0];
						}else if(data.data.body.data[0].result.items[0][a][0].name=='360搜索'){
							engine1[3] = data.data.body.data[0].result.items[1][a][0];
						}else if(data.data.body.data[0].result.items[0][a][0].name=='Google'){
							engine1[4] = data.data.body.data[0].result.items[1][a][0];
						}else if(data.data.body.data[0].result.items[0][a][0].name=='外部链接'){
							engine1[5] = data.data.body.data[0].result.items[1][a][0];
						}
			        }
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
		
		//直接访问
		var method = "trend/time/a";
		var source = "through";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
		//搜索引擎
		var method = "trend/time/a";
		var source = "search,0";
		$.ajax({
			cache : false,
			url : "../../../StatisticsController/networkOverview.do",
			type : "post",
			data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
			
			//百度曲线图
			var method = "trend/time/a";
			var source = "search,1";
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
							for(var a = 0; a <= HH; a++){
								hours1[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours1[a]){
									max=hours1[a];
								}
								if(hours1[a]=='--'){
									hours1[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours2[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours2[a]){
									max=hours2[a];
								}
								if(hours2[a]=='--'){
									hours2[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours3[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours3[a]){
									max=hours3[a];
								}
								if(hours3[a]=='--'){
									hours3[a] = 0;
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
							for(var a = 0; a <= HH; a++){
								hours4[a] = data.data.body.data[0].result.items[1][ss][0];
								if(max<hours4[a]){
									max=hours4[a];
								}
								if(hours4[a]=='--'){
									hours4[a] = 0;
								}
								ss--;
							}
						}
					},
					error : function(request) {
						alert("Connection error");
					},
				});						
				//外部链接
				var method = "trend/time/a";
				var source = "link";
				$.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor,"clientDevice":clientDevice,"viewType":viewType},
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
		
	    
	    // 路径配置   全部来源来源类型饼状图
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
	   var myChart1 = echarts.init(document.getElementById('earch3'));
	    // option 里面的内容基本涵盖你要画的图表的所有内容
			option_one = {
			    tooltip: {
			        trigger: 'item',
			        // formatter: "{a}<br/>{b}:{c}({d}%)"
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '20%'],
			
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
			                    formatter: '{b|{b}:}{c}\n{per|{d}%} ',
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
			                            align: 'right'
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
			                {value:engine1[0], name:'直接访问',fontSize:12},
			                {value:engine1[1], name:'百度',fontSize:12},
			                {value:engine1[2], name:'搜狗',fontSize:12},
			                {value:engine1[3], name:'360搜索',fontSize:12},
			                {value:engine1[4], name:'Google',fontSize:12},
			                {value:engine1[5], name:'外部链接',fontSize:12}
			            ],
			            color:['#4fa8f9','#6ec71e','#f56e6a','#fc8b40','#818af8','#30c9d7']
			        }
			    ]
			};
	    myChart1.setOption(option_one);
	                }
	    );
	    
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
	   var myChart2 = echarts.init(document.getElementById('echart_4'));
	    // option 里面的内容基本涵盖你要画的图表的所有内容
	    var option_two = {
	    tooltip : {
	        trigger: 'axis'
	    },
	     legend: {
	       x: 'center',
	       y:'bottom',
	       data:["直接访问","百度","搜狗","360搜索","Google","外部链接"],
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
	     	            name: '直接访问',
	     	            type: 'line',
	     	            symbol:'circle',/*折点样式*/
	     	            symbolSize: 5,
	     	             color: ['#4fa8f9'],
	     	            data: [hour[0],hour[1],hour[2],hour[3],hour[4],hour[5],hour[6],hour[7],hour[8],hour[9],hour[10],hour[11],hour[12],hour[13],hour[14],hour[15],hour[16],hour[17],hour[18],hour[19],hour[20],hour[21],hour[22],hour[23]]
	     	        },
	     	        {
	     	            name: '百度',
	     	            type: 'line',
	     	            symbol:'circle',/*折点样式*/
	     	            symbolSize: 5,
	     	            color: ['#6ec71e'],
	     	            data: [hours1[0],hours1[1],hours1[2],hours1[3],hours1[4],hours1[5],hours1[6],hours1[7],hours1[8],hours1[9],hours1[10],hours1[11],hours1[12],hours1[13],hours1[14],hours1[15],hours1[16],hours1[17],hours1[18],hours1[19],hours1[20],hours1[21],hours1[22],hours1[23]]
	     	        },
	     	        {
	     	            name: '搜狗',
	     	            type: 'line',
	     	            symbol:'circle',/*折点样式*/
	     	            symbolSize: 5,
	     	            color: ['#f56e6a'],
	     	            data: [hours2[0],hours2[1],hours2[2],hours2[3],hours2[4],hours2[5],hours2[6],hours2[7],hours2[8],hours2[9],hours2[10],hours2[11],hours2[12],hours2[13],hours2[14],hours2[15],hours2[16],hours2[17],hours2[18],hours2[19],hours2[20],hours2[21],hours2[22],hours2[23]]
	     	            
	     	        },
	     	        {
	     	            name: '360搜索',
	     	            type: 'line',
	     	            symbol:'circle',/*折点样式*/
	     	            symbolSize: 5,
	     	            color: ['#fc8b40'],
	     	            data: [hours3[0],hours3[1],hours3[2],hours3[3],hours3[4],hours3[5],hours3[6],hours3[7],hours3[8],hours3[9],hours3[10],hours3[11],hours3[12],hours3[13],hours3[14],hours3[15],hours3[16],hours3[17],hours3[18],hours3[19],hours3[20],hours3[21],hours3[22],hours3[23]]
	     	            
	     	        },
	     	        {
	     	            name: 'Google',
	     	            type: 'line',
	     	            symbol:'circle',/*折点样式*/
	     	            symbolSize: 5,
	     	            color: ['#818af8'],
	     	            data: [hours4[0],hours4[1],hours4[2],hours4[3],hours4[4],hours4[5],hours4[6],hours4[7],hours4[8],hours4[9],hours4[10],hours4[11],hours4[12],hours4[13],hours4[14],hours4[15],hours4[16],hours4[17],hours4[18],hours4[19],hours4[20],hours4[21],hours4[22],hours4[23]]
	     	            
	     	        },
	     	        {
	     	            name: '外部链接',
	     	            type: 'line',
	     	            symbol:'circle',/*折点样式*/
	     	            symbolSize: 5,
	     	            color: ['#30c9d7'],
	     	            data: [hourss[0],hourss[1],hourss[2],hourss[3],hourss[4],hourss[5],hourss[6],hourss[7],hourss[8],hourss[9],hourss[10],hourss[11],hourss[12],hourss[13],hourss[14],hourss[15],hourss[16],hourss[17],hourss[18],hourss[19],hourss[20],hourss[21],hourss[22],hourss[23]]
	     	            
	     	        }
	     	      ]
	    };  
	    myChart2.setOption(option_two);
	                    }
	    );
		
	});
})