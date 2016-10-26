$(function() {
	
	var calendar;  
	var settings;
	var key_current = 1;
	var key_old = 1;
	var swiching_key = false;
	var swiching_mouse = false;
	
	chrome.storage.sync.get(function (result) { 
		calendar = result.calendar; 
		$("#calendar").val(calendar);
	});	
	
	$('body').on('click', 'a', function(){
		var link = this; 
		_gaq.push(['_trackEvent', $(link).attr('id'), 'clicked']);
		if($(link).attr("id") == 'schedule'){ 
			if(typeof calendar === 'undefined' || settings == true){ 
				$('#schedule-modal').modal('show');
				$('#calendar').focus(); 
			}else{ 
				chrome.tabs.create({url: $(link).attr('href') + $("#calendar").val()});
			}
		}else{  
			chrome.tabs.create({url: $(link).attr('href')});
		}
		return false; 
	}); 
	    
	$('#settings').on("click", function (event) {
		settings = true;
	}); 
	 
	$('#schedule-save').click(function(event){
		_gaq.push(['_trackEvent', 'schedule', 'saved']);
		chrome.storage.sync.set({
			calendar: $("#calendar").val() 
		}, function() { 
			chrome.tabs.create({url: 'http://ntnu.1024.no/' + $("#calendar").val() });
		});
		settings = false; 
	});
	
	function hideKey(key){
		$('*[data-number="' + key + '"]').focusout()
		$('*[data-number="' + key + '"]').children( ".link-content" ).removeClass("link-content-hovered");
	}
	
	function showKey(key){ 
		$('*[data-number="' + key + '"]').focus();
		$('*[data-number="' + key + '"]').children( ".link-content" ).addClass("link-content-hovered");
	}
	
	$(document).keydown(function(e) {
		console.log(e.which);
		if(!swiching_key && !$('#schedule-modal').hasClass('in')){ 
			swiching_key = true;
			key_old = key_current;
			switch(e.which) { 
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54: 
				case 55:
				case 56: 
					var id = (parseInt(e.which)-48);
					$('*[data-number="' + id + '"]').trigger( "click" );
				break;
				case 37: // left
				case 65:
					if(key_current > 1 && key_current != 1 && key_current != 5 && key_current != 9) key_current = (parseInt(key_current) - 1);
				break;
				case 38: // up
				case 87:
					if(key_current > 4) key_current = (parseInt(key_current) - 4);
				break;
				case 39: // right
				case 68:
					if(key_current < 12 && key_current != 4 && key_current != 8 && key_current != 12) key_current = (parseInt(key_current) + 1);
				break;
				case 40: // down
				case 83:
					console.log(key_current);
					if(key_current < 9) key_current = (parseInt(key_current) + 4);
				break;

				default: return; // exit this handler for other keys
			}
			console.log(e.which);
			if(key_old != key_current){
				showKey(key_current);
			}
		}
	});
	
	$(document).keyup(function(e) {
		if(swiching_key){
			if(key_old != key_current){
				hideKey(key_old);
			}
			swiching_key = false;
		}
	});
	
	$('.link').mouseenter( function(){
		if(!swiching_mouse && !swiching_key){ 
			swiching_mouse = true;
			key_old = key_current;
			key_current = $(this).attr("data-number");
			if(key_old != key_current){
				hideKey(key_old);
				showKey(key_current);				
			}			
		}
	}); 
	
	$('.link').mouseleave( function(){
		if(swiching_mouse && !swiching_key){
			swiching_mouse = false; 
		}
	});
	
	showKey(key_current);
});

