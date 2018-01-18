$(function(){
	var maps = new Array();
	maps[0] = 0;
	maps[1] = 0;
	maps[2] = 0;
	maps[3] = 0;
	maps[4] = 0;
	maps[5] = 0;
	maps[6] = 0;
	maps[7] = 0;
	maps[8] = 0;
	maps[9] = 0;
	maps[10] = 0;
	maps[11] = 0;
	maps[12] = 0;
	maps[13] = 0;
	maps[14] = 0;
	maps[15] = 0;
	maps[16] = 0;
	maps[17] = 0;
	maps[18] = 0;
	maps[19] = 0;
	maps[20] = 0;
	maps[21] = 0;
	maps[22] = 0;
	maps[23] = 0;
	maps[24] = 0;
	maps[25] = 0;
	maps[26] = 0;
	maps[27] = 0;
	maps[28] = 0;
	maps[29] = 0;
	maps[30] = 0;
	maps[31] = 0;
	maps[32] = 0;
	maps[33] = 0;
	
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
	var siteId = "10537683";
	var start_date = time1;
	var end_date = time;
	
	var source = "";
	var visitor = "";
	var clientDevice = "";
	
	 //显示全部
	function first(){
		 var method = "visit/district/a";
			
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
				           //获取tbody  
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==0){
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}else if(b==1){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}
				  				
				  			}
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend1");  
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
						
						var tbody1 = document.getElementById("trend1");  
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
			
			//地图
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
								maps[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
								maps[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
								maps[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
								maps[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
								maps[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
								maps[5] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
								maps[6] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
								maps[7] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
								maps[8] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
								maps[9] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
								maps[10] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
								maps[11] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
								maps[12] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
								maps[13] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
								maps[14] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
								maps[15] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
								maps[16] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
								maps[17] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
								maps[18] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
								maps[19] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
								maps[20] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
								maps[21] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
								maps[22] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
								maps[23] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
								maps[24] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
								maps[25] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
								maps[26] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
								maps[27] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
								maps[28] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
								maps[29] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
								maps[30] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
								maps[31] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
								maps[32] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
								maps[33] = data.data.body.data[0].result.items[1][a][0];
							}
				        }
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
		                var myChart_map = ec.init(document.getElementById('main_map'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_map = {
		                    tooltip : {
		                        trigger: 'item'
		                    },
		                    legend: {
		                        orient: 'horizontal',
		                        x:'left',
		                        data:['','']
		                    },
		                    dataRange: {
		                        min: 0,
		                        max: 2500,
		                        x: 'left',
		                        y: 'bottom',
		                        text:['高','低'],           // 文本，默认为数值文本
		                        calculable : true,
		                        itemWidth:10,  
				                // 图例图形高度  
				                itemHeight:10,  
				                orient: 'horizontal',
				                
		                    },
		                    series : [
		                        {
		                            name: '浏览量',
		                            type: 'map',
		                            mapType: 'china',
		                            roam: false,
		                            itemStyle: itemStyle,
		                            data:[
		                                {name: '北京',value: maps[0]},
		                                {name: '天津',value: maps[1]},
		                                {name: '上海',value: maps[2]},
		                                {name: '重庆',value: maps[3]},
		                                {name: '河北',value: maps[4]},
		                                {name: '河南',value: maps[5]},
		                                {name: '云南',value: maps[6]},
		                                {name: '辽宁',value: maps[7]},
		                                {name: '黑龙江',value: maps[8]},
		                                {name: '湖南',value: maps[9]},
		                                {name: '安徽',value: maps[10]},
		                                {name: '山东',value: maps[11]},
		                                {name: '新疆',value: maps[12]},
		                                {name: '江苏',value: maps[13]},
		                                {name: '浙江',value: maps[14]},
		                                {name: '江西',value: maps[15]},
		                                {name: '湖北',value: maps[16]},
		                                {name: '广西',value: maps[17]},
		                                {name: '甘肃',value: maps[18]},
		                                {name: '山西',value: maps[19]},
		                                {name: '内蒙古',value: maps[20]},
		                                {name: '陕西',value: maps[21]},
		                                {name: '吉林',value: maps[22]},
		                                {name: '福建',value: maps[23]},
		                                {name: '贵州',value: maps[24]},
		                                {name: '广东',value: maps[25]},
		                                {name: '青海',value: maps[26]},
		                                {name: '西藏',value: maps[27]},
		                                {name: '四川',value: maps[28]},
		                                {name: '宁夏',value: maps[29]},
		                                {name: '海南',value: maps[30]},
		                                {name: '台湾',value: maps[31]},
		                                {name: '香港',value: maps[32]},
		                                {name: '澳门',value: maps[33]}
		                            ]
		                      },
		                    ]
		                };
		                // 为echarts对象加载数据
		                myChart_map.setOption(option_map);
		            }
		    );
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
			 //window.location.href="../../../index.htm";
		 }
	 }else{
		 $("#userId").html(userName);
	 }
	 first();
	 
   //今天
	 $("#today").click(function(){
		 var maps = new Array();
		 maps[0] = 0;
		 maps[1] = 0;
		 maps[2] = 0;
		 maps[3] = 0;
		 maps[4] = 0;
		 maps[5] = 0;
		 maps[6] = 0;
		 maps[7] = 0;
		 maps[8] = 0;
		 maps[9] = 0;
		 maps[10] = 0;
		 maps[11] = 0;
		 maps[12] = 0;
		 maps[13] = 0;
		 maps[14] = 0;
		 maps[15] = 0;
		 maps[16] = 0;
		 maps[17] = 0;
		 maps[18] = 0;
		 maps[19] = 0;
		 maps[20] = 0;
		 maps[21] = 0;
		 maps[22] = 0;
		 maps[23] = 0;
		 maps[24] = 0;
		 maps[25] = 0;
		 maps[26] = 0;
		 maps[27] = 0;
		 maps[28] = 0;
		 maps[29] = 0;
		 maps[30] = 0;
		 maps[31] = 0;
		 maps[32] = 0;
		 maps[33] = 0;
		 $("#trend").empty();
		 $("#trend1").empty();
		 $("#temp1").val(0);
		 if($("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0){
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1){
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2){
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1){
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2){
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0){
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1){
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==2){
			 var source = "link";
			 var visitor = "old";
		 }
		 
		 var method = "visit/district/a";
			
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
				           //获取tbody  
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==0){
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}else if(b==1){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}
				  				
				  			}
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend1");  
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
						
						var tbody1 = document.getElementById("trend1");  
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
			
			//地图
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
								maps[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
								maps[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
								maps[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
								maps[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
								maps[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
								maps[5] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
								maps[6] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
								maps[7] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
								maps[8] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
								maps[9] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
								maps[10] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
								maps[11] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
								maps[12] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
								maps[13] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
								maps[14] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
								maps[15] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
								maps[16] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
								maps[17] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
								maps[18] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
								maps[19] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
								maps[20] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
								maps[21] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
								maps[22] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
								maps[23] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
								maps[24] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
								maps[25] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
								maps[26] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
								maps[27] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
								maps[28] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
								maps[29] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
								maps[30] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
								maps[31] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
								maps[32] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
								maps[33] = data.data.body.data[0].result.items[1][a][0];
							}
				        }
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
		                var myChart_map = ec.init(document.getElementById('main_map'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_map = {
		                    tooltip : {
		                        trigger: 'item'
		                    },
		                    legend: {
		                        orient: 'horizontal',
		                        x:'left',
		                        data:['','']
		                    },
		                    dataRange: {
		                        min: 0,
		                        max: 2500,
		                        x: 'left',
		                        y: 'bottom',
		                        text:['高','低'],           // 文本，默认为数值文本
		                        calculable : true,
		                        itemWidth:10,  
				                // 图例图形高度  
				                itemHeight:10,  
				                orient: 'horizontal',
				                
		                    },
		                    series : [
		                        {
		                            name: '浏览量',
		                            type: 'map',
		                            mapType: 'china',
		                            roam: false,
		                            itemStyle: itemStyle,
		                            data:[
		                                {name: '北京',value: maps[0]},
		                                {name: '天津',value: maps[1]},
		                                {name: '上海',value: maps[2]},
		                                {name: '重庆',value: maps[3]},
		                                {name: '河北',value: maps[4]},
		                                {name: '河南',value: maps[5]},
		                                {name: '云南',value: maps[6]},
		                                {name: '辽宁',value: maps[7]},
		                                {name: '黑龙江',value: maps[8]},
		                                {name: '湖南',value: maps[9]},
		                                {name: '安徽',value: maps[10]},
		                                {name: '山东',value: maps[11]},
		                                {name: '新疆',value: maps[12]},
		                                {name: '江苏',value: maps[13]},
		                                {name: '浙江',value: maps[14]},
		                                {name: '江西',value: maps[15]},
		                                {name: '湖北',value: maps[16]},
		                                {name: '广西',value: maps[17]},
		                                {name: '甘肃',value: maps[18]},
		                                {name: '山西',value: maps[19]},
		                                {name: '内蒙古',value: maps[20]},
		                                {name: '陕西',value: maps[21]},
		                                {name: '吉林',value: maps[22]},
		                                {name: '福建',value: maps[23]},
		                                {name: '贵州',value: maps[24]},
		                                {name: '广东',value: maps[25]},
		                                {name: '青海',value: maps[26]},
		                                {name: '西藏',value: maps[27]},
		                                {name: '四川',value: maps[28]},
		                                {name: '宁夏',value: maps[29]},
		                                {name: '海南',value: maps[30]},
		                                {name: '台湾',value: maps[31]},
		                                {name: '香港',value: maps[32]},
		                                {name: '澳门',value: maps[33]}
		                            ]
		                      },
		                    ]
		                };
		                // 为echarts对象加载数据
		                myChart_map.setOption(option_map);
		            }
		    );
	 });
	 
	 //昨天
	 $("#yesterday").click(function(){
		 var maps = new Array();
		 maps[0] = 0;
		 maps[1] = 0;
		 maps[2] = 0;
		 maps[3] = 0;
		 maps[4] = 0;
		 maps[5] = 0;
		 maps[6] = 0;
		 maps[7] = 0;
		 maps[8] = 0;
		 maps[9] = 0;
		 maps[10] = 0;
		 maps[11] = 0;
		 maps[12] = 0;
		 maps[13] = 0;
		 maps[14] = 0;
		 maps[15] = 0;
		 maps[16] = 0;
		 maps[17] = 0;
		 maps[18] = 0;
		 maps[19] = 0;
		 maps[20] = 0;
		 maps[21] = 0;
		 maps[22] = 0;
		 maps[23] = 0;
		 maps[24] = 0;
		 maps[25] = 0;
		 maps[26] = 0;
		 maps[27] = 0;
		 maps[28] = 0;
		 maps[29] = 0;
		 maps[30] = 0;
		 maps[31] = 0;
		 maps[32] = 0;
		 maps[33] = 0;
		 $("#trend").empty();
		 $("#trend1").empty();
		 $("#temp1").val(1);
		 if($("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0){
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1){
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2){
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0){
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1){
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2){
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0){
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1){
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==2){
			 var source = "link";
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
		
		 var method = "visit/district/a";
			
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
				           //获取tbody  
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==0){
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}else if(b==1){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}
				  				
				  			}
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend1");  
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
						
						var tbody1 = document.getElementById("trend1");  
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
			
			//地图
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
								maps[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
								maps[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
								maps[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
								maps[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
								maps[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
								maps[5] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
								maps[6] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
								maps[7] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
								maps[8] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
								maps[9] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
								maps[10] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
								maps[11] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
								maps[12] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
								maps[13] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
								maps[14] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
								maps[15] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
								maps[16] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
								maps[17] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
								maps[18] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
								maps[19] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
								maps[20] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
								maps[21] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
								maps[22] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
								maps[23] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
								maps[24] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
								maps[25] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
								maps[26] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
								maps[27] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
								maps[28] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
								maps[29] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
								maps[30] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
								maps[31] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
								maps[32] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
								maps[33] = data.data.body.data[0].result.items[1][a][0];
							}
				        }
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
		                var myChart_map = ec.init(document.getElementById('main_map'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_map = {
		                    tooltip : {
		                        trigger: 'item'
		                    },
		                    legend: {
		                        orient: 'horizontal',
		                        x:'left',
		                        data:['','']
		                    },
		                    dataRange: {
		                        min: 0,
		                        max: 2500,
		                        x: 'left',
		                        y: 'bottom',
		                        text:['高','低'],           // 文本，默认为数值文本
		                        calculable : true,
		                        itemWidth:10,  
				                // 图例图形高度  
				                itemHeight:10,  
				                orient: 'horizontal',
				                
		                    },
		                    series : [
		                        {
		                            name: '浏览量',
		                            type: 'map',
		                            mapType: 'china',
		                            roam: false,
		                            itemStyle: itemStyle,
		                            data:[
		                                {name: '北京',value: maps[0]},
		                                {name: '天津',value: maps[1]},
		                                {name: '上海',value: maps[2]},
		                                {name: '重庆',value: maps[3]},
		                                {name: '河北',value: maps[4]},
		                                {name: '河南',value: maps[5]},
		                                {name: '云南',value: maps[6]},
		                                {name: '辽宁',value: maps[7]},
		                                {name: '黑龙江',value: maps[8]},
		                                {name: '湖南',value: maps[9]},
		                                {name: '安徽',value: maps[10]},
		                                {name: '山东',value: maps[11]},
		                                {name: '新疆',value: maps[12]},
		                                {name: '江苏',value: maps[13]},
		                                {name: '浙江',value: maps[14]},
		                                {name: '江西',value: maps[15]},
		                                {name: '湖北',value: maps[16]},
		                                {name: '广西',value: maps[17]},
		                                {name: '甘肃',value: maps[18]},
		                                {name: '山西',value: maps[19]},
		                                {name: '内蒙古',value: maps[20]},
		                                {name: '陕西',value: maps[21]},
		                                {name: '吉林',value: maps[22]},
		                                {name: '福建',value: maps[23]},
		                                {name: '贵州',value: maps[24]},
		                                {name: '广东',value: maps[25]},
		                                {name: '青海',value: maps[26]},
		                                {name: '西藏',value: maps[27]},
		                                {name: '四川',value: maps[28]},
		                                {name: '宁夏',value: maps[29]},
		                                {name: '海南',value: maps[30]},
		                                {name: '台湾',value: maps[31]},
		                                {name: '香港',value: maps[32]},
		                                {name: '澳门',value: maps[33]}
		                            ]
		                      },
		                    ]
		                };
		                // 为echarts对象加载数据
		                myChart_map.setOption(option_map);
		            }
		    );
	 });
	 
	 //来源
	 $("#source").change(function(){
		    var opt= $("#source").val();
		    if(opt==0){
		    	 var maps = new Array();
				 maps[0] = 0;
				 maps[1] = 0;
				 maps[2] = 0;
				 maps[3] = 0;
				 maps[4] = 0;
				 maps[5] = 0;
				 maps[6] = 0;
				 maps[7] = 0;
				 maps[8] = 0;
				 maps[9] = 0;
				 maps[10] = 0;
				 maps[11] = 0;
				 maps[12] = 0;
				 maps[13] = 0;
				 maps[14] = 0;
				 maps[15] = 0;
				 maps[16] = 0;
				 maps[17] = 0;
				 maps[18] = 0;
				 maps[19] = 0;
				 maps[20] = 0;
				 maps[21] = 0;
				 maps[22] = 0;
				 maps[23] = 0;
				 maps[24] = 0;
				 maps[25] = 0;
				 maps[26] = 0;
				 maps[27] = 0;
				 maps[28] = 0;
				 maps[29] = 0;
				 maps[30] = 0;
				 maps[31] = 0;
				 maps[32] = 0;
				 maps[33] = 0;
				 $("#trend").empty();
				 $("#trend1").empty();
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
							var visitor = "old";
					}
				 
				 var method = "visit/district/a";
					
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
						           //获取tbody  
						            var tbody = document.getElementById("trend");  
						  			var str = "";
						  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
						  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
						  				if(b==0){
						  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  				}else if(b==1){
						  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
						  				}
						  				
						  			}
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {  
						           //获取tbody  
						            var s= a+1;
						            var tbody = document.getElementById("trend1");  
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
								
								var tbody1 = document.getElementById("trend1");  
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
					
					//地图
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
									if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
										maps[0] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
										maps[1] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
										maps[2] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
										maps[3] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
										maps[4] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
										maps[5] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
										maps[6] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
										maps[7] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
										maps[8] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
										maps[9] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
										maps[10] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
										maps[11] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
										maps[12] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
										maps[13] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
										maps[14] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
										maps[15] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
										maps[16] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
										maps[17] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
										maps[18] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
										maps[19] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
										maps[20] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
										maps[21] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
										maps[22] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
										maps[23] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
										maps[24] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
										maps[25] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
										maps[26] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
										maps[27] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
										maps[28] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
										maps[29] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
										maps[30] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
										maps[31] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
										maps[32] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
										maps[33] = data.data.body.data[0].result.items[1][a][0];
									}
						        }
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
				                var myChart_map = ec.init(document.getElementById('main_map'));

				                var itemStyle = {
				                    normal:{label:{
				                        show:true,
				                        formatter:'{b}',
				                        textStyle: {fontSize: 10,fontWeight : 'bold'}
				                    }},
				                    emphasis:{label:{show:true}}
				                };
				                var option_map = {
				                    tooltip : {
				                        trigger: 'item'
				                    },
				                    legend: {
				                        orient: 'horizontal',
				                        x:'left',
				                        data:['','']
				                    },
				                    dataRange: {
				                        min: 0,
				                        max: 2500,
				                        x: 'left',
				                        y: 'bottom',
				                        text:['高','低'],           // 文本，默认为数值文本
				                        calculable : true,
				                        itemWidth:10,  
						                // 图例图形高度  
						                itemHeight:10,  
						                orient: 'horizontal',
						                
				                    },
				                    series : [
				                        {
				                            name: '浏览量',
				                            type: 'map',
				                            mapType: 'china',
				                            roam: false,
				                            itemStyle: itemStyle,
				                            data:[
				                                {name: '北京',value: maps[0]},
				                                {name: '天津',value: maps[1]},
				                                {name: '上海',value: maps[2]},
				                                {name: '重庆',value: maps[3]},
				                                {name: '河北',value: maps[4]},
				                                {name: '河南',value: maps[5]},
				                                {name: '云南',value: maps[6]},
				                                {name: '辽宁',value: maps[7]},
				                                {name: '黑龙江',value: maps[8]},
				                                {name: '湖南',value: maps[9]},
				                                {name: '安徽',value: maps[10]},
				                                {name: '山东',value: maps[11]},
				                                {name: '新疆',value: maps[12]},
				                                {name: '江苏',value: maps[13]},
				                                {name: '浙江',value: maps[14]},
				                                {name: '江西',value: maps[15]},
				                                {name: '湖北',value: maps[16]},
				                                {name: '广西',value: maps[17]},
				                                {name: '甘肃',value: maps[18]},
				                                {name: '山西',value: maps[19]},
				                                {name: '内蒙古',value: maps[20]},
				                                {name: '陕西',value: maps[21]},
				                                {name: '吉林',value: maps[22]},
				                                {name: '福建',value: maps[23]},
				                                {name: '贵州',value: maps[24]},
				                                {name: '广东',value: maps[25]},
				                                {name: '青海',value: maps[26]},
				                                {name: '西藏',value: maps[27]},
				                                {name: '四川',value: maps[28]},
				                                {name: '宁夏',value: maps[29]},
				                                {name: '海南',value: maps[30]},
				                                {name: '台湾',value: maps[31]},
				                                {name: '香港',value: maps[32]},
				                                {name: '澳门',value: maps[33]}
				                            ]
				                      },
				                    ]
				                };
				                // 为echarts对象加载数据
				                myChart_map.setOption(option_map);
				            }
				    );
		    }else if(opt==1){
		    	 var maps = new Array();
				 maps[0] = 0;
				 maps[1] = 0;
				 maps[2] = 0;
				 maps[3] = 0;
				 maps[4] = 0;
				 maps[5] = 0;
				 maps[6] = 0;
				 maps[7] = 0;
				 maps[8] = 0;
				 maps[9] = 0;
				 maps[10] = 0;
				 maps[11] = 0;
				 maps[12] = 0;
				 maps[13] = 0;
				 maps[14] = 0;
				 maps[15] = 0;
				 maps[16] = 0;
				 maps[17] = 0;
				 maps[18] = 0;
				 maps[19] = 0;
				 maps[20] = 0;
				 maps[21] = 0;
				 maps[22] = 0;
				 maps[23] = 0;
				 maps[24] = 0;
				 maps[25] = 0;
				 maps[26] = 0;
				 maps[27] = 0;
				 maps[28] = 0;
				 maps[29] = 0;
				 maps[30] = 0;
				 maps[31] = 0;
				 maps[32] = 0;
				 maps[33] = 0;
				 $("#trend").empty();
				 $("#trend1").empty();
				 $("#temp2").val(1);
				 if($("#temp1").val()==0&&$("#temp3").val()==0){
					 var source = "through";
				 }else if($("#temp1").val()==0&&$("#temp3").val()==1){
					 var source = "through";
					 var visitor = "new";
				 }else if($("#temp1").val()==0&&$("#temp3").val()==2){
					 var source = "through";
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
					var source = "through";
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
					var source = "through";
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
					var source = "through";
					var visitor = "old";
				 }
				 
				 var method = "visit/district/a";
					
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
						           //获取tbody  
						            var tbody = document.getElementById("trend");  
						  			var str = "";
						  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
						  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
						  				if(b==0){
						  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  				}else if(b==1){
						  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
						  				}
						  				
						  			}
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {  
						           //获取tbody  
						            var s= a+1;
						            var tbody = document.getElementById("trend1");  
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
								
								var tbody1 = document.getElementById("trend1");  
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
					
					//地图
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
									if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
										maps[0] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
										maps[1] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
										maps[2] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
										maps[3] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
										maps[4] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
										maps[5] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
										maps[6] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
										maps[7] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
										maps[8] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
										maps[9] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
										maps[10] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
										maps[11] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
										maps[12] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
										maps[13] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
										maps[14] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
										maps[15] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
										maps[16] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
										maps[17] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
										maps[18] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
										maps[19] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
										maps[20] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
										maps[21] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
										maps[22] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
										maps[23] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
										maps[24] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
										maps[25] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
										maps[26] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
										maps[27] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
										maps[28] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
										maps[29] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
										maps[30] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
										maps[31] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
										maps[32] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
										maps[33] = data.data.body.data[0].result.items[1][a][0];
									}
						        }
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
				                var myChart_map = ec.init(document.getElementById('main_map'));

				                var itemStyle = {
				                    normal:{label:{
				                        show:true,
				                        formatter:'{b}',
				                        textStyle: {fontSize: 10,fontWeight : 'bold'}
				                    }},
				                    emphasis:{label:{show:true}}
				                };
				                var option_map = {
				                    tooltip : {
				                        trigger: 'item'
				                    },
				                    legend: {
				                        orient: 'horizontal',
				                        x:'left',
				                        data:['','']
				                    },
				                    dataRange: {
				                        min: 0,
				                        max: 2500,
				                        x: 'left',
				                        y: 'bottom',
				                        text:['高','低'],           // 文本，默认为数值文本
				                        calculable : true,
				                        itemWidth:10,  
						                // 图例图形高度  
						                itemHeight:10,  
						                orient: 'horizontal',
						                
				                    },
				                    series : [
				                        {
				                            name: '浏览量',
				                            type: 'map',
				                            mapType: 'china',
				                            roam: false,
				                            itemStyle: itemStyle,
				                            data:[
				                                {name: '北京',value: maps[0]},
				                                {name: '天津',value: maps[1]},
				                                {name: '上海',value: maps[2]},
				                                {name: '重庆',value: maps[3]},
				                                {name: '河北',value: maps[4]},
				                                {name: '河南',value: maps[5]},
				                                {name: '云南',value: maps[6]},
				                                {name: '辽宁',value: maps[7]},
				                                {name: '黑龙江',value: maps[8]},
				                                {name: '湖南',value: maps[9]},
				                                {name: '安徽',value: maps[10]},
				                                {name: '山东',value: maps[11]},
				                                {name: '新疆',value: maps[12]},
				                                {name: '江苏',value: maps[13]},
				                                {name: '浙江',value: maps[14]},
				                                {name: '江西',value: maps[15]},
				                                {name: '湖北',value: maps[16]},
				                                {name: '广西',value: maps[17]},
				                                {name: '甘肃',value: maps[18]},
				                                {name: '山西',value: maps[19]},
				                                {name: '内蒙古',value: maps[20]},
				                                {name: '陕西',value: maps[21]},
				                                {name: '吉林',value: maps[22]},
				                                {name: '福建',value: maps[23]},
				                                {name: '贵州',value: maps[24]},
				                                {name: '广东',value: maps[25]},
				                                {name: '青海',value: maps[26]},
				                                {name: '西藏',value: maps[27]},
				                                {name: '四川',value: maps[28]},
				                                {name: '宁夏',value: maps[29]},
				                                {name: '海南',value: maps[30]},
				                                {name: '台湾',value: maps[31]},
				                                {name: '香港',value: maps[32]},
				                                {name: '澳门',value: maps[33]}
				                            ]
				                      },
				                    ]
				                };
				                // 为echarts对象加载数据
				                myChart_map.setOption(option_map);
				            }
				    );
		    }else if(opt==2){
		    	 var maps = new Array();
				 maps[0] = 0;
				 maps[1] = 0;
				 maps[2] = 0;
				 maps[3] = 0;
				 maps[4] = 0;
				 maps[5] = 0;
				 maps[6] = 0;
				 maps[7] = 0;
				 maps[8] = 0;
				 maps[9] = 0;
				 maps[10] = 0;
				 maps[11] = 0;
				 maps[12] = 0;
				 maps[13] = 0;
				 maps[14] = 0;
				 maps[15] = 0;
				 maps[16] = 0;
				 maps[17] = 0;
				 maps[18] = 0;
				 maps[19] = 0;
				 maps[20] = 0;
				 maps[21] = 0;
				 maps[22] = 0;
				 maps[23] = 0;
				 maps[24] = 0;
				 maps[25] = 0;
				 maps[26] = 0;
				 maps[27] = 0;
				 maps[28] = 0;
				 maps[29] = 0;
				 maps[30] = 0;
				 maps[31] = 0;
				 maps[32] = 0;
				 maps[33] = 0;
				 $("#trend").empty();
				 $("#trend1").empty();
				 $("#temp2").val(2);
				 if($("#temp1").val()==0&&$("#temp3").val()==0){
					 var source = "search,0";
				 }else if($("#temp1").val()==0&&$("#temp3").val()==1){
					 var source = "search,0";
					 var visitor = "new";
				 }else if($("#temp1").val()==0&&$("#temp3").val()==2){
					 var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
					var visitor = "old";
				 }
				 
				 var method = "visit/district/a";
					
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
						           //获取tbody  
						            var tbody = document.getElementById("trend");  
						  			var str = "";
						  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
						  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
						  				if(b==0){
						  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  				}else if(b==1){
						  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
						  				}
						  				
						  			}
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {  
						           //获取tbody  
						            var s= a+1;
						            var tbody = document.getElementById("trend1");  
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
								
								var tbody1 = document.getElementById("trend1");  
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
					
					//地图
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
									if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
										maps[0] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
										maps[1] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
										maps[2] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
										maps[3] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
										maps[4] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
										maps[5] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
										maps[6] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
										maps[7] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
										maps[8] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
										maps[9] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
										maps[10] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
										maps[11] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
										maps[12] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
										maps[13] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
										maps[14] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
										maps[15] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
										maps[16] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
										maps[17] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
										maps[18] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
										maps[19] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
										maps[20] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
										maps[21] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
										maps[22] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
										maps[23] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
										maps[24] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
										maps[25] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
										maps[26] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
										maps[27] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
										maps[28] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
										maps[29] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
										maps[30] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
										maps[31] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
										maps[32] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
										maps[33] = data.data.body.data[0].result.items[1][a][0];
									}
						        }
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
				                var myChart_map = ec.init(document.getElementById('main_map'));

				                var itemStyle = {
				                    normal:{label:{
				                        show:true,
				                        formatter:'{b}',
				                        textStyle: {fontSize: 10,fontWeight : 'bold'}
				                    }},
				                    emphasis:{label:{show:true}}
				                };
				                var option_map = {
				                    tooltip : {
				                        trigger: 'item'
				                    },
				                    legend: {
				                        orient: 'horizontal',
				                        x:'left',
				                        data:['','']
				                    },
				                    dataRange: {
				                        min: 0,
				                        max: 2500,
				                        x: 'left',
				                        y: 'bottom',
				                        text:['高','低'],           // 文本，默认为数值文本
				                        calculable : true,
				                        itemWidth:10,  
						                // 图例图形高度  
						                itemHeight:10,  
						                orient: 'horizontal',
						                
				                    },
				                    series : [
				                        {
				                            name: '浏览量',
				                            type: 'map',
				                            mapType: 'china',
				                            roam: false,
				                            itemStyle: itemStyle,
				                            data:[
				                                {name: '北京',value: maps[0]},
				                                {name: '天津',value: maps[1]},
				                                {name: '上海',value: maps[2]},
				                                {name: '重庆',value: maps[3]},
				                                {name: '河北',value: maps[4]},
				                                {name: '河南',value: maps[5]},
				                                {name: '云南',value: maps[6]},
				                                {name: '辽宁',value: maps[7]},
				                                {name: '黑龙江',value: maps[8]},
				                                {name: '湖南',value: maps[9]},
				                                {name: '安徽',value: maps[10]},
				                                {name: '山东',value: maps[11]},
				                                {name: '新疆',value: maps[12]},
				                                {name: '江苏',value: maps[13]},
				                                {name: '浙江',value: maps[14]},
				                                {name: '江西',value: maps[15]},
				                                {name: '湖北',value: maps[16]},
				                                {name: '广西',value: maps[17]},
				                                {name: '甘肃',value: maps[18]},
				                                {name: '山西',value: maps[19]},
				                                {name: '内蒙古',value: maps[20]},
				                                {name: '陕西',value: maps[21]},
				                                {name: '吉林',value: maps[22]},
				                                {name: '福建',value: maps[23]},
				                                {name: '贵州',value: maps[24]},
				                                {name: '广东',value: maps[25]},
				                                {name: '青海',value: maps[26]},
				                                {name: '西藏',value: maps[27]},
				                                {name: '四川',value: maps[28]},
				                                {name: '宁夏',value: maps[29]},
				                                {name: '海南',value: maps[30]},
				                                {name: '台湾',value: maps[31]},
				                                {name: '香港',value: maps[32]},
				                                {name: '澳门',value: maps[33]}
				                            ]
				                      },
				                    ]
				                };
				                // 为echarts对象加载数据
				                myChart_map.setOption(option_map);
				            }
				    );
		    }else if(opt==3){
		    	 var maps = new Array();
				 maps[0] = 0;
				 maps[1] = 0;
				 maps[2] = 0;
				 maps[3] = 0;
				 maps[4] = 0;
				 maps[5] = 0;
				 maps[6] = 0;
				 maps[7] = 0;
				 maps[8] = 0;
				 maps[9] = 0;
				 maps[10] = 0;
				 maps[11] = 0;
				 maps[12] = 0;
				 maps[13] = 0;
				 maps[14] = 0;
				 maps[15] = 0;
				 maps[16] = 0;
				 maps[17] = 0;
				 maps[18] = 0;
				 maps[19] = 0;
				 maps[20] = 0;
				 maps[21] = 0;
				 maps[22] = 0;
				 maps[23] = 0;
				 maps[24] = 0;
				 maps[25] = 0;
				 maps[26] = 0;
				 maps[27] = 0;
				 maps[28] = 0;
				 maps[29] = 0;
				 maps[30] = 0;
				 maps[31] = 0;
				 maps[32] = 0;
				 maps[33] = 0;
				 $("#trend").empty();
				 $("#trend1").empty();
				 $("#temp2").val(3);
				 if($("#temp1").val()==0&&$("#temp3").val()==0){
					 var source = "link";
				 }else if($("#temp1").val()==0&&$("#temp3").val()==1){
					 var source = "link";
					 var visitor = "new";
				 }else if($("#temp1").val()==0&&$("#temp3").val()==2){
					 var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
					var visitor = "old";
				 }
				 
				 var method = "visit/district/a";
					
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
						           //获取tbody  
						            var tbody = document.getElementById("trend");  
						  			var str = "";
						  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
						  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
						  				if(b==0){
						  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  				}else if(b==1){
						  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
						  				}
						  				
						  			}
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
					
					//展示内容
					var method = "visit/district/a";
					var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {  
						           //获取tbody  
						            var s= a+1;
						            var tbody = document.getElementById("trend1");  
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
								
								var tbody1 = document.getElementById("trend1");  
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
					
					//地图
					var method = "visit/district/a";
					var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
								for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
						        {
									if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
										maps[0] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
										maps[1] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
										maps[2] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
										maps[3] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
										maps[4] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
										maps[5] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
										maps[6] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
										maps[7] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
										maps[8] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
										maps[9] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
										maps[10] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
										maps[11] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
										maps[12] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
										maps[13] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
										maps[14] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
										maps[15] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
										maps[16] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
										maps[17] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
										maps[18] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
										maps[19] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
										maps[20] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
										maps[21] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
										maps[22] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
										maps[23] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
										maps[24] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
										maps[25] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
										maps[26] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
										maps[27] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
										maps[28] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
										maps[29] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
										maps[30] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
										maps[31] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
										maps[32] = data.data.body.data[0].result.items[1][a][0];
									}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
										maps[33] = data.data.body.data[0].result.items[1][a][0];
									}
						        }
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
				                var myChart_map = ec.init(document.getElementById('main_map'));

				                var itemStyle = {
				                    normal:{label:{
				                        show:true,
				                        formatter:'{b}',
				                        textStyle: {fontSize: 10,fontWeight : 'bold'}
				                    }},
				                    emphasis:{label:{show:true}}
				                };
				                var option_map = {
				                    tooltip : {
				                        trigger: 'item'
				                    },
				                    legend: {
				                        orient: 'horizontal',
				                        x:'left',
				                        data:['','']
				                    },
				                    dataRange: {
				                        min: 0,
				                        max: 2500,
				                        x: 'left',
				                        y: 'bottom',
				                        text:['高','低'],           // 文本，默认为数值文本
				                        calculable : true,
				                        itemWidth:10,  
						                // 图例图形高度  
						                itemHeight:10,  
						                orient: 'horizontal',
						                
				                    },
				                    series : [
				                        {
				                            name: '浏览量',
				                            type: 'map',
				                            mapType: 'china',
				                            roam: false,
				                            itemStyle: itemStyle,
				                            data:[
				                                {name: '北京',value: maps[0]},
				                                {name: '天津',value: maps[1]},
				                                {name: '上海',value: maps[2]},
				                                {name: '重庆',value: maps[3]},
				                                {name: '河北',value: maps[4]},
				                                {name: '河南',value: maps[5]},
				                                {name: '云南',value: maps[6]},
				                                {name: '辽宁',value: maps[7]},
				                                {name: '黑龙江',value: maps[8]},
				                                {name: '湖南',value: maps[9]},
				                                {name: '安徽',value: maps[10]},
				                                {name: '山东',value: maps[11]},
				                                {name: '新疆',value: maps[12]},
				                                {name: '江苏',value: maps[13]},
				                                {name: '浙江',value: maps[14]},
				                                {name: '江西',value: maps[15]},
				                                {name: '湖北',value: maps[16]},
				                                {name: '广西',value: maps[17]},
				                                {name: '甘肃',value: maps[18]},
				                                {name: '山西',value: maps[19]},
				                                {name: '内蒙古',value: maps[20]},
				                                {name: '陕西',value: maps[21]},
				                                {name: '吉林',value: maps[22]},
				                                {name: '福建',value: maps[23]},
				                                {name: '贵州',value: maps[24]},
				                                {name: '广东',value: maps[25]},
				                                {name: '青海',value: maps[26]},
				                                {name: '西藏',value: maps[27]},
				                                {name: '四川',value: maps[28]},
				                                {name: '宁夏',value: maps[29]},
				                                {name: '海南',value: maps[30]},
				                                {name: '台湾',value: maps[31]},
				                                {name: '香港',value: maps[32]},
				                                {name: '澳门',value: maps[33]}
				                            ]
				                      },
				                    ]
				                };
				                // 为echarts对象加载数据
				                myChart_map.setOption(option_map);
				            }
				    );	
		    }
	 });
	 
	 //访客
	 $("#visitor").click(function(){
		 var maps = new Array();
		 maps[0] = 0;
		 maps[1] = 0;
		 maps[2] = 0;
		 maps[3] = 0;
		 maps[4] = 0;
		 maps[5] = 0;
		 maps[6] = 0;
		 maps[7] = 0;
		 maps[8] = 0;
		 maps[9] = 0;
		 maps[10] = 0;
		 maps[11] = 0;
		 maps[12] = 0;
		 maps[13] = 0;
		 maps[14] = 0;
		 maps[15] = 0;
		 maps[16] = 0;
		 maps[17] = 0;
		 maps[18] = 0;
		 maps[19] = 0;
		 maps[20] = 0;
		 maps[21] = 0;
		 maps[22] = 0;
		 maps[23] = 0;
		 maps[24] = 0;
		 maps[25] = 0;
		 maps[26] = 0;
		 maps[27] = 0;
		 maps[28] = 0;
		 maps[29] = 0;
		 maps[30] = 0;
		 maps[31] = 0;
		 maps[32] = 0;
		 maps[33] = 0;
		 $("#trend").empty();
		 $("#trend1").empty();
		 $("#temp3").val(0);
		 if($("#temp1").val()==0&&$("#temp2").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1){
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2){
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3){
			 var source = "link";
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
			 var source = "through";
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
			 var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3){
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
			 var source = "link";
		 }
		 
		 var method = "visit/district/a";
			
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
				           //获取tbody  
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==0){
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}else if(b==1){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}
				  				
				  			}
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend1");  
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
						
						var tbody1 = document.getElementById("trend1");  
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
			
			//地图
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
								maps[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
								maps[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
								maps[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
								maps[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
								maps[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
								maps[5] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
								maps[6] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
								maps[7] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
								maps[8] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
								maps[9] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
								maps[10] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
								maps[11] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
								maps[12] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
								maps[13] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
								maps[14] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
								maps[15] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
								maps[16] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
								maps[17] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
								maps[18] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
								maps[19] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
								maps[20] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
								maps[21] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
								maps[22] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
								maps[23] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
								maps[24] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
								maps[25] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
								maps[26] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
								maps[27] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
								maps[28] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
								maps[29] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
								maps[30] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
								maps[31] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
								maps[32] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
								maps[33] = data.data.body.data[0].result.items[1][a][0];
							}
				        }
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
		                var myChart_map = ec.init(document.getElementById('main_map'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_map = {
		                    tooltip : {
		                        trigger: 'item'
		                    },
		                    legend: {
		                        orient: 'horizontal',
		                        x:'left',
		                        data:['','']
		                    },
		                    dataRange: {
		                        min: 0,
		                        max: 2500,
		                        x: 'left',
		                        y: 'bottom',
		                        text:['高','低'],           // 文本，默认为数值文本
		                        calculable : true,
		                        itemWidth:10,  
				                // 图例图形高度  
				                itemHeight:10,  
				                orient: 'horizontal',
				                
		                    },
		                    series : [
		                        {
		                            name: '浏览量',
		                            type: 'map',
		                            mapType: 'china',
		                            roam: false,
		                            itemStyle: itemStyle,
		                            data:[
		                                {name: '北京',value: maps[0]},
		                                {name: '天津',value: maps[1]},
		                                {name: '上海',value: maps[2]},
		                                {name: '重庆',value: maps[3]},
		                                {name: '河北',value: maps[4]},
		                                {name: '河南',value: maps[5]},
		                                {name: '云南',value: maps[6]},
		                                {name: '辽宁',value: maps[7]},
		                                {name: '黑龙江',value: maps[8]},
		                                {name: '湖南',value: maps[9]},
		                                {name: '安徽',value: maps[10]},
		                                {name: '山东',value: maps[11]},
		                                {name: '新疆',value: maps[12]},
		                                {name: '江苏',value: maps[13]},
		                                {name: '浙江',value: maps[14]},
		                                {name: '江西',value: maps[15]},
		                                {name: '湖北',value: maps[16]},
		                                {name: '广西',value: maps[17]},
		                                {name: '甘肃',value: maps[18]},
		                                {name: '山西',value: maps[19]},
		                                {name: '内蒙古',value: maps[20]},
		                                {name: '陕西',value: maps[21]},
		                                {name: '吉林',value: maps[22]},
		                                {name: '福建',value: maps[23]},
		                                {name: '贵州',value: maps[24]},
		                                {name: '广东',value: maps[25]},
		                                {name: '青海',value: maps[26]},
		                                {name: '西藏',value: maps[27]},
		                                {name: '四川',value: maps[28]},
		                                {name: '宁夏',value: maps[29]},
		                                {name: '海南',value: maps[30]},
		                                {name: '台湾',value: maps[31]},
		                                {name: '香港',value: maps[32]},
		                                {name: '澳门',value: maps[33]}
		                            ]
		                      },
		                    ]
		                };
		                // 为echarts对象加载数据
		                myChart_map.setOption(option_map);
		            }
		    );
	 });
	 
	 //新访客
	 $("#newV").click(function(){
		 var maps = new Array();
		 maps[0] = 0;
		 maps[1] = 0;
		 maps[2] = 0;
		 maps[3] = 0;
		 maps[4] = 0;
		 maps[5] = 0;
		 maps[6] = 0;
		 maps[7] = 0;
		 maps[8] = 0;
		 maps[9] = 0;
		 maps[10] = 0;
		 maps[11] = 0;
		 maps[12] = 0;
		 maps[13] = 0;
		 maps[14] = 0;
		 maps[15] = 0;
		 maps[16] = 0;
		 maps[17] = 0;
		 maps[18] = 0;
		 maps[19] = 0;
		 maps[20] = 0;
		 maps[21] = 0;
		 maps[22] = 0;
		 maps[23] = 0;
		 maps[24] = 0;
		 maps[25] = 0;
		 maps[26] = 0;
		 maps[27] = 0;
		 maps[28] = 0;
		 maps[29] = 0;
		 maps[30] = 0;
		 maps[31] = 0;
		 maps[32] = 0;
		 maps[33] = 0;
		 $("#trend").empty();
		 $("#trend1").empty();
		 $("#temp3").val(1);
		 if($("#temp1").val()==0&&$("#temp2").val()==0){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1){
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2){
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3){
			 var visitor = "new";
			 var source = "link";
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
			 var source = "through";
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
			 var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3){
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
			 var source = "link";
		 } 
		 
		 var method = "visit/district/a";
			
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
				           //获取tbody  
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==0){
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}else if(b==1){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}
				  				
				  			}
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend1");  
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
						
						var tbody1 = document.getElementById("trend1");  
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
			
			//地图
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
								maps[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
								maps[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
								maps[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
								maps[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
								maps[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
								maps[5] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
								maps[6] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
								maps[7] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
								maps[8] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
								maps[9] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
								maps[10] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
								maps[11] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
								maps[12] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
								maps[13] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
								maps[14] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
								maps[15] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
								maps[16] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
								maps[17] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
								maps[18] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
								maps[19] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
								maps[20] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
								maps[21] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
								maps[22] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
								maps[23] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
								maps[24] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
								maps[25] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
								maps[26] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
								maps[27] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
								maps[28] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
								maps[29] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
								maps[30] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
								maps[31] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
								maps[32] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
								maps[33] = data.data.body.data[0].result.items[1][a][0];
							}
				        }
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
		                var myChart_map = ec.init(document.getElementById('main_map'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_map = {
		                    tooltip : {
		                        trigger: 'item'
		                    },
		                    legend: {
		                        orient: 'horizontal',
		                        x:'left',
		                        data:['','']
		                    },
		                    dataRange: {
		                        min: 0,
		                        max: 2500,
		                        x: 'left',
		                        y: 'bottom',
		                        text:['高','低'],           // 文本，默认为数值文本
		                        calculable : true,
		                        itemWidth:10,  
				                // 图例图形高度  
				                itemHeight:10,  
				                orient: 'horizontal',
				                
		                    },
		                    series : [
		                        {
		                            name: '浏览量',
		                            type: 'map',
		                            mapType: 'china',
		                            roam: false,
		                            itemStyle: itemStyle,
		                            data:[
		                                {name: '北京',value: maps[0]},
		                                {name: '天津',value: maps[1]},
		                                {name: '上海',value: maps[2]},
		                                {name: '重庆',value: maps[3]},
		                                {name: '河北',value: maps[4]},
		                                {name: '河南',value: maps[5]},
		                                {name: '云南',value: maps[6]},
		                                {name: '辽宁',value: maps[7]},
		                                {name: '黑龙江',value: maps[8]},
		                                {name: '湖南',value: maps[9]},
		                                {name: '安徽',value: maps[10]},
		                                {name: '山东',value: maps[11]},
		                                {name: '新疆',value: maps[12]},
		                                {name: '江苏',value: maps[13]},
		                                {name: '浙江',value: maps[14]},
		                                {name: '江西',value: maps[15]},
		                                {name: '湖北',value: maps[16]},
		                                {name: '广西',value: maps[17]},
		                                {name: '甘肃',value: maps[18]},
		                                {name: '山西',value: maps[19]},
		                                {name: '内蒙古',value: maps[20]},
		                                {name: '陕西',value: maps[21]},
		                                {name: '吉林',value: maps[22]},
		                                {name: '福建',value: maps[23]},
		                                {name: '贵州',value: maps[24]},
		                                {name: '广东',value: maps[25]},
		                                {name: '青海',value: maps[26]},
		                                {name: '西藏',value: maps[27]},
		                                {name: '四川',value: maps[28]},
		                                {name: '宁夏',value: maps[29]},
		                                {name: '海南',value: maps[30]},
		                                {name: '台湾',value: maps[31]},
		                                {name: '香港',value: maps[32]},
		                                {name: '澳门',value: maps[33]}
		                            ]
		                      },
		                    ]
		                };
		                // 为echarts对象加载数据
		                myChart_map.setOption(option_map);
		            }
		    );
	 });
	 
	 //老访客
	 $("#oldV").click(function(){
		 var maps = new Array();
		 maps[0] = 0;
		 maps[1] = 0;
		 maps[2] = 0;
		 maps[3] = 0;
		 maps[4] = 0;
		 maps[5] = 0;
		 maps[6] = 0;
		 maps[7] = 0;
		 maps[8] = 0;
		 maps[9] = 0;
		 maps[10] = 0;
		 maps[11] = 0;
		 maps[12] = 0;
		 maps[13] = 0;
		 maps[14] = 0;
		 maps[15] = 0;
		 maps[16] = 0;
		 maps[17] = 0;
		 maps[18] = 0;
		 maps[19] = 0;
		 maps[20] = 0;
		 maps[21] = 0;
		 maps[22] = 0;
		 maps[23] = 0;
		 maps[24] = 0;
		 maps[25] = 0;
		 maps[26] = 0;
		 maps[27] = 0;
		 maps[28] = 0;
		 maps[29] = 0;
		 maps[30] = 0;
		 maps[31] = 0;
		 maps[32] = 0;
		 maps[33] = 0;
		 $("#trend").empty();
		 $("#trend1").empty();
		 $("#temp3").val(2);
		 if($("#temp1").val()==0&&$("#temp2").val()==0){
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1){
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2){
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3){
			 var visitor = "old";
			 var source = "link";
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
			 var source = "through";
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
			 var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3){
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
			 var source = "link";
		 } 
		 
		 var method = "visit/district/a";
			
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
				           //获取tbody  
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==0){
				  					str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  				}else if(b==1){
				  					if(data.data.body.data[0].result.items[1][a][b]=='--'){
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
				  					}
				  				}
				  				
				  			}
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
			
			//展示内容
			var method = "visit/district/a";
			var metrics = "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend1");  
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
						
						var tbody1 = document.getElementById("trend1");  
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
			
			//地图
			var method = "visit/district/a";
			var metrics = "pv_count,pv_ratio,visitor_count,ip_count,bounce_ratio,avg_visit_time";
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
						for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {
							if(data.data.body.data[0].result.items[0][a][0].name=='北京'){
								maps[0] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='天津'){
								maps[1] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='上海'){
								maps[2] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='重庆'){
								maps[3] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河北'){
								maps[4] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='河南'){
								maps[5] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='云南'){
								maps[6] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='辽宁'){
								maps[7] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='黑龙江'){
								maps[8] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖南'){
								maps[9] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='安徽'){
								maps[10] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山东'){
								maps[11] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='新疆'){
								maps[12] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江苏'){
								maps[13] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='浙江'){
								maps[14] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='江西'){
								maps[15] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='湖北'){
								maps[16] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广西'){
								maps[17] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='甘肃'){
								maps[18] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='山西'){
								maps[19] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='内蒙古'){
								maps[20] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='陕西'){
								maps[21] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='吉林'){
								maps[22] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='福建'){
								maps[23] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='贵州'){
								maps[24] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='广东'){
								maps[25] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='青海'){
								maps[26] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='西藏'){
								maps[27] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='四川'){
								maps[28] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='宁夏'){
								maps[29] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='海南'){
								maps[30] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='台湾'){
								maps[31] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='香港'){
								maps[32] = data.data.body.data[0].result.items[1][a][0];
							}else if(data.data.body.data[0].result.items[0][a][0].name=='澳门'){
								maps[33] = data.data.body.data[0].result.items[1][a][0];
							}
				        }
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
		                var myChart_map = ec.init(document.getElementById('main_map'));

		                var itemStyle = {
		                    normal:{label:{
		                        show:true,
		                        formatter:'{b}',
		                        textStyle: {fontSize: 10,fontWeight : 'bold'}
		                    }},
		                    emphasis:{label:{show:true}}
		                };
		                var option_map = {
		                    tooltip : {
		                        trigger: 'item'
		                    },
		                    legend: {
		                        orient: 'horizontal',
		                        x:'left',
		                        data:['','']
		                    },
		                    dataRange: {
		                        min: 0,
		                        max: 2500,
		                        x: 'left',
		                        y: 'bottom',
		                        text:['高','低'],           // 文本，默认为数值文本
		                        calculable : true,
		                        itemWidth:10,  
				                // 图例图形高度  
				                itemHeight:10,  
				                orient: 'horizontal',
				                
		                    },
		                    series : [
		                        {
		                            name: '浏览量',
		                            type: 'map',
		                            mapType: 'china',
		                            roam: false,
		                            itemStyle: itemStyle,
		                            data:[
		                                {name: '北京',value: maps[0]},
		                                {name: '天津',value: maps[1]},
		                                {name: '上海',value: maps[2]},
		                                {name: '重庆',value: maps[3]},
		                                {name: '河北',value: maps[4]},
		                                {name: '河南',value: maps[5]},
		                                {name: '云南',value: maps[6]},
		                                {name: '辽宁',value: maps[7]},
		                                {name: '黑龙江',value: maps[8]},
		                                {name: '湖南',value: maps[9]},
		                                {name: '安徽',value: maps[10]},
		                                {name: '山东',value: maps[11]},
		                                {name: '新疆',value: maps[12]},
		                                {name: '江苏',value: maps[13]},
		                                {name: '浙江',value: maps[14]},
		                                {name: '江西',value: maps[15]},
		                                {name: '湖北',value: maps[16]},
		                                {name: '广西',value: maps[17]},
		                                {name: '甘肃',value: maps[18]},
		                                {name: '山西',value: maps[19]},
		                                {name: '内蒙古',value: maps[20]},
		                                {name: '陕西',value: maps[21]},
		                                {name: '吉林',value: maps[22]},
		                                {name: '福建',value: maps[23]},
		                                {name: '贵州',value: maps[24]},
		                                {name: '广东',value: maps[25]},
		                                {name: '青海',value: maps[26]},
		                                {name: '西藏',value: maps[27]},
		                                {name: '四川',value: maps[28]},
		                                {name: '宁夏',value: maps[29]},
		                                {name: '海南',value: maps[30]},
		                                {name: '台湾',value: maps[31]},
		                                {name: '香港',value: maps[32]},
		                                {name: '澳门',value: maps[33]}
		                            ]
		                      },
		                    ]
		                };
		                // 为echarts对象加载数据
		                myChart_map.setOption(option_map);
		            }
		    );
	 });
  });