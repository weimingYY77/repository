
$(function(){
	var hour=new Array();
	hour[0] = 0;
	hour[1] = 0;
	hour[2] = 0;
	hour[3] = 0;
	hour[4] = 0;
	hour[5] = 0;
	hour[6] = 0;
	hour[7] = 0;
	hour[8] = 0;
	hour[9] = 0;
	hour[10] = 0;
	hour[11] = 0;
	hour[12] = 0;
	hour[13] = 0;
	hour[14] = 0;
	hour[15] = 0;
	hour[16] = 0;
	hour[17] = 0;
	hour[18] = 0;
	hour[19] = 0;
	hour[20] = 0;
	hour[21] = 0;
	hour[22] = 0;
	hour[23] = 0;
	
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
// 获取时间
  function showDT() {  
  var currentDT = new Date();  
  var y,m,date,day,hs,ms,ss,theDateStr;  
  y = currentDT.getFullYear(); //四位整数表示的年份  
  m = currentDT.getMonth() + 1; //月  
  date = currentDT.getDate(); //日  
  hs = currentDT.getHours(); //时  
  ms = currentDT.getMinutes(); //分  
  ss = currentDT.getSeconds(); //秒 
  if (ss<10) {
    ss = "0" + ss;
  } 
  if (ms<10) {
    ms = "0" + ms;
  } 
  if (hs<10) {
    hs = "0" + hs;
  } 
  theDateStr = y+"年"+  m +"月"+date+"日"+hs+":"+ms+":"+ss;  
  $("#Specific_date").html(theDateStr);  
  window.setTimeout( showDT, 1000);  
}
showDT();

// 选项卡
  $(".main_conter ul li").click(function(event) {
    var index = $(".main_conter ul li").index(this);
    $(this).children("a").addClass("active").parent().siblings().children("a").removeClass("active");
    $(".tab").eq(index).addClass("show_tab").siblings().removeClass("show_tab");

 }) 

// 小切换按钮
  $(".dianji li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
  })
 
 //显示全部
function first(){
		
	  var method = "trend/time/a";
		
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
	
	//
		var method = "trend/time/a";
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
			            var tbody = document.getElementById("trend");  
			  			var str = "";
			  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
		
		//曲线图
		var method = "trend/time/a";
		var metrics = "pv_count";
		
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
					if(HH==0){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==1){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==2){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==3){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==4){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==5){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==6){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==7){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==8){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==9){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==10){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==11){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==12){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==13){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==14){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==15){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==16){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==17){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==18){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==19){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==20){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==21){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==22){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}else if(HH==23){
						for(var a = 0; a <= HH; a++){
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
					}
					
					if(hour[0]=='--'){
						hour[0] = 0;
					}
					if(hour[1]=='--'){
						hour[1] = 0;
					}
					if(hour[2]=='--'){
						hour[2] = 0;
					}
					if(hour[3]=='--'){
						hour[3] = 0;
					}
					if(hour[4]=='--'){
						hour[4] = 0;
					}
					if(hour[5]=='--'){
						hour[5] = 0;
					}
					if(hour[6]=='--'){
						hour[6] = 0;
					}
					if(hour[7]=='--'){
						hour[7] = 0;
					}
					if(hour[8]=='--'){
						hour[8] = 0;
					}
					if(hour[9]=='--'){
						hour[9] = 0;
					}
					if(hour[10]=='--'){
						hour[10] = 0;
					}
					if(hour[11]=='--'){
						hour[11] = 0;
					}
					if(hour[12]=='--'){
						hour[12] = 0;
					}
					if(hour[13]=='--'){
						hour[13] = 0;
					}
					if(hour[14]=='--'){
						hour[14] = 0;
					}
					if(hour[15]=='--'){
						hour[15] = 0;
					}
					if(hour[16]=='--'){
						hour[16] = 0;
					}
					if(hour[17]=='--'){
						hour[17] = 0;
					}
					if(hour[18]=='--'){
						hour[18] = 0;
					}
					if(hour[19]=='--'){
						hour[19] = 0;
					}
					if(hour[20]=='--'){
						hour[20] = 0;
					}
					if(hour[21]=='--'){
						hour[21] = 0;
					}
					if(hour[22]=='--'){
						hour[22] = 0;
					}
					if(hour[23]=='--'){
						hour[23] = 0;
					}
					$("#zero").val(hour[0]);
					$("#one").val(hour[1]);
					$("#two").val(hour[2]);
					$("#three").val(hour[3]);
					$("#four").val(hour[4]);
					$("#five").val(hour[5]);
					$("#six").val(hour[6]);
					$("#seven").val(hour[7]);
					$("#eight").val(hour[8]);
					$("#nine").val(hour[9]);
					$("#ten").val(hour[10]);
					$("#eleven").val(hour[11]);
					$("#twelve").val(hour[12]);
					$("#thirteen").val(hour[13]);
					$("#fourteen").val(hour[14]);
					$("#fifteen").val(hour[15]);
					$("#sixteen").val(hour[16]);
					$("#seventeen").val(hour[17]);
					$("#eighteen").val(hour[18]);
					$("#nineteen").val(hour[19]);
					$("#twenty").val(hour[20]);
					$("#twenty-one").val(hour[21]);
					$("#twenty-two").val(hour[22]);
					$("#twenty-three").val(hour[23]);
				}
			},
			error : function(request) {
				alert("Connection error");
			},
		});
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
		 $("#trend").empty();
		 $("#temp1").val(0);
		 if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 var clientDevice = "pc";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var source = "through";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var source = "search,0";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var source = "link";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var visitor = "old";
			 var source = "link";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "pc";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "pc";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var source = "search,0";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var source = "link";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "link";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var source = "through";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var source = "link";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "link";
		 }

		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
			 
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 var clientDevice = "pc";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var visitor = "new";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var visitor = "old";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var source = "through";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var source = "search,0";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var source = "link";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp2").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var visitor = "old";
			 var source = "link";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "pc";
			 var visitor = "new";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "pc";
			 var visitor = "old";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var source = "search,0";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var source = "link";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp2").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "link";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var source = "through";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var source = "link";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "new";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "old";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp2").val()==2&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "link";
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

			 var method = "trend/time/a";
				
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
				
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
							hour[a] = data.data.body.data[0].result.items[1][ss];
							ss--;
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
			 
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 0 && $("#temp4").val()==1){
			 var source = "through";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 0 && $("#temp4").val()==2){
			 var source = "search,0";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 0 && $("#temp4").val()==3){
			 var source = "link";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 1 && $("#temp4").val()==0){
			 var visitor = "new";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 1 && $("#temp4").val()==1){
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 1 && $("#temp4").val()==2){
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 1 && $("#temp4").val()==3){
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 2 && $("#temp4").val()==0){
			 var visitor = "old";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 2 && $("#temp4").val()==1){
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 2 && $("#temp4").val()==2){
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp1").val()== 0 && $("#temp3").val()== 2 && $("#temp4").val()==3){
			 var visitor = "old";
			 var source = "link";
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 0 && $("#temp4").val()==0){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
				if(mm.toString().length==1){
					mm = "0"+mm;
				}
				if(dd.toString().length==1){
					dd = "0"+dd;
				}
				var time1 = yy.toString()+mm.toString()+dd.toString();
				var start_date = time1;
				var end_date = time;
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 0 && $("#temp4").val()==1){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 0 && $("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 0 && $("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 1 && $("#temp4").val()==0){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 1 && $("#temp4").val()==1){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 1 && $("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 1 && $("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 2 && $("#temp4").val()==0){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 2 && $("#temp4").val()==1){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 2 && $("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()== 1 && $("#temp3").val()== 2 && $("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 
		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
		 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "pc";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "pc";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var visitor = "old";
			 var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
		 }
		 
		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
		 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "new";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
			 var visitor = "old";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var visitor = "old";
			 var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==0&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==1&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp3").val()==2&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
		 }
		 
		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
			 
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 var clientDevice = "pc";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 var clientDevice = "pc";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 var clientDevice = "pc";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 var clientDevice = "mobile";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 var clientDevice = "mobile";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 var clientDevice = "mobile";
			 var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
		 }
		 
		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 var visitor = "new";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 var visitor = "new";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 var visitor = "new";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 var visitor = "new";
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 var visitor = "new";
			 var clientDevice = "pc";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 var visitor = "new";
			 var clientDevice = "pc";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 var visitor = "new";
			 var clientDevice = "pc";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 var visitor = "new";
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 var visitor = "new";
			 var clientDevice = "mobile";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 var visitor = "new";
			 var clientDevice = "mobile";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 var visitor = "new";
			 var clientDevice = "mobile";
			 var source = "link";
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
				var visitor = "new";
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var visitor = "new";
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
				var visitor = "new";
				var clientDevice = "pc";
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
		 }
		 
		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==1){
			 var visitor = "old";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 var visitor = "old";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 var visitor = "old";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==0){
			 var visitor = "old";
			 var clientDevice = "pc";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==1){
			 var visitor = "old";
			 var clientDevice = "pc";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 var visitor = "old";
			 var clientDevice = "pc";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 var visitor = "old";
			 var clientDevice = "pc";
			 var source = "link";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==0){
			 var visitor = "old";
			 var clientDevice = "mobile";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==1){
			 var visitor = "old";
			 var clientDevice = "mobile";
			 var source = "through";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 var visitor = "old";
			 var clientDevice = "mobile";
			 var source = "search,0";
		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 var visitor = "old";
			 var clientDevice = "mobile";
			 var source = "link";
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
				var visitor = "old";
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
		 }else if($("#temp1").val()==1&&$("#temp2").val()==0&&$("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var visitor = "old";
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
				var visitor = "old";
				var clientDevice = "pc";
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==1&&$("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
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
				var source = "through";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==2){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "search,0";
		 }else if($("#temp1").val()==1&&$("#temp2").val()==2&&$("#temp4").val()==3){
			 	var myDate = new Date();
				myDate.setDate(myDate.getDate()-1);
				var y = myDate.getFullYear();
				var m = myDate.getMonth()+1;
				var d = myDate.getDate();
				if(m.toString().length==1){
					m = "0"+m;
				}
				if(d.toString().length==1){
					d = "0"+d;
				}
				var time = y.toString()+m.toString()+d.toString();
				var yeDate = new Date();
				yeDate.setDate(yeDate.getDate()-2);
				var yy =  yeDate.getFullYear();
				var mm = yeDate.getMonth()+1;
				var dd = yeDate.getDate();
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
				var source = "link";
		 }
		 
		 var method = "trend/time/a";
			
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
		
		//
			var method = "trend/time/a";
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
				            var tbody = document.getElementById("trend");  
				  			var str = "";
				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
			
			//曲线图
			var method = "trend/time/a";
			var metrics = "pv_count";
			
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
						if(HH==0){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==1){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==2){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==3){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==4){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==5){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==6){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==7){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==8){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==9){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==10){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==11){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==12){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==13){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==14){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==15){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==16){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==17){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==18){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==19){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==20){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==21){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==22){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}else if(HH==23){
							for(var a = 0; a <= HH; a++){
								hour[a] = data.data.body.data[0].result.items[1][ss];
								ss--;
							}
						}
						
						if(hour[0]=='--'){
							hour[0] = 0;
						}
						if(hour[1]=='--'){
							hour[1] = 0;
						}
						if(hour[2]=='--'){
							hour[2] = 0;
						}
						if(hour[3]=='--'){
							hour[3] = 0;
						}
						if(hour[4]=='--'){
							hour[4] = 0;
						}
						if(hour[5]=='--'){
							hour[5] = 0;
						}
						if(hour[6]=='--'){
							hour[6] = 0;
						}
						if(hour[7]=='--'){
							hour[7] = 0;
						}
						if(hour[8]=='--'){
							hour[8] = 0;
						}
						if(hour[9]=='--'){
							hour[9] = 0;
						}
						if(hour[10]=='--'){
							hour[10] = 0;
						}
						if(hour[11]=='--'){
							hour[11] = 0;
						}
						if(hour[12]=='--'){
							hour[12] = 0;
						}
						if(hour[13]=='--'){
							hour[13] = 0;
						}
						if(hour[14]=='--'){
							hour[14] = 0;
						}
						if(hour[15]=='--'){
							hour[15] = 0;
						}
						if(hour[16]=='--'){
							hour[16] = 0;
						}
						if(hour[17]=='--'){
							hour[17] = 0;
						}
						if(hour[18]=='--'){
							hour[18] = 0;
						}
						if(hour[19]=='--'){
							hour[19] = 0;
						}
						if(hour[20]=='--'){
							hour[20] = 0;
						}
						if(hour[21]=='--'){
							hour[21] = 0;
						}
						if(hour[22]=='--'){
							hour[22] = 0;
						}
						if(hour[23]=='--'){
							hour[23] = 0;
						}
						$("#zero").val(hour[0]);
						$("#one").val(hour[1]);
						$("#two").val(hour[2]);
						$("#three").val(hour[3]);
						$("#four").val(hour[4]);
						$("#five").val(hour[5]);
						$("#six").val(hour[6]);
						$("#seven").val(hour[7]);
						$("#eight").val(hour[8]);
						$("#nine").val(hour[9]);
						$("#ten").val(hour[10]);
						$("#eleven").val(hour[11]);
						$("#twelve").val(hour[12]);
						$("#thirteen").val(hour[13]);
						$("#fourteen").val(hour[14]);
						$("#fifteen").val(hour[15]);
						$("#sixteen").val(hour[16]);
						$("#seventeen").val(hour[17]);
						$("#eighteen").val(hour[18]);
						$("#nineteen").val(hour[19]);
						$("#twenty").val(hour[20]);
						$("#twenty-one").val(hour[21]);
						$("#twenty-two").val(hour[22]);
						$("#twenty-three").val(hour[23]);
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
		    //全部
		    if(opt==0){
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
	    		 
	    		 var method = "trend/time/a";
	 			
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
	 		
	 		//
	 			var method = "trend/time/a";
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
	 				            var tbody = document.getElementById("trend");  
	 				  			var str = "";
	 				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
	 			
	 			//曲线图
	 			var method = "trend/time/a";
	 			var metrics = "pv_count";
	 			
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
	 						if(HH==0){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==1){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==2){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==3){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==4){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==5){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==6){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==7){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==8){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==9){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==10){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==11){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==12){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==13){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==14){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==15){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==16){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==17){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==18){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==19){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==20){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==21){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==22){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==23){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}
	 						
	 						if(hour[0]=='--'){
	 							hour[0] = 0;
	 						}
	 						if(hour[1]=='--'){
	 							hour[1] = 0;
	 						}
	 						if(hour[2]=='--'){
	 							hour[2] = 0;
	 						}
	 						if(hour[3]=='--'){
	 							hour[3] = 0;
	 						}
	 						if(hour[4]=='--'){
	 							hour[4] = 0;
	 						}
	 						if(hour[5]=='--'){
	 							hour[5] = 0;
	 						}
	 						if(hour[6]=='--'){
	 							hour[6] = 0;
	 						}
	 						if(hour[7]=='--'){
	 							hour[7] = 0;
	 						}
	 						if(hour[8]=='--'){
	 							hour[8] = 0;
	 						}
	 						if(hour[9]=='--'){
	 							hour[9] = 0;
	 						}
	 						if(hour[10]=='--'){
	 							hour[10] = 0;
	 						}
	 						if(hour[11]=='--'){
	 							hour[11] = 0;
	 						}
	 						if(hour[12]=='--'){
	 							hour[12] = 0;
	 						}
	 						if(hour[13]=='--'){
	 							hour[13] = 0;
	 						}
	 						if(hour[14]=='--'){
	 							hour[14] = 0;
	 						}
	 						if(hour[15]=='--'){
	 							hour[15] = 0;
	 						}
	 						if(hour[16]=='--'){
	 							hour[16] = 0;
	 						}
	 						if(hour[17]=='--'){
	 							hour[17] = 0;
	 						}
	 						if(hour[18]=='--'){
	 							hour[18] = 0;
	 						}
	 						if(hour[19]=='--'){
	 							hour[19] = 0;
	 						}
	 						if(hour[20]=='--'){
	 							hour[20] = 0;
	 						}
	 						if(hour[21]=='--'){
	 							hour[21] = 0;
	 						}
	 						if(hour[22]=='--'){
	 							hour[22] = 0;
	 						}
	 						if(hour[23]=='--'){
	 							hour[23] = 0;
	 						}
	 						$("#zero").val(hour[0]);
	 						$("#one").val(hour[1]);
	 						$("#two").val(hour[2]);
	 						$("#three").val(hour[3]);
	 						$("#four").val(hour[4]);
	 						$("#five").val(hour[5]);
	 						$("#six").val(hour[6]);
	 						$("#seven").val(hour[7]);
	 						$("#eight").val(hour[8]);
	 						$("#nine").val(hour[9]);
	 						$("#ten").val(hour[10]);
	 						$("#eleven").val(hour[11]);
	 						$("#twelve").val(hour[12]);
	 						$("#thirteen").val(hour[13]);
	 						$("#fourteen").val(hour[14]);
	 						$("#fifteen").val(hour[15]);
	 						$("#sixteen").val(hour[16]);
	 						$("#seventeen").val(hour[17]);
	 						$("#eighteen").val(hour[18]);
	 						$("#nineteen").val(hour[19]);
	 						$("#twenty").val(hour[20]);
	 						$("#twenty-one").val(hour[21]);
	 						$("#twenty-two").val(hour[22]);
	 						$("#twenty-three").val(hour[23]);
	 					}
	 				},
	 				error : function(request) {
	 					alert("Connection error");
	 				},
	 			}); 
	 		//直接访问
	        }else if(opt==1){
	        	 $("#trend").empty();
	    		 $("#temp4").val(1);
	    		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
	    			 var source = "through";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
	    			 var source = "through";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
	    			 var source = "through";
	    			 var visitor = "old";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
	    			 var source = "through";
	    			 var clientDevice = "pc";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
	    			 var source = "through";
	    			 var clientDevice = "pc";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
	    			 var source = "through";
	    			 var clientDevice = "pc";
	    			 var visitor = "old";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
	    			 var source = "through";
	    			 var clientDevice = "mobile";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
	    			 var source = "through";
	    			 var clientDevice = "mobile";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
	    			 var source = "through";
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
					var source = "through";
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
					var source = "through";
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
					var source = "through";
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
					var clientDevice = "pc";
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
					var clientDevice = "pc";
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
					var clientDevice = "mobile";
					var source = "through";
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
					var source = "through";
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
					var source = "through";
				}
	    		 
	    		 var method = "trend/time/a";
	 			
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
	 		
	 		//
	 			var method = "trend/time/a";
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
	 				            var tbody = document.getElementById("trend");  
	 				  			var str = "";
	 				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
	 			
	 			//曲线图
	 			var method = "trend/time/a";
	 			var metrics = "pv_count";
	 			
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
	 						if(HH==0){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==1){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==2){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==3){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==4){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==5){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==6){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==7){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==8){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==9){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==10){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==11){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==12){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==13){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==14){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==15){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==16){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==17){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==18){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==19){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==20){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==21){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==22){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==23){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}
	 						
	 						if(hour[0]=='--'){
	 							hour[0] = 0;
	 						}
	 						if(hour[1]=='--'){
	 							hour[1] = 0;
	 						}
	 						if(hour[2]=='--'){
	 							hour[2] = 0;
	 						}
	 						if(hour[3]=='--'){
	 							hour[3] = 0;
	 						}
	 						if(hour[4]=='--'){
	 							hour[4] = 0;
	 						}
	 						if(hour[5]=='--'){
	 							hour[5] = 0;
	 						}
	 						if(hour[6]=='--'){
	 							hour[6] = 0;
	 						}
	 						if(hour[7]=='--'){
	 							hour[7] = 0;
	 						}
	 						if(hour[8]=='--'){
	 							hour[8] = 0;
	 						}
	 						if(hour[9]=='--'){
	 							hour[9] = 0;
	 						}
	 						if(hour[10]=='--'){
	 							hour[10] = 0;
	 						}
	 						if(hour[11]=='--'){
	 							hour[11] = 0;
	 						}
	 						if(hour[12]=='--'){
	 							hour[12] = 0;
	 						}
	 						if(hour[13]=='--'){
	 							hour[13] = 0;
	 						}
	 						if(hour[14]=='--'){
	 							hour[14] = 0;
	 						}
	 						if(hour[15]=='--'){
	 							hour[15] = 0;
	 						}
	 						if(hour[16]=='--'){
	 							hour[16] = 0;
	 						}
	 						if(hour[17]=='--'){
	 							hour[17] = 0;
	 						}
	 						if(hour[18]=='--'){
	 							hour[18] = 0;
	 						}
	 						if(hour[19]=='--'){
	 							hour[19] = 0;
	 						}
	 						if(hour[20]=='--'){
	 							hour[20] = 0;
	 						}
	 						if(hour[21]=='--'){
	 							hour[21] = 0;
	 						}
	 						if(hour[22]=='--'){
	 							hour[22] = 0;
	 						}
	 						if(hour[23]=='--'){
	 							hour[23] = 0;
	 						}
	 						$("#zero").val(hour[0]);
	 						$("#one").val(hour[1]);
	 						$("#two").val(hour[2]);
	 						$("#three").val(hour[3]);
	 						$("#four").val(hour[4]);
	 						$("#five").val(hour[5]);
	 						$("#six").val(hour[6]);
	 						$("#seven").val(hour[7]);
	 						$("#eight").val(hour[8]);
	 						$("#nine").val(hour[9]);
	 						$("#ten").val(hour[10]);
	 						$("#eleven").val(hour[11]);
	 						$("#twelve").val(hour[12]);
	 						$("#thirteen").val(hour[13]);
	 						$("#fourteen").val(hour[14]);
	 						$("#fifteen").val(hour[15]);
	 						$("#sixteen").val(hour[16]);
	 						$("#seventeen").val(hour[17]);
	 						$("#eighteen").val(hour[18]);
	 						$("#nineteen").val(hour[19]);
	 						$("#twenty").val(hour[20]);
	 						$("#twenty-one").val(hour[21]);
	 						$("#twenty-two").val(hour[22]);
	 						$("#twenty-three").val(hour[23]);
	 					}
	 				},
	 				error : function(request) {
	 					alert("Connection error");
	 				},
	 			}); 
	 		//搜索引擎
	        }else if(opt==2){
	        	 $("#trend").empty();
	    		 $("#temp4").val(2);
	    		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
	    			 var source = "search,0";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
	    			 var source = "search,0";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
	    			 var source = "search,0";
	    			 var visitor = "old";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
	    			 var source = "search,0";
	    			 var clientDevice = "pc";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
	    			 var source = "search,0";
	    			 var clientDevice = "pc";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
	    			 var source = "search,0";
	    			 var clientDevice = "pc";
	    			 var visitor = "old";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
	    			 var source = "search,0";
	    			 var clientDevice = "mobile";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
	    			 var source = "search,0";
	    			 var clientDevice = "mobile";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
	    			 var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
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
					var source = "search,0";
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
					var clientDevice = "mobile";
					var visitor = "new";
					var source = "search,0";
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
					var source = "search,0";
				}
	    		 
	    		 var method = "trend/time/a";
	 			
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
	 		
	 		//
	 			var method = "trend/time/a";
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
	 				            var tbody = document.getElementById("trend");  
	 				  			var str = "";
	 				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
	 			
	 			//曲线图
	 			var method = "trend/time/a";
	 			var metrics = "pv_count";
	 			
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
	 						if(HH==0){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==1){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==2){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==3){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==4){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==5){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==6){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==7){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==8){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==9){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==10){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==11){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==12){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==13){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==14){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==15){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==16){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==17){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==18){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==19){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==20){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==21){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==22){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==23){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}
	 						
	 						if(hour[0]=='--'){
	 							hour[0] = 0;
	 						}
	 						if(hour[1]=='--'){
	 							hour[1] = 0;
	 						}
	 						if(hour[2]=='--'){
	 							hour[2] = 0;
	 						}
	 						if(hour[3]=='--'){
	 							hour[3] = 0;
	 						}
	 						if(hour[4]=='--'){
	 							hour[4] = 0;
	 						}
	 						if(hour[5]=='--'){
	 							hour[5] = 0;
	 						}
	 						if(hour[6]=='--'){
	 							hour[6] = 0;
	 						}
	 						if(hour[7]=='--'){
	 							hour[7] = 0;
	 						}
	 						if(hour[8]=='--'){
	 							hour[8] = 0;
	 						}
	 						if(hour[9]=='--'){
	 							hour[9] = 0;
	 						}
	 						if(hour[10]=='--'){
	 							hour[10] = 0;
	 						}
	 						if(hour[11]=='--'){
	 							hour[11] = 0;
	 						}
	 						if(hour[12]=='--'){
	 							hour[12] = 0;
	 						}
	 						if(hour[13]=='--'){
	 							hour[13] = 0;
	 						}
	 						if(hour[14]=='--'){
	 							hour[14] = 0;
	 						}
	 						if(hour[15]=='--'){
	 							hour[15] = 0;
	 						}
	 						if(hour[16]=='--'){
	 							hour[16] = 0;
	 						}
	 						if(hour[17]=='--'){
	 							hour[17] = 0;
	 						}
	 						if(hour[18]=='--'){
	 							hour[18] = 0;
	 						}
	 						if(hour[19]=='--'){
	 							hour[19] = 0;
	 						}
	 						if(hour[20]=='--'){
	 							hour[20] = 0;
	 						}
	 						if(hour[21]=='--'){
	 							hour[21] = 0;
	 						}
	 						if(hour[22]=='--'){
	 							hour[22] = 0;
	 						}
	 						if(hour[23]=='--'){
	 							hour[23] = 0;
	 						}
	 						$("#zero").val(hour[0]);
	 						$("#one").val(hour[1]);
	 						$("#two").val(hour[2]);
	 						$("#three").val(hour[3]);
	 						$("#four").val(hour[4]);
	 						$("#five").val(hour[5]);
	 						$("#six").val(hour[6]);
	 						$("#seven").val(hour[7]);
	 						$("#eight").val(hour[8]);
	 						$("#nine").val(hour[9]);
	 						$("#ten").val(hour[10]);
	 						$("#eleven").val(hour[11]);
	 						$("#twelve").val(hour[12]);
	 						$("#thirteen").val(hour[13]);
	 						$("#fourteen").val(hour[14]);
	 						$("#fifteen").val(hour[15]);
	 						$("#sixteen").val(hour[16]);
	 						$("#seventeen").val(hour[17]);
	 						$("#eighteen").val(hour[18]);
	 						$("#nineteen").val(hour[19]);
	 						$("#twenty").val(hour[20]);
	 						$("#twenty-one").val(hour[21]);
	 						$("#twenty-two").val(hour[22]);
	 						$("#twenty-three").val(hour[23]);
	 					}
	 				},
	 				error : function(request) {
	 					alert("Connection error");
	 				},
	 			}); 
	 		//外部链接
	        }else if(opt==3){
	        	 $("#trend").empty();
	    		 $("#temp4").val(3);
	    		 if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==0){
	    			 var source = "link";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==1){
	    			 var source = "link";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==0&&$("#temp3").val()==2){
	    			 var source = "link";
	    			 var visitor = "old";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==0){
	    			 var source = "link";
	    			 var clientDevice = "pc";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==1){
	    			 var source = "link";
	    			 var clientDevice = "pc";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==1&&$("#temp3").val()==2){
	    			 var source = "link";
	    			 var clientDevice = "pc";
	    			 var visitor = "old";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==0){
	    			 var source = "link";
	    			 var clientDevice = "mobile";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==1){
	    			 var source = "link";
	    			 var clientDevice = "mobile";
	    			 var visitor = "new";
	    		 }else if($("#temp1").val()==0&&$("#temp2").val()==2&&$("#temp3").val()==2){
	    			 var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
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
					var source = "link";
				}
	    		 
	    		 var method = "trend/time/a";
	 			
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
	 		
	 		//
	 			var method = "trend/time/a";
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
	 				            var tbody = document.getElementById("trend");  
	 				  			var str = "";
	 				  			str+="<td>"+s+"&nbsp;&nbsp;&nbsp;"+data.data.body.data[0].result.items[0][a]+"</td>";
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
	 			
	 			//曲线图
	 			var method = "trend/time/a";
	 			var metrics = "pv_count";
	 			
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
	 						if(HH==0){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==1){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==2){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==3){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==4){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==5){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==6){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==7){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==8){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==9){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==10){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==11){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==12){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==13){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==14){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==15){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==16){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==17){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==18){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==19){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==20){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==21){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==22){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}else if(HH==23){
	 							for(var a = 0; a <= HH; a++){
	 								hour[a] = data.data.body.data[0].result.items[1][ss];
	 								ss--;
	 							}
	 						}
	 						
	 						if(hour[0]=='--'){
	 							hour[0] = 0;
	 						}
	 						if(hour[1]=='--'){
	 							hour[1] = 0;
	 						}
	 						if(hour[2]=='--'){
	 							hour[2] = 0;
	 						}
	 						if(hour[3]=='--'){
	 							hour[3] = 0;
	 						}
	 						if(hour[4]=='--'){
	 							hour[4] = 0;
	 						}
	 						if(hour[5]=='--'){
	 							hour[5] = 0;
	 						}
	 						if(hour[6]=='--'){
	 							hour[6] = 0;
	 						}
	 						if(hour[7]=='--'){
	 							hour[7] = 0;
	 						}
	 						if(hour[8]=='--'){
	 							hour[8] = 0;
	 						}
	 						if(hour[9]=='--'){
	 							hour[9] = 0;
	 						}
	 						if(hour[10]=='--'){
	 							hour[10] = 0;
	 						}
	 						if(hour[11]=='--'){
	 							hour[11] = 0;
	 						}
	 						if(hour[12]=='--'){
	 							hour[12] = 0;
	 						}
	 						if(hour[13]=='--'){
	 							hour[13] = 0;
	 						}
	 						if(hour[14]=='--'){
	 							hour[14] = 0;
	 						}
	 						if(hour[15]=='--'){
	 							hour[15] = 0;
	 						}
	 						if(hour[16]=='--'){
	 							hour[16] = 0;
	 						}
	 						if(hour[17]=='--'){
	 							hour[17] = 0;
	 						}
	 						if(hour[18]=='--'){
	 							hour[18] = 0;
	 						}
	 						if(hour[19]=='--'){
	 							hour[19] = 0;
	 						}
	 						if(hour[20]=='--'){
	 							hour[20] = 0;
	 						}
	 						if(hour[21]=='--'){
	 							hour[21] = 0;
	 						}
	 						if(hour[22]=='--'){
	 							hour[22] = 0;
	 						}
	 						if(hour[23]=='--'){
	 							hour[23] = 0;
	 						}
	 						$("#zero").val(hour[0]);
	 						$("#one").val(hour[1]);
	 						$("#two").val(hour[2]);
	 						$("#three").val(hour[3]);
	 						$("#four").val(hour[4]);
	 						$("#five").val(hour[5]);
	 						$("#six").val(hour[6]);
	 						$("#seven").val(hour[7]);
	 						$("#eight").val(hour[8]);
	 						$("#nine").val(hour[9]);
	 						$("#ten").val(hour[10]);
	 						$("#eleven").val(hour[11]);
	 						$("#twelve").val(hour[12]);
	 						$("#thirteen").val(hour[13]);
	 						$("#fourteen").val(hour[14]);
	 						$("#fifteen").val(hour[15]);
	 						$("#sixteen").val(hour[16]);
	 						$("#seventeen").val(hour[17]);
	 						$("#eighteen").val(hour[18]);
	 						$("#nineteen").val(hour[19]);
	 						$("#twenty").val(hour[20]);
	 						$("#twenty-one").val(hour[21]);
	 						$("#twenty-two").val(hour[22]);
	 						$("#twenty-three").val(hour[23]);
	 					}
	 				},
	 				error : function(request) {
	 					alert("Connection error");
	 				},
	 			}); 
	        }
		});
	 
})


