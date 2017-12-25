<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>三千客科技服务有限公司</title>
</head>
<body>
	<table>
		<tr>
			<td align="center" width="30%">联系手机：</td>
			<td align="center" width="40%">
				<s:textfield id="jbPhone" name="jbPhone" cssStyle="width:160px;height:24px;" onblur="checkjbPhone()"/>
			</td>
			<td align="left" width="30%">
				<span id="jbPhoneTip">
					<s:fielderror cssStyle="color:red;padding-left:10px;">
						<s:param>jbPhone</s:param>
					</s:fielderror>
				</span>
			</td>
		</tr>
		<tr>
			<td align="center">短信验证码：</td>
			<td align="left" colspan="2" style="padding-left: 112px;">
				<s:textfield id="SmsCheckCode" name="SmsCheckCode" cssStyle="width:80px;height:24px;" maxLength="6" />
				<span><input type="button" id="btnSendCode" name="btnSendCode" value="免费获取验证码" onclick="sendMessage()" /></span>
				<span id="SmsCheckCodeTip">
					<s:fielderror cssStyle="color:red;padding-left:10px;">
						<s:param>SmsCheckCodeTip</s:param>
					</s:fielderror>
				</span>
			</td>
		</tr>	
	</table>
</body>
<script src="themes/valudio/assets/lib/jquery/1.12.2/jquery-1.12.2.js" tppabs="http://valudio.com/themes/valudio/assets/lib/jquery/1.12.2/jquery-1.12.2.js"></script>
<script type="text/javascript">
var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度

function sendMessage() {
	curCount = count;
	var jbPhone = $("#jbPhone").val();
	var jbPhoneTip = $("#jbPhoneTip").text();
	if (jbPhone != "") {
		if(jbPhoneTip == "√ 该手机号码可以注册，输入正确" || jbPhoneTip == "√ 短信验证码已发到您的手机,请查收"){
			// 产生验证码
			for ( var i = 0; i < codeLength; i++) {
				code += parseInt(Math.random() * 9).toString();
			}
			// 设置button效果，开始计时
			$("#btnSendCode").attr("disabled", "true");
			$("#btnSendCode").val("请在" + curCount + "秒内输入验证码");
			InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒执行一次
			// 向后台发送处理数据
			$.ajax({
				type: "POST", // 用POST方式传输
				dataType: "text", // 数据格式:JSON
				url: "UserAction_sms.action", // 目标地址
				data: "jbPhone=" + jbPhone +"&code=" + code,
				error: function (XMLHttpRequest, textStatus, errorThrown) { 
					
				},
				success: function (data){ 
					data = parseInt(data, 10);
					if(data == 1){
						$("#jbPhoneTip").html("<font color='#339933'>√ 短信验证码已发到您的手机,请查收</font>");
					}else if(data == 0){
						$("#jbPhoneTip").html("<font color='red'>× 短信验证码发送失败，请重新发送</font>");
					}else if(data == 2){
						$("#jbPhoneTip").html("<font color='red'>× 该手机号码今天发送验证码过多</font>");
					}
				}
			});
		}
	}else{
		$("#jbPhoneTip").html("<font color='red'>× 手机号码不能为空</font>");
	}
}

//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);// 停止计时器
		$("#btnSendCode").removeAttr("disabled");// 启用按钮
		$("#btnSendCode").val("重新发送验证码");
		code = ""; // 清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
	}else {
		curCount--;
		$("#btnSendCode").val("请在" + curCount + "秒内输入验证码");
	}
}

$(document).ready(function() {
	$("#SmsCheckCode").blur(function() {
		var SmsCheckCodeVal = $("#SmsCheckCode").val();
		// 向后台发送处理数据
		$.ajax({
			url : "UserAction_checkCode.action", 
			data : {SmsCheckCode : SmsCheckCodeVal}, 
			type : "POST", 
			dataType : "text", 
			success : function(data) {
				data = parseInt(data, 10);
				if (data == 1) {
					$("#SmsCheckCodeTip").html("<font color='#339933'>√ 短信验证码正确，请继续</font>");
				} else {
					$("#SmsCheckCodeTip").html("<font color='red'>× 短信验证码有误，请核实后重新填写</font>");
				}
			}
		});
	});
});
</script>
</html>
