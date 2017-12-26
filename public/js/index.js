$(document).ready(function(){

$("#file").on("change", function(e){

		let files = $(this)[0].files;

		if(files.length > 1){

			$("#label_span").text(files.length + "files ready to upload");

		} else {

			let filename = e.target.value.split('\\').pop();
			$("#label_span").text(filename);

		}

	});
	$(document).ready(function(){
	$('#submit').submit(function(e){
	     e.preventDefault();

	     let title = $('#title').val();

	     $(this).ajaxSubmit({
	       data: {title: title},
	       contentType: 'application/json',
	       success: function(response){
	         console.log('image uploaded and form submitted');
	       }
	   });
	     return false;
	});
});
	// $('.send').click(function(){
	// 	var text = $('.img_name').text();
	// 	$.ajax({
	// 		type: "post",
	// 		url: "/hdghsgdfj",
	// 		data: {text: text, gdfcg: dhcgdgh},
	// 		success(res){
	// 			if(res == true){
	// 				$('.show').css({
	// 					"display":"block",
	// 				});
	// 			}
	// 		}
	// 	})
	// });

});
