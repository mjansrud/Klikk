$(function() {
	
	function requestResize(){
		console.log("Requesting resize");
	}
	 
	$( window ).resize(function() {
  		requestResize();
	});
	
	requestResize();
	
});

