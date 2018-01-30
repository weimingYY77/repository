$(function(){
       // 加载底部
        $("#test").load("http://www.sumchance.com/src/main/webapp/index/common-html/footer.html");
        // 加载遮罩层
        $("#nav").load("http://www.sumchance.com/src/main/webapp/index/common-html/nav.html");
         $("#toggle").click(function(){
              $(".zhezhao").addClass("is-open");
          })
           $(".close").click(function(){
              $(".zhezhao").removeClass("is-open");
          });
         //控制器
         $("#kongzhi").click(function(){
        	//用户
        	 var userName = window.sessionStorage.getItem("userName");
        	 var userId = window.sessionStorage.getItem("userId");
        	 if(userName!=null&&userName!=""){
        		 window.location.href="controller/html/index.html";
        	 }else{
    	       if(userId!=null&&userId!=""){
    	    	  window.location.href="controller/html/index.html";
    	       }else{
    	    	  $(".nav").addClass("is-open");
          		  $(".toggle").addClass("is-open");
    	       }
    	    }
         });
        $(".reg").click(function(){
        $(".login_box").removeClass("active");
        $(".login_box").hide();
        $(".regist_box").show();
       })
  $(".return").click(function(){
        $(".login_box").addClass("active");
        $(".login_box").show();
        $(".regist_box").hide();
       })
  // 点击显示隐藏服务协议
  $(".agreenment").click(function(){
      $(".sum_agreen").removeClass('visi');
      $('.zhezhao-two').fadeIn();
  })
  $(".iagreen").click(function(){
      $(".sum_agreen").addClass('visi');
       $('.zhezhao-two').fadeOut();
  })
    // 注册验证
   // 手机验证
  $(".reg_tel").blur(function(){
    var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/; 
    if ($(".reg_tel").val() == " ") {
      $(".empty_tel").show();
      $(".error_tel").hide();
    }else if (!phoneReg.test($(".reg_tel").val())) {
      $(".error_tel").show();
      $(".empty_tel").hide();
    } else{
    $(".empty_tel").hide();
    $(".error_tel").hide();
    }
  })
  $(".reg_tel").focus(function(){
    $(".empty_tel").hide();
    $(".error_tel").hide();
  })
  // 验证码验证
  $(".reg_code").blur(function(){
    if ($(".reg_code").val() == " ") {
      $(".empty_code").show();
    }
  })
  $(".reg_code").focus(function(){
    $(".empty_code").hide();
    $(".error_code").hide();
  })
  // 密码验证
  $(".reg_pwd1").blur(function(){
    if ($(".reg_pwd1").val() == " ") {
      $(".empty_pwd1").show();
    }
  })
  $(".reg_pwd1").focus(function(){
    if ($(".reg_pwd1").val() == " ") {
      $(".empty_pwd1").hide();
    }
  })
  // 确认密码验证
  $(".reg_pwd2").blur(function(){
    if ($(".reg_pwd2").val() != $(".reg_pwd1").val()) {
      $(".error_pwd2").show();
    }else{
      $(".error_pwd2").hide();
    }
  })
  // 邀请码验证
  $(".reg_yq").blur(function(){
    if ($(".reg_yq").val() == " ") {
      $(".empty_yq").show();
    }
  })
  $(".reg_yq").focus(function(){
    if ($(".reg_yq").val() == " ") {
      $(".empty_yq").hide();
    }
  })
    });
