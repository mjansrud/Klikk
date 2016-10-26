$(function() {
	
	var calendar; 
	var settings;
	
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
	
});

