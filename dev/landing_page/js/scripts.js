document.addEventListener("DOMContentLoaded", function(event) {
	centralizeElement([document.getElementById('loader')]);
	afterLoad();
});

function afterLoad() {
	setTimeout(showPage,3000);
};

function showPage() {
	document.getElementById('loader').style.display = 'none';

	var contentWrapper = document.getElementsByClassName('content-wrapper')[0];
	contentWrapper.style.display = 'block';

	centralizeElement([contentWrapper]);
};

function centralizeElement(elements) {
	elements.forEach(function(e) {
		if(e) {
			var windowHeight = window.innerHeight;
			var eHeight = e.offsetHeight;

			var autoHeight = (windowHeight - eHeight) / 2;

			e.style.marginTop = autoHeight + "px";
		}
	});
};

window.onresize = function(){
	centralizeElement([
		document.getElementsByClassName('content-wrapper')[0],
		document.getElementById('loader')
	]);
};
