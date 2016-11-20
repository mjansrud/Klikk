$(function() {
	
	var calendar;  
	var settings;
	var key_current = 1;
	var key_old = 1;
	var swiching_key = false;
	var swiching_mouse = false;
	var min = 1; 
	var max = 5;
	var random = Math.floor(Math.random() * (max - min + 1)) + min;
	var message;
	 
	switch (random){  
		case 1:
			message = 'Kokt av <a href="mailto:morten@founder.no" class="link">Morten Jansrud</a> med <a href="http://instabart.no" class="link">Instabart</a> som LF';
		break;
		case 2:
			message = 'Tips: "Alt+K" åpner vinduet -> Piltastene -> Enter';
		break;
		case 3:
			message = 'Tips: Du kan klikke på nummer 1-10 på tastaturet';
		break;
		case 4:
			message = 'Tips: Del applikasjonen med knappene til høyre';
		break;
		case 5:
			message = '1f u c4n r34d th1s u r34lly n33d t0 l00k <a class="pointer" id="name">h3r3</a>'; 
		break;
		default:
			message = 'Shiiiiiet, scriptet aner ikke hva det skal si';
		break;
	}
	$('#message').html(message);
	
	function hideKey(key){
		$('*[data-number="' + key + '"]').focusout()
		$('*[data-number="' + key + '"]').find( ".link-content" ).removeClass("link-content-hovered");
	}
	
	function showKey(key){ 
		$('*[data-number="' + key + '"]').focus();
		$('*[data-number="' + key + '"]').find( ".link-content" ).addClass("link-content-hovered");
	}
	
	function resizeWindow(){
		chrome.tabs.getSelected(null, function(window){
			var deviation = 40;
			var padding = 40;
    		var width = window.width;
			var height = window.height;
			if(width < (700 + deviation)){
				$("body").width(width - padding).height(width - 150 - padding); 
			}
			if(width < 450){
				$(".link-content").css("fontSize", 10);
				$("body").css("fontSize", 10);
			}else if(width <  600){
				$(".link-content").css("fontSize", 12);
				$("body").css("fontSize", 12);
			}
			
		});
	}
		
	chrome.storage.sync.get(function (result) { 
		calendar = result.calendar; 
		$("#calendar").val(calendar);
	});	
	
	$('*.popup').click(function(){
		_gaq.push(['_trackEvent', $(this).attr('id'), 'clicked']);
	});
	
	$('*.link').click(function(){
		console.log("Click");
		_gaq.push(['_trackEvent', $(this).attr('id'), 'clicked']);
		if($(this).attr("id") == 'schedule'){ 
			if(typeof calendar === 'undefined' || settings == true){ 
				$('#schedule-modal').modal('show');
				$('#calendar').focus(); 
			}else{ 
				chrome.tabs.create({url: $(this).attr('href') + $("#calendar").val()});
			}
		}else{
			chrome.tabs.create({url: $(this).attr('href')});
		}
		return false; 
	});
	
	$('*#name').click(function(){
		_gaq.push(['_trackEvent', 'name', 'clicked']);
		$(".front").hide("fast");
		$(".back").show("fast");
	});
	
	$('#back').click(function(){
		_gaq.push(['_trackEvent', 'back', 'clicked']);
		$(".back").hide("fast");  
		$(".front").show("fast");
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
	
	$("#form-winner").submit(function( event ) {
		$.post( "http://riddle.founder.no?action=contact", {answer: $("#answer").val(), person: $("#person-name").val(), email: $("#person-email").val()}).done(function( response ) {
			switch(response){
				case 'sent': 
					$("#winner-message").html('Woho, jeg tar kontakt!');
					$("#person-email").prop('disabled',true);
					$("#person-email").prop('required',false); 
					$("#person-name").prop('disabled',true);
					$("#person-name").prop('required',false);
					$("#embrace").prop( "disabled", true );
					$("#embrace").addClass( "disabled");
				break; 
			}
		});
		event.preventDefault();
	});
	$("#form-riddle").submit(function( event ) {
		$.post( "http://riddle.founder.no?action=riddle", {answer: $("#answer").val()}).done(function( response ) {
			_gaq.push(['_trackEvent', 'riddle', $("#answer").val()]); 
			switch(response){
				case 'true':
					$("#riddle").hide('slow');
					$("#winner").show('slow');
				break;
				case 'false':
					var min = 1; 
					var max = 30;
					var random = Math.floor(Math.random() * (max - min + 1)) + min;
					switch (random){  
						case 1:
							message = 'Ehm, njææ.';
						break;
						case 2:
							message = 'Ehm, tar den på neste!';
						break;
						case 3:
							message = 'Feil, håpløs gåte.';
						break;
						case 4:
							message = 'Who made this shit?!';
						break; 
						case 5:
							message = 'Feil, feil, feil.'; 
						break;
						case 6:
							message = 'Feil, not nerdy enough?'; 
						break;
						case 7:
							message = 'Feil, livet er brutalt.'; 
						break;
						case 8: 
							message = 'Feil, jaja, life goes on.'; 
						break;
						case 9:
							message = 'Feil, trenger noen øl!'; 
						break;
						case 10:
							message = 'Feil, burde lest mer.'; 
						break;
						case 11:
							message = "Feil :'("; 
						break;
						case 12:
							message = 'Feil, Morten trenger et liv.'; 
						break;
						case 13:
							message = 'Feil, men prokast. er bra :)'; 
						break;
						case 14:
							message = 'Feil, les skole? :/'; 
						break;
						case 15:
							message = 'Feil, leser vg i stedet :('; 
						break;
						case 16:
							message = 'Feil, har Einstein svaret?'; 
						break;
						case 17:
							message = 'Feil, pause på kontoret.'; 
						break;
						case 18:
							message = 'Feil, ta en shot.'; 
						break;
						case 19:
							message = 'Feil, var da som ****! :/'; 
						break;
						case 20:
							message = 'Feil, livet leker ikke..'; 
						break;
						case 21:
							message = "Feil, not smart enough :("; 
						break;
						case 22:
							message = 'Feil, finnes det et svar?'; 
						break;
						case 23:
							message = 'Feil, skulle hatt et hint!'; 
						break;
						case 24:
							message = 'Feil, ONE MORE TRY!'; 
						break;
						case 25:
							message = 'Feil, noooooooooo!'; 
						break;
						case 26:
							message = 'Feil, BOLLOX!'; 
						break;
						case 27:
							message = 'Feil, var kanskje nesten.'; 
						break;
						case 28:
							message = 'Feil, NOES!'; 
						break;
						case 29:
							message = 'Feil, sett NASA på saken!'; 
						break;
						case 30:
							message = 'Feil, vask kollektivet?'; 
						break;
						default:
							message = 'Shiiiiiet, scriptet aner ikke hva det skal si.';
						break;
					}
					$(".form-group").addClass('has-error');
					$("#answer-button").html(message);
					$("#answer-button").prop('disabled',true);
					$("#answer-button").removeClass('btn-default');
					$("#answer-button").addClass('btn-danger');
					setTimeout(function(){ 
						$(".form-group").removeClass('has-error');
						$("#answer-button").removeClass('btn-danger');
						$("#answer-button").addClass('btn-default');
						$("#answer-button").prop('disabled',false);
						$("#answer-button").html('Jeg har svaret!');
					}, 2000);
				break;				
				default:
				break;
			}
		});
		event.preventDefault();
	});
	
	$(document).keydown(function(e) {
		if(!swiching_key && !$('#schedule-modal').hasClass('in') && !$('.back').is(':visible')){ 
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

				default: return;
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
	
	$( window ).resize(function() {
  		resizeWindow();
	});
	
	resizeWindow();
	showKey(key_current);
});

