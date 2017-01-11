document.addEventListener("DOMContentLoaded", function(event) {   
	afterLoad();
});

function afterLoad() {
	setTimeout(showPage,3000);
};

function showPage() {
	document.getElementById('loader').style.display = 'none';
	document.getElementById('text-div').style.display = 'block';
	centralizeElement();
}
	
function centralizeElement() {
	var windowHeight = window.innerHeight;
	var textDivHeight = document.getElementById("text-div").offsetHeight;
	var textDiv = document.getElementById("text-div");

	var autoHeight = (windowHeight - textDivHeight) / 2;

	textDiv.style.marginTop = autoHeight + "px";
}

window.onresize = function(){
	centralizeElement();
};