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
	var method = "visit/toppage/a";
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
	
	function first(){
		 $(".ip_count").hide();
		 $(".visit1_count").hide();
		 $(".exit_ratio").hide();
		var metrics = "pv_count,visitor_count,outward_count,exit_count,average_stay_time";
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
					$("#e").html(data.data.body.data[0].result.sum[0][2]);
					$("#f").html(data.data.body.data[0].result.sum[0][3]);
					$("#g").html(data.data.body.data[0].result.sum[0][4]);
				
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
		            $("#g").html(time);
		            
		            //展示
		            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
			        {  
			           //获取tbody  
			            var s= a+1;
			            var tbody = document.getElementById("trend");  
			  			var str = "";
			  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
			  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
			  				if(b==4){
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
						if(a==4){
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "old";
		 }
		 
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if($("#temp4").val()==0){
				  					if(b==2||b==3||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(b==2||b==3||b==5||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(b==2||b==4||b==5||b==6||b==7){
				  						
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(b==2||b==3||b==4||b==6){
				  						
				  					}else if(b==7){
				  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}
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
							if($("#temp4").val()==0){
			  					if(a==2||a==3||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==1){
			  					if(a==a||a==3||a==5||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==2){
			  					if(a==2||a==4||a==5||a==6||a==7){
			  						
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					} 
			  				}else if($("#temp4").val()==3){
			  					if(a==2||a==3||a==4||a==6){
			  						
			  					}else if(a==7){
			  						if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp2").val()==3&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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

			 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#b").html(data.data.body.data[0].result.sum[0][1]);
							$("#c").html(data.data.body.data[0].result.sum[0][2]);
							$("#d").html(data.data.body.data[0].result.sum[0][3]);
							$("#e").html(data.data.body.data[0].result.sum[0][4]);
							$("#f").html(data.data.body.data[0].result.sum[0][5]);
							$("#g").html(data.data.body.data[0].result.sum[0][6]);
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#h").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
						
							var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
				            $("#g").html(time);
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if($("#temp4").val()==0){
					  					if(b==2||b==3||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==1){
					  					if(b==2||b==3||b==5||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==2){
					  					if(b==2||b==4||b==5||b==6||b==7){
					  						
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					} 
					  				}else if($("#temp4").val()==3){
					  					if(b==2||b==3||b==4||b==6){
					  						
					  					}else if(b==7){
					  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}
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
								if($("#temp4").val()==0){
				  					if(a==2||a==3||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(a==a||a==3||a==5||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(a==2||a==4||a==5||a==6||a==7){
				  						
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(a==2||a==3||a==4||a==6){
				  						
				  					}else if(a==7){
				  						if(data.data.body.data[0].result.sum[0][a]=='--'){
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
					  					}else{
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
					  					}
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}
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
	
	//来源
	$("#source").change(function(){
	    var opt= $("#source").val();
	    if(opt==0){
	    	 $("#trend").empty();
			 $("#temp2").val(0);
			 if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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

			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 
			 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#b").html(data.data.body.data[0].result.sum[0][1]);
							$("#c").html(data.data.body.data[0].result.sum[0][2]);
							$("#d").html(data.data.body.data[0].result.sum[0][3]);
							$("#e").html(data.data.body.data[0].result.sum[0][4]);
							$("#f").html(data.data.body.data[0].result.sum[0][5]);
							$("#g").html(data.data.body.data[0].result.sum[0][6]);
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#h").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
						
							var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
				            $("#g").html(time);
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if($("#temp4").val()==0){
					  					if(b==2||b==3||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==1){
					  					if(b==2||b==3||b==5||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==2){
					  					if(b==2||b==4||b==5||b==6||b==7){
					  						
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					} 
					  				}else if($("#temp4").val()==3){
					  					if(b==2||b==3||b==4||b==6){
					  						
					  					}else if(b==7){
					  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}
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
								if($("#temp4").val()==0){
				  					if(a==2||a==3||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(a==a||a==3||a==5||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(a==2||a==4||a==5||a==6||a==7){
				  						
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(a==2||a==3||a==4||a==6){
				  						
				  					}else if(a==7){
				  						if(data.data.body.data[0].result.sum[0][a]=='--'){
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
					  					}else{
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
					  					}
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}
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
	    }else if(opt==1){
	    	 $("#trend").empty();
			 $("#temp2").val(1);
			 if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
				 var source = "through";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
				 var source = "through";
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }
			 
			 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#b").html(data.data.body.data[0].result.sum[0][1]);
							$("#c").html(data.data.body.data[0].result.sum[0][2]);
							$("#d").html(data.data.body.data[0].result.sum[0][3]);
							$("#e").html(data.data.body.data[0].result.sum[0][4]);
							$("#f").html(data.data.body.data[0].result.sum[0][5]);
							$("#g").html(data.data.body.data[0].result.sum[0][6]);
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#h").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
						
							var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
				            $("#g").html(time);
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if($("#temp4").val()==0){
					  					if(b==2||b==3||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==1){
					  					if(b==2||b==3||b==5||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==2){
					  					if(b==2||b==4||b==5||b==6||b==7){
					  						
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					} 
					  				}else if($("#temp4").val()==3){
					  					if(b==2||b==3||b==4||b==6){
					  						
					  					}else if(b==7){
					  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}
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
								if($("#temp4").val()==0){
				  					if(a==2||a==3||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(a==a||a==3||a==5||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(a==2||a==4||a==5||a==6||a==7){
				  						
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(a==2||a==3||a==4||a==6){
				  						
				  					}else if(a==7){
				  						if(data.data.body.data[0].result.sum[0][a]=='--'){
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
					  					}else{
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
					  					}
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}
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
	    }else if(opt==2){
	    	 $("#trend").empty();
			 $("#temp2").val(2);
			 if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
				 var source = "search,0";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
				 var source = "search,0";
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }
			 
			 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#b").html(data.data.body.data[0].result.sum[0][1]);
							$("#c").html(data.data.body.data[0].result.sum[0][2]);
							$("#d").html(data.data.body.data[0].result.sum[0][3]);
							$("#e").html(data.data.body.data[0].result.sum[0][4]);
							$("#f").html(data.data.body.data[0].result.sum[0][5]);
							$("#g").html(data.data.body.data[0].result.sum[0][6]);
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#h").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
						
							var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
				            $("#g").html(time);
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if($("#temp4").val()==0){
					  					if(b==2||b==3||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==1){
					  					if(b==2||b==3||b==5||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==2){
					  					if(b==2||b==4||b==5||b==6||b==7){
					  						
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					} 
					  				}else if($("#temp4").val()==3){
					  					if(b==2||b==3||b==4||b==6){
					  						
					  					}else if(b==7){
					  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}
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
								if($("#temp4").val()==0){
				  					if(a==2||a==3||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(a==a||a==3||a==5||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(a==2||a==4||a==5||a==6||a==7){
				  						
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(a==2||a==3||a==4||a==6){
				  						
				  					}else if(a==7){
				  						if(data.data.body.data[0].result.sum[0][a]=='--'){
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
					  					}else{
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
					  					}
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}
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
	    }else if(opt==3){
	    	 $("#trend").empty();
			 $("#temp2").val(3);
			 if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "new";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "new";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
				 var visitor = "old";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
				 var source = "link";
			 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
				 var visitor = "old";
				 var source = "link";
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
				 $(".ip_count").hide();
				 $(".visit1_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".outward_count").show();
				 $(".average_stay_time").show();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").show();
				 $(".ip_count").hide();
				 $(".exit_count").hide();
				 $(".exit_ratio").hide();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
				 $(".pv_count").show();
				 $(".visitor_count").show();
				 $(".visit1_count").hide();
				 $(".ip_count").hide();
				 $(".exit_count").show();
				 $(".exit_ratio").show();
				 $(".outward_count").hide();
				 $(".average_stay_time").hide();
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
			 
			 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
			 $.ajax({
					cache : false,
					url : "../../../StatisticsController/networkOverview.do",
					type : "post",
					data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
					dataType : "json",
					async : true,
					success : function(data) {
						if (data.code==0010) {
							alert(data.msg);
						}else if(data.code==0000){
							$("#a").html(data.data.body.data[0].result.sum[0][0]);
							$("#b").html(data.data.body.data[0].result.sum[0][1]);
							$("#c").html(data.data.body.data[0].result.sum[0][2]);
							$("#d").html(data.data.body.data[0].result.sum[0][3]);
							$("#e").html(data.data.body.data[0].result.sum[0][4]);
							$("#f").html(data.data.body.data[0].result.sum[0][5]);
							$("#g").html(data.data.body.data[0].result.sum[0][6]);
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
							if(data.data.body.data[0].result.sum[0][7]=='--'){
								$("#h").html(data.data.body.data[0].result.sum[0][7]);
							}else{
								$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
							}
						
							var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
				            $("#g").html(time);
				            
				            //展示
				            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
					        {  
					           //获取tbody  
					            var s= a+1;
					            var tbody = document.getElementById("trend");  
					  			var str = "";
					  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
					  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
					  				if($("#temp4").val()==0){
					  					if(b==2||b==3||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==1){
					  					if(b==2||b==3||b==5||b==7){
					  						
					  					}else if(b==6){
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
					  				}else if($("#temp4").val()==2){
					  					if(b==2||b==4||b==5||b==6||b==7){
					  						
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					} 
					  				}else if($("#temp4").val()==3){
					  					if(b==2||b==3||b==4||b==6){
					  						
					  					}else if(b==7){
					  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
						  					}else{
						  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
						  					}
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}
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
								if($("#temp4").val()==0){
				  					if(a==2||a==3||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(a==a||a==3||a==5||a==7){
				  						
				  					}else if(a==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(a==2||a==4||a==5||a==6||a==7){
				  						
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(a==2||a==3||a==4||a==6){
				  						
				  					}else if(a==7){
				  						if(data.data.body.data[0].result.sum[0][a]=='--'){
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
					  					}else{
					  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
					  					}
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}
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
	
	//访客
	$("#visitor").click(function(){
		 $("#trend").empty();
		 $("#temp3").val(0);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if($("#temp4").val()==0){
				  					if(b==2||b==3||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(b==2||b==3||b==5||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(b==2||b==4||b==5||b==6||b==7){
				  						
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(b==2||b==3||b==4||b==6){
				  						
				  					}else if(b==7){
				  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}
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
							if($("#temp4").val()==0){
			  					if(a==2||a==3||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==1){
			  					if(a==a||a==3||a==5||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==2){
			  					if(a==2||a==4||a==5||a==6||a==7){
			  						
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					} 
			  				}else if($("#temp4").val()==3){
			  					if(a==2||a==3||a==4||a==6){
			  						
			  					}else if(a==7){
			  						if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }
		 
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if($("#temp4").val()==0){
				  					if(b==2||b==3||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(b==2||b==3||b==5||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(b==2||b==4||b==5||b==6||b==7){
				  						
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(b==2||b==3||b==4||b==6){
				  						
				  					}else if(b==7){
				  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}
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
							if($("#temp4").val()==0){
			  					if(a==2||a==3||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==1){
			  					if(a==a||a==3||a==5||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==2){
			  					if(a==2||a==4||a==5||a==6||a==7){
			  						
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					} 
			  				}else if($("#temp4").val()==3){
			  					if(a==2||a==3||a==4||a==6){
			  						
			  					}else if(a==7){
			  						if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
			 var source = "link";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==0){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==1){
			 $(".ip_count").hide();
			 $(".visit1_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".outward_count").show();
			 $(".average_stay_time").show();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==2){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").show();
			 $(".ip_count").hide();
			 $(".exit_count").hide();
			 $(".exit_ratio").hide();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp4").val()==3){
			 $(".pv_count").show();
			 $(".visitor_count").show();
			 $(".visit1_count").hide();
			 $(".ip_count").hide();
			 $(".exit_count").show();
			 $(".exit_ratio").show();
			 $(".outward_count").hide();
			 $(".average_stay_time").hide();
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
		 
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if($("#temp4").val()==0){
				  					if(b==2||b==3||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==1){
				  					if(b==2||b==3||b==5||b==7){
				  						
				  					}else if(b==6){
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
				  				}else if($("#temp4").val()==2){
				  					if(b==2||b==4||b==5||b==6||b==7){
				  						
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					} 
				  				}else if($("#temp4").val()==3){
				  					if(b==2||b==3||b==4||b==6){
				  						
				  					}else if(b==7){
				  						if(data.data.body.data[0].result.items[1][a][b]=='--'){
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
					  					}else{
					  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"%</td>";
					  					}
				  					}else{
				  						str+="<td>"+data.data.body.data[0].result.items[1][a][b]+"</td>";
				  					}
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
							if($("#temp4").val()==0){
			  					if(a==2||a==3||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==1){
			  					if(a==a||a==3||a==5||a==7){
			  						
			  					}else if(a==6){
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
			  				}else if($("#temp4").val()==2){
			  					if(a==2||a==4||a==5||a==6||a==7){
			  						
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					} 
			  				}else if($("#temp4").val()==3){
			  					if(a==2||a==3||a==4||a==6){
			  						
			  					}else if(a==7){
			  						if(data.data.body.data[0].result.sum[0][a]=='--'){
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
				  					}else{
				  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"%</td>";
				  					}
			  					}else{
			  						str1+="<td>"+data.data.body.data[0].result.sum[0][a]+"</td>";
			  					}
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
	
	//指数概览
	$("#summary").click(function(){
		 $("#trend").empty();
		 $("#temp4").val(0);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==0){
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==1){
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==2){
			 var source = "link";
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
				var source = "through";
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
			 var visitor = "new";
			 var source = "through";
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
			 var visitor = "old";
			 var source = "through";
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
			 var source = "search,0";
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
			 var source = "search,0";
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
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==1){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==2){
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
		 
		 $(".ip_count").hide();
		 $(".visit1_count").hide();
		 $(".exit_count").show();
		 $(".exit_ratio").hide();
		 $(".pv_count").show();
		 $(".visitor_count").show();
		 $(".outward_count").show();
		 $(".average_stay_time").show();
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==2||b==3||b==7){
			  						
			  					}else if(b==6){
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
							if(a==2||a==3||a==7){
		  						
		  					}else if(a==6){
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
	
	//页面价值分析
	$("#pageValue").click(function(){
		 $("#trend").empty();
		 $("#temp4").val(1);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==0){
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==1){
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==2){
			 var source = "link";
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
				var source = "through";
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
			 var visitor = "new";
			 var source = "through";
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
			 var visitor = "old";
			 var source = "through";
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
			 var source = "search,0";
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
			 var source = "search,0";
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
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==1){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==2){
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
		 
		 $(".ip_count").hide();
		 $(".visit1_count").hide();
		 $(".exit_count").hide();
		 $(".exit_ratio").hide();
		 $(".pv_count").show();
		 $(".visitor_count").show();
		 $(".outward_count").show();
		 $(".average_stay_time").show();
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==2||b==3||b==5||b==7){
				  					
				  				}else if(b==6){
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
							if(a==2||a==3||a==5||a==7){
								
							}else if(a==6){
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
	
	//入口页分析
	$("#entryPage").click(function(){
		 $("#trend").empty();
		 $("#temp4").val(2);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==0){
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==1){
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==2){
			 var source = "link";
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
				var source = "through";
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
			 var visitor = "new";
			 var source = "through";
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
			 var visitor = "old";
			 var source = "through";
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
			 var source = "search,0";
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
			 var source = "search,0";
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
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==1){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==2){
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
		 
		 $(".pv_count").show();
		 $(".visitor_count").show();
		 $(".visit1_count").show();
		 $(".ip_count").hide();
		 $(".exit_count").hide();
		 $(".exit_ratio").hide();
		 $(".outward_count").hide();
		 $(".average_stay_time").hide();
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==2||b==4||b==5||b==6||b==7){
			  						
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
							if(a==2||a==4||a==5||a==6||a==7){
		  						
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
	
	//退出页分析
	$("#exitPage").click(function(){
		 $("#trend").empty();
		 $("#temp4").val(3);
		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
			 var source = "through";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
			 var source = "through";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
			 var source = "search,0";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==0){
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==1){
			 var source = "link";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==3&&$("#temp3").val()==2){
			 var source = "link";
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
				var source = "through";
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
			 var visitor = "new";
			 var source = "through";
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
			 var visitor = "old";
			 var source = "through";
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
			 var source = "search,0";
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
			 var source = "search,0";
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
			 var source = "search,0";
			 var visitor = "old";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==0){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==1){
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==3&&$("#temp3").val()==2){
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
		 
		 $(".pv_count").show();
		 $(".visitor_count").show();
		 $(".visit1_count").hide();
		 $(".ip_count").hide();
		 $(".exit_count").show();
		 $(".exit_ratio").show();
		 $(".outward_count").hide();
		 $(".average_stay_time").hide();
		 var metrics = "pv_count,visitor_count,ip_count,visit1_count,outward_count,exit_count,average_stay_time,exit_ratio";
		 $.ajax({
				cache : false,
				url : "../../../StatisticsController/networkOverview.do",
				type : "post",
				data : {"siteId":siteId,"method":method,"start_date":end_date,"end_date":end_date,"metrics":metrics,"source":source,"visitor":visitor},
				dataType : "json",
				async : true,
				success : function(data) {
					if (data.code==0010) {
						alert(data.msg);
					}else if(data.code==0000){
						$("#a").html(data.data.body.data[0].result.sum[0][0]);
						$("#b").html(data.data.body.data[0].result.sum[0][1]);
						$("#c").html(data.data.body.data[0].result.sum[0][2]);
						$("#d").html(data.data.body.data[0].result.sum[0][3]);
						$("#e").html(data.data.body.data[0].result.sum[0][4]);
						$("#f").html(data.data.body.data[0].result.sum[0][5]);
						$("#g").html(data.data.body.data[0].result.sum[0][6]);
						$("#h").html(data.data.body.data[0].result.sum[0][7]);
						if(data.data.body.data[0].result.sum[0][7]=='--'){
							$("#h").html(data.data.body.data[0].result.sum[0][7]);
						}else{
							$("#h").html(data.data.body.data[0].result.sum[0][7]+"%");
						}
					
						var time = parseInt(data.data.body.data[0].result.sum[0][6]);
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
			            $("#g").html(time);
			            
			            //展示
			            for (var a = 0; a < data.data.body.data[0].result.items[0].length; a++)  
				        {  
				           //获取tbody  
				            var s= a+1;
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td id='firsttd'>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a][0].name+"</td>";
				  			for(var b = 0; b < data.data.body.data[0].result.items[1][a].length; b++){
				  				if(b==2||b==3||b==4||b==6){
			  						
			  					}else if(b==7){
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
							if(a==2||a==3||a==4||a==6){
		  						
		  					}else if(a==7){
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