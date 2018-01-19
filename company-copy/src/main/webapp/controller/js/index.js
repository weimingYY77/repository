$(function(){
   // 选项卡切换
    $(".box_list li").click(function(){
        var index = $(".box_list li").index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".service_content").eq(index).addClass("active").siblings().removeClass("active");
    })
    
    var isPhone = 1;

    function getCode(e){
    	checkPhone(); //验证手机号码
    	if(isPhone){
    		resetCode(); //倒计时
    	}else{
    		$('#phone').focus();
    	}
    	
    	
    }
    //验证手机号码
    function checkPhone(){
    	var phone = $('#phone').val();
    	var pattern = /^1[0-9]{10}$/;
    	isPhone = 1;
    	if(phone == '') {
    		alert('请输入手机号码');
    		isPhone = 0;
    		return;
    	}else if(!pattern.test(phone)){
    		alert('请输入正确的手机号码');
    		isPhone = 0;
    		return;
    	}else{
    		$.ajax({
    			cache : false,
    			url : "UserController/addCode.do",
    			type : "post",
    			data : $("#addUser").serialize(),
    			dataType : "json",
    			async : false,
    			success : function(data) {
    				if(data.code==0030){//用户不存在
    					alert(data.msg);
    				}else if(data.code==0020){//短信发送失败
    					alert(data.msg);
    				}else if(data.code==0000){//短信发送成功
    					alert(data.msg)
    				}
    			},
    			error : function(request) {
    				alert("Connection error");
    			},
    		});
    				
    	}
    }
    //倒计时
    function resetCode(){
    	$('#J_getCode').hide();
    	$('#J_second').html('120');
    	$('#J_resetCode').show();
    	var second = 120;
    	var timer = null;
    	timer = setInterval(function(){
    		second -= 1;
    		if(second >0 ){
    			$('#J_second').html(second);
    		}else{
    			clearInterval(timer);
    			$('#J_getCode').show();
    			$('#J_resetCode').hide();
    		}
    	},1000);
    }
    		
    		//页面加载
    		$(function(){
    	       var userName = window.sessionStorage.getItem("userName");
    	       if(userName!=null){//判断用户是否已登录
    	    	   document.getElementById("login_after").style.visibility="visible";
    	    	   document.getElementById("login_box active").style.display="none";
    	    	   document.getElementById("regist_box").style.display="none";
    	    	   document.getElementById("M_infomation").style.display="none";
    	    	   $("#userId").html(userName);
    	       }else{
    		       var userId = window.sessionStorage.getItem("userId");
    		       if(userId!=null){//判断用户是否已登录
    		    	   document.getElementById("login_after").style.visibility="visible";
    		    	   document.getElementById("login_box active").style.display="none";
    		    	   document.getElementById("regist_box").style.display="none";
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
    		    	//登录验证
    		         $("#loginSubmit").click(function() {
    						$.ajax({
    							cache : false,
    							url : "UserController/login.do",
    							type : "post",
    							data : $("#login").serialize(),
    							dataType : "json",
    							async : false,
    							success : function(data) {
    								if (data.code==0020) { //用户不存在
    									$(".count").show();
    									$(".pwd").hide();
    								}else if(data.code==0010){ //密码错误
    									$(".count").hide();
    									$(".pwd").show();
    								}else if(data.code==0000){  //登录成功
    									document.getElementById("login_after").style.visibility="visible";
    									document.getElementById("login_box active").style.display="none";
    									document.getElementById("regist_box").style.display="none";
    									var object = data.data.u_id;
    									var code = object.toString();
    									window.sessionStorage.setItem("userId", code);
    									if(data.data.u_name==null){
    										var leng= code.length;  //定义长度
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
    										document.getElementById("M_infomation").style.display="none";
    										window.sessionStorage.setItem("userName", data.data.u_name);
    										$("#userId").html(data.data.u_name);
    									}
    								}  
    							},
    							error : function(request) {
    								alert("Connection error");
    							},
    						});
    						
    					});
    		         
    		       //注册功能
    					$("#addSubmit").click(function() {
    						var phone = $('#phone').val();
    						var pattern = /^1[0-9]{10}$/;
    						if(phone == '') {
    							alert('请输入手机号码');
    						}else if(!pattern.test(phone)){
    							alert('请输入正确格式的手机号码');
    						}else if($(".reg_code").val() == ""){
    							alert('验证码不能为空！');
    						}else if($(".reg_pwd1").val() == ""){
    							alert('密码不能为空！');
    						}else if($(".reg_pwd2").val() != $(".reg_pwd1").val()){
    							alert('两次密码不相同！');
    						}else if($(".reg_yq").val() == ""){
    							alert('邀请码不能为空！');
    						}else{
    							$.ajax({
    								cache : false,
    								url : "UserController/insert.do",
    								type : "post",
    								data : $("#addUser").serialize(),
    								dataType : "json",
    								async : false,
    								success : function(data) {
    									if (data.code==0010) {   //用户已存在
    										alert(data.msg);
    									}else if(data.code==0020){  //注册失败
    										alert(data.msg);
    									}else if(data.code==0030){
    										alert(data.msg);
    									}else if(data.code==0040){
    										alert(data.msg);
    									}else if(data.code==0000){ //注册成功
    										alert(data.msg);
    										document.getElementById("login_after").style.visibility="visible";
    										document.getElementById("regist_box").style.display="none";
    										var object = data.data.u_id;
    										var code = object.toString();
    										window.sessionStorage.setItem("userId",code);
    										var leng= code.length;  //定义长度
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
    									} 
    								},
    								error : function(request) {
    									alert("Connection error");
    								},
    							});
    						}
    					});
    		    	}
    	       }
    	});
})