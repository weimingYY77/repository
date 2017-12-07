$(function(){
	console.log($(".head_top").height())
	$(window).scroll(function(){
		// 当滚动条滚动超过顶部时，Logo变成黑色，否则logo为白色
	if ($(window).scrollTop() >= $(".head_top").height()) {
			$(".img_black").show();
			$(".img_white").hide();
		}
		else{
			$(".img_black").hide();
			$(".img_white").show();
		}
		// 根据滚动条滚动给四块内容添加动画
		if ($(window).scrollTop()>1000) {
			$("#block_one").addClass('visibility_play1');
		    $("#blocktxt_one").addClass('program_play');
		}
		if ($(window).scrollTop()>2000) {
			$("#block_two").addClass('visibility_play2');
		    $("#blocktxt_two").addClass('outpack_play');
		}
		if ($(window).scrollTop()>3000) {
			$("#block_three").addClass('visibility_play1');
		    $("#blocktxt_three").addClass('program_play');
		}
		if ($(window).scrollTop()>4000) {
			$("#block_four").addClass('visibility_play2');
		    $("#blocktxt_four").addClass('outpack_play');
		}
	})
})