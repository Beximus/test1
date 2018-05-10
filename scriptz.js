function init(){
	var output = document.getElementById("location");

	if (!navigator.geolocation) {
		output.innerHTML = "<p> Geolocation is not supported by this browser</p>";
		return;
	}

	function sucess(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		console.log(latitude,longitude);
		output.innerHTML = "<p>Your starting latitude is: " + latitude + "<br>Your Starting longitude is: " + longitude +"</p>";
	}

	function error(){
		output.innerHTML = "<p> computer says no </p>"
	}

	output.innerHTML = "<p> Thinking </p>";

	navigator.geolocation.getCurrentPosition(sucess,error);
}