$(document).ready(function(){
	$(".open-modal").on("click", function(){
		$("#modal").show("fast");
	});
	
	$(".img-close-modal").on("click", function(){
		$("#modal").hide("fast");
	});
});