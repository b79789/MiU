$("#home").on('pageinit', function(){
	//code needed for home page goes here
});

var parseAddForm = function(data){
	//use form data here
	
}

$(document).on('pageinit', function(){
	
	var valForm = $("#addForm"),
	    myFormErrorLink = $("#addFormErrorLink");
		
	valForm.validate({
		invalidHandler: function(form, validator){
			myFormErrorLink.click();
			var html = "";
			for(key in validator.submitted){
				var myLabel = $("label[for^='"+ key +"']");
				var legend = myLabel.closest("fieldset").find(".ui-controlgroup-label");
				var fieldName = legend.length ? legend.text() : myLabel.text();
				html += "<li>" + fieldName + "</li>";
			};
			
			$("#errorPage ul").html(html);
		},
		submitHandler: function(){
			var data = valForm.serializeArray();
			parseAddForm(data);
		}
	});
	
});