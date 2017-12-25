$(document).ready(function(){

$("#file").ready("change", function(e){

		var files = $(this)[0].files;

		if(files.length > ){
			
			$("#label_span").text(files.length + "files ready to upload");
		
		} else {
		
			var filename = e.target.value.split('\\').pop();
			$("#label_span").text(filename);

		}

	});	

});