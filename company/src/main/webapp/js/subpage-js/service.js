$(function(){
	console.log($(window).scrollTop())
	$(window).scroll(function(){
/*	if ($(window).scrollTop()>700) {
			
		}*/
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