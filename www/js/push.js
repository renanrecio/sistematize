function setupPush() {
    
	var push = PushNotification.init({
		 "android": {
			 "senderID": "121897226764"
		 },
		 "ios": {
		   "sound": true,
		   "alert": true,
		   "badge": true,
		   "categories": {
			 "newmusic": {
				 "yes": {
					 "callback": "playMusic", "title": "Play",
					 "foreground": true, "destructive": false
				 },
				 "no": {
					 "callback": "archive", "title": "Archive",
					 "foreground": false, "destructive": false
				 }
			 }
		   }
		 },
		 "windows": {}
	});

   push.on('registration', function(data) {
       console.log("registration event: " + data.registrationId);
       var oldRegId = localStorage.getItem('registrationId');
	   alert('id: '+data.registrationId);
       if (oldRegId !== data.registrationId) {
           // Save new registration ID
           localStorage.setItem('registrationId', data.registrationId);
           // Post registrationId to your app server as the value has changed
       }
   });

   push.on('error', function(e) {
       console.log("push error = " + e.message);
   });
   
 
	 
	 push.on('notification', function(data) {
     console.log('notification event');
     var artist = data.additionalData.artist;
     if (artist) {
       showArtist(artist);
     } else {
       navigator.notification.alert(
           data.message,         // message
           null,                 // callback
           data.title,           // title
           'Ok'                  // buttonName
       );         
     }

		 push.finish(function() {
			 console.log('success');
		 }, function() {
			 console.log('error');
		 });     
	 });
		 
	 function playMusic() {
	   alert("Play Music!");	
	 }

	 function archive() {
	   alert("Archived!");
	 }
	 
	 function showArtist(artist) {
	   //document.getElementsByName("q")[0].value = artist;
	   //searchSubmit(new CustomEvent("noop"));
	   confirm('Mt bom');
	  // window.location.href = "teste.html";
	 }
	 
	 
		
 }
 
 
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function deviceIsReady() {
  console.log('Device is ready!');
  setupPush();
});