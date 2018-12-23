/* 

sideways bubbles: http://jsfiddle.net/p5gpx/. 

http://demo.web3designs.com/animated-bubble-upwards-continuously-with-pure-css.htm
http://bionicteaching.com/beer-bubbles-css/

https://codepen.io/Jintos/pen/MYWErz

______

actual bubble animations: https://gfycat.com/nauticalancientindianglassfish

____


https://ariya.io/2012/03/underwater-effect-with-html5-canvas


https://codepen.io/Lavrus/pen/lkAza   <--- good!


*/

document.addEventListener("DOMContentLoaded", function(event){
	
	// Create animations
	//createAnimationStylesheet();
	//
	console.log("scrollHeight = " + document.body.clientHeight);


	createAnimationStylesheet();
	createRandomFloatingBubbles();
	createBubbleStream(13, 2);
	createBubbleStream(83, 2);
	
});


function createAnimationStylesheet() {
	var animationStyle = document.createElement('style');

	animationStyle.appendChild(document.createTextNode("")); // WebKit hack :(
	document.head.appendChild(animationStyle);

	

	var maxDiff = 18000 / document.documentElement.clientWidth;
	

	for(var i=0; i<=100; i++) {
		var diff = Math.round(randomNumber(-maxDiff, maxDiff)); // we want the bubble to go slightly diagonal in a random direction
/*
    	animationStyle.sheet.insertRule('\
    	@keyframes bubblesMoveBottomToTop' + i + '{\
    		0% {\
		        transform: translate(' + i + 'vw, 100vh);\
		        opacity: 0.3;\
		    }\
		    40% {\
		        opacity: 0.6;\
		    }\
		    50% {\
		        opacity: 0.8;\
		    }\
		    60% {\
		        opacity: 0.4;\
		    }\
		    100% {\
		        transform: translate(' + (i + diff) + 'vw, -10vh);\
		        opacity: 0.2;\
		    }\
    	}');
		*/

		
		animationStyle.sheet.insertRule('\
    	@keyframes bubblesMoveBottomToTop' + i + '{\
    		0% {\
		        transform: translate(' + i + 'vw, 100vh);\
		        opacity: 0.3;\
		    }\
		    100% {\
		        transform: translate(' + (i + diff) + 'vw, -10vh);\
		        opacity: 0.7;\
		    }\
    	}');
		
    	//console.log("Creating bubble animation that drifts from " + i + " to " + (i + diff) + " (diff = " + diff + ")");
    }
    
}



function createRandomFloatingBubbles() {
	var bubblesContainer = document.getElementById("bubblesContainer");
	var randomBubblesContainer = document.createElement("div");
	bubblesContainer.appendChild(randomBubblesContainer);

	var maxDuration = Math.round(document.documentElement.clientHeight / 30);

	var totalArea = document.documentElement.clientHeight * document.documentElement.clientWidth;
	var totalBubbles = Math.floor(Math.sqrt(document.documentElement.clientWidth) * 5);
	
	//alert(totalBubbles);

	for(var i=0; i<totalBubbles; i++) {
		var startX = Math.round(randomNumber(0,100));
		var duration = randomNumberGaussian(maxDuration / 2, maxDuration, 2);
		
		var bubble = document.createElement("div");
		bubble.className = "bubble";


		var layerSelector = Math.random();
		
		if(layerSelector > 0.6) {
			bubble.className = "bubble layer1";
		} else if(layerSelector > 0.2) {
			bubble.className = "bubble layer2";
		} else {
			bubble.className = "bubble layer3";
		}
		
		bubble.style.animation = "bubblesMoveBottomToTop" + startX + " " + duration + "s ease-in infinite";

		
		var animationDelay = randomNumber(-maxDuration, 0);
		bubble.style.animationDelay = animationDelay + "s";

		
		var backgroundSelector = Math.round(randomNumber(0,12));
		bubble.style.backgroundPositionY = (-40 * backgroundSelector) + "px";
		//console.log("backgroundSelector = " + backgroundSelector + ", bubble.style.backgroundPositionY = " + bubble.style.backgroundPositionY);

		randomBubblesContainer.appendChild(bubble);		
	}
}

function createBubbleStream(left, layer) {

	var bubblesContainer = document.getElementById("bubblesContainer");
	var streamContainer = document.createElement("div");
	streamContainer.style.transform = "translateX(" + left + "vw)";
	bubblesContainer.appendChild(streamContainer);

	var totalBubbles = Math.round(document.documentElement.clientHeight / 20); // usually between 30 and 60 depending on screen size
	console.log("Creating " + totalBubbles +" bubbles");

	// Create bubbles
	var bubbles = Array(totalBubbles);

	var maxDuration = Math.round(document.documentElement.clientHeight / 100);

	var animationDelay = 0;
	for(var i=0; i<totalBubbles; i++) {
		
		var duration = randomNumber(maxDuration - 2, maxDuration);

		var bubble = document.createElement("div");
		bubble.className = "streamBubble";
		bubble.style.animationDuration = duration.toFixed(1) + "s";
		bubble.style.animationDelay = -animationDelay.toFixed(2) + "s";

		var span = document.createElement("span");
		span.className = "layer" + layer;
		bubble.appendChild(span);
		var leftOrRight = Math.random() > 0.5 ? "Left" : "Right";
		//span.style.animationName = "bubbleStreamMove" + leftOrRight; // not sure if needed
		span.style.animationDelay = -animationDelay.toFixed(2) + "s";

		var backgroundSelector = Math.round(randomNumberGaussian(0,12));
		span.style.backgroundPositionY = (-40 * backgroundSelector) + "px";
		
		console.log("duration = " + duration+ ", backgroundSelector = " + backgroundSelector + ", bubble.style.backgroundPositionY = " + bubble.style.backgroundPositionY);

		streamContainer.appendChild(bubble);

		animationDelay += randomNumber(0.01, 0.5);

		
	}
	
}

function randomNumber(min, max) {
	return (Math.random() * (max - min)) + min;
}
function randomNumberGaussian(min, max, average=6) {
	var sum = 0;
  	for (var i = 0; i < average; i++) {
    	sum += Math.random();
  	}
  	//console.log("randomNumberGaussian between " + min + " and " + max + ": sum = "+ sum + ", average = " + average + ", random = " + (sum / average));
  	var random = sum / average;

	return (random * (max - min)) + min;
}
