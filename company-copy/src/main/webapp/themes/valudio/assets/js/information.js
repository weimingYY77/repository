$(function(){
	$("#user_name").focus(function(){
	      $(".error_name").hide();
	 })
	$("#user_name").blur(function(event){
		var reg = /^[\u4e00-\u9fa5\w]{1,9}$/g;
		var user = $("#user_name").val();
		if (reg.test(user)==false) {
	       $(".error_name").show();
	       $("#user_name").val(' ');
	       $("#user_name").attr("placeholder") == "";
		}
	});

	$("#company_tel").focus(function(){
	      $(".error_tel").hide();
	})
	$("#company_tel").blur(function(event){
		var reg = /^1[3|4|5|8]\d{9}$/;
		var tel = $("#company_tel").val();
		if (reg.test(tel) == false) {
	       $(".error_tel").show();
	       $("#company_tel").val(' ');
	       $("#company_tel").attr("placeholder") == "";
		}
	});

    $("#company_add").focus(function(){
	      $(".error_add").hide();
	})
	$("#company_add").blur(function(event){
		var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
		var add = $("#company_add").val();
		if (reg.test(add) == false) {
	       $(".error_add").show();
	       $("#company_add").val(' ');
	       $("#company_add").attr("placeholder") == "";
		}
	});
    
    $("#user_company").focus(function(){
	      $(".error_company").hide();
	})
	$("#user_company").blur(function(event){
		var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
		var com = $("#user_company").val();
		if (reg.test(com) == false) {
	       $(".error_company").show();
	       $("#user_company").val(' ');
	       $("#user_company").attr("placeholder") == "";
		}
	});

	$(".hide_span").click(function(){
		$(this).hide();
	})
})