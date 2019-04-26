
//window.addEventListener("scroll", updateParallax, {passive: true});

window.addEventListener("scroll", function() {
	window.requestAnimationFrame(updateParallax);
}, {passive: true, capture: true });

window.addEventListener("wheel", function() {
	window.requestAnimationFrame(updateParallax);
}, {passive: true, capture: true });



var layers = document.getElementsByClassName("parallax");
for (var i = 0; i < layers.length; i++) {
	layers[i].dataSpeed = layers[i].getAttribute('data-speed'); // caching this seems to help performance
}
var debug = document.getElementById("debug");

function updateParallax(event){
	var top = this.pageYOffset;
	var layer, speed, yPos;
	for (var i = 0; i < layers.length; i++) {
		layer = layers[i];
		speed = layer.dataSpeed; //layer.getAttribute('data-speed');
		yPos = Math.round(top * speed / 100);

		if(top >= 1) {
			//layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');	
			layer.style.transform = 'translate3d(0px, ' + yPos + 'px, 0px)';
		}
		
	}
}
/*

window.addEventListener("scroll", function(event) {
	debug.innerHTML += "<div>scroll: pageYOffset = " + pageYOffset +"</div>";
});

window.addEventListener("touchmove", function(event) {
	debug.innerHTML += "<div>touchmove: pageYOffset = " + pageYOffset +"</div>";
});*/
// window.addEventListener("touchmove", updateParallax);