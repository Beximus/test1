function init(){
	var output = document.getElementById("location");
	var dataContainerOrientation = document.getElementById('infoContainer');
  var dataContainerMotion = document.getElementById('containerInfo');

	if (!navigator.geolocation) {
		output.innerHTML = "<p> Geolocation is not supported by this browser</p>";
		return;
	}

	function sucess(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		console.log(latitude,longitude);
		output.innerHTML = "<p>Your starting latitude is: " + latitude + "<br>Your Starting longitude is: " + longitude +"</p>";

		mapboxgl.accessToken = 'pk.eyJ1IjoiYmV4aW11cyIsImEiOiJjamc5MG04ZXU5dDhhMnhtczVjeTI5c3kyIn0.m5hg57ASif4CYrkda7Wg_g';
		var map = new mapboxgl.Map({
		    container: 'map', // container id
		    style: 'mapbox://styles/beximus/cjg996x9mermg2srybd501gup', // stylesheet location
		    center: [longitude, latitude], // starting position [lng, lat]
		    zoom: 14 // starting zoom
		});

		if(window.DeviceOrientationEvent) {
    	window.addEventListener('deviceorientation', function(event) {
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;
           
            if(alpha!=null || beta!=null || gamma!=null) 
              dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
          }, false);
  		}

  		if(window.DeviceMotionEvent) {
    	// console.log('HUI');
  		window.addEventListener('devicemotion', function(event) {
            var x = event.accelerationIncludingGravity.x;
            var y = event.accelerationIncludingGravity.y;
            var z = event.accelerationIncludingGravity.z;
            var r = event.rotationRate;
            var html = 'Acceleration:<br />';
            html += 'x: ' + x +'<br />y: ' + y + '<br/>z: ' + z+ '<br />';
            html += 'Rotation rate:<br />';
            if(r!=null) html += 'alpha: ' + r.alpha +'<br />beta: ' + r.beta + '<br/>gamma: ' + r.gamma + '<br />';
            dataContainerMotion.innerHTML = html;
            // console.log(r.alpha);

            //Create Geolocation if Threshold is hit
            if(r.alpha<-20||r.beta<-20||r.gamma<-20){
            	if(r.alpha>130||r.beta>130||r.gamma>130){
              	document.body.style.color = "red";
              	output.innerHTML = "<p>yeahboi</p>"

              	// map.on('load',function(){
              	// 	map.addLayer({
              	// 		"id":"points",
              	// 		"type": "symbol",
              	// 		"source": {
              	// 			"type":"geojson",
              	// 			"data": {
              	// 				"type": "FeatureCollection",
              	// 				"features": [{
              	// 					"type": "Feature",
              	// 					"geometry":{
              	// 						"type": "Point",
              	// 						"coordinates": [longitude, latitude]
              	// 					},
              	// 					"properties":{
              	// 						"title": "jump1";
              	// 						"icon": "monument"
              	// 					}
              	// 				}]
              	// 			}
              	// 		}
              	// 		"layout":{
              	// 			"icon-image":"{icon}-15",
              	// 			"text-field":"{title}",
              	// 			"text-anchor":"top"
              	// 		}
              	// 	});
              	// });
              	// showPosition();
             	 // getLocation();
      

            	}
            	// code addition end

          	}
          });
  		}
	}

	function error(){
		output.innerHTML = "<p> computer says no </p>"
	}

	output.innerHTML = "<p> Thinking </p>";

	navigator.geolocation.getCurrentPosition(sucess,error);
}

