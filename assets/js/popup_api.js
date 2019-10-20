// Author: Jay Sharma (B00824331)

function popup(city) {
	if (city == '') {
		var city2 = document.getElementById("search_location").value;
		if (city2 == '') { }
		else {
			document.getElementById("search_location").value = city2;
			document.getElementById("locate").click();
		}
	}
	else {
		document.getElementById("search_location").value = city + ", Canada";
		document.getElementById("locate").click();
	}
}