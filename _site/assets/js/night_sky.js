
function setupStars() {
		
	var start = new Date(); //time in milliseconds

	var stars = document.getElementById('stars');
	var skyWidth = stars.parentNode.clientWidth;
	var skyHeight = 2 * stars.parentNode.clientHeight; // sky is circle that is twice the height
	//var numberOfStars = 1000; //Math.round(xMax + yMax) / 8;
	//var numberOfStars = skyWidth * skyHeight / 6000;
	


	var radiusOfEnclosingCircle = Math.floor(Math.sqrt(Math.pow(skyWidth,2) + Math.pow(skyHeight,2)));
	//var numberOfStars = radiusOfEnclosingCircle * radiusOfEnclosingCircle / 2000;
	var numberOfStars = radiusOfEnclosingCircle ;
	//var numberOfStars = 50 ;


	stars.style.width = radiusOfEnclosingCircle + "px";
	stars.style.height = radiusOfEnclosingCircle + "px";
	stars.style.top = Math.floor(-(radiusOfEnclosingCircle - skyHeight) / 2) + "px";
	stars.style.left = Math.floor(-(radiusOfEnclosingCircle - skyWidth) / 2) + "px";



	canvasWidth = radiusOfEnclosingCircle;
	canvasHeight = radiusOfEnclosingCircle;

	console.log("numberOfStars = " + numberOfStars + ", stars.style.width = " + stars.style.width);

	console.log("setupStars with skyWidth = " + skyWidth + " and skyHeight = " + skyHeight + " and radiusOfEnclosingCircle = " + radiusOfEnclosingCircle);


	var dpr = window.devicePixelRatio || 1;


	if(radiusOfEnclosingCircle > 1500) {
		dpr = 1; // safari on mac is really slow at scaling canvases at large sizes
	}



	
	var stars1 = document.getElementById('stars1');
	stars1.width = canvasWidth * dpr;
	stars1.height = canvasHeight * dpr;
	
	console.log("dpr = " + dpr + ", stars1.clientWidth = " + stars1.clientWidth + ", stars1.clientHeight = " + stars1.clientHeight);
	stars1.getContext('2d').scale(dpr, dpr);
	generateStars(stars1, dpr, numberOfStars, 1, 2, 0.1, 0.4);
	


	


	var stars2 = document.getElementById('stars2');
	stars2.width = canvasWidth * dpr;
	stars2.height = canvasHeight * dpr;
	stars2.getContext('2d').scale(dpr, dpr);
	generateStars(stars2, dpr, numberOfStars / 10, 1, 3, 0.3, 0.6);
	

	var stars3 = document.getElementById('stars3');
	stars3.width = canvasWidth * dpr;
	stars3.height = canvasHeight * dpr;
	stars3.getContext('2d').scale(dpr, dpr);
	generateStars(stars3, dpr, numberOfStars / 20, 2, 3, 0.6, 0.8);
	
	
	var diff = new Date()-start;

	console.log("Done setupStars!");
	console.log("diff = " + diff);



	
}


function generateStars(canvas, dpr, numberOfStars, minRadius, maxRadius, minOpacity, maxOpacity) {
	var ctx = canvas.getContext('2d');
	var xMax = canvas.width / dpr;
	var yMax = canvas.height / dpr;

	console.log("xMax = " + xMax + ", yMax = " + yMax);
	var hmTimes = Math.round(xMax + yMax) / 8;	

	for(var i=0; i<=numberOfStars; i++) {
		var randomX = randomBetween(1, xMax); //Math.floor((Math.random()*xMax)+1);
		var randomY = randomBetween(1, yMax); //Math.floor((Math.random()*yMax)+1);
		var randomSize = randomBetween(minRadius, maxRadius); //Math.floor((Math.random()*2)+1);
		var randomOpacity = randomBetween(minOpacity, maxOpacity);
		var randomHue = randomBetween(1, 360); //Math.floor((Math.random()*360)+1);
		if(randomSize>1) {
			//ctx.shadowBlur = Math.floor((Math.random()*15)+5);
			//ctx.shadowColor = "white";
		}
		ctx.beginPath();
		
		ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, " + randomOpacity + ")";
		//console.log("hsla("+randomHue+", 30%, 80%, " + randomOpacity + ")");
		//ctx.fillRect(randomX, randomY, randomSize, randomSize);
		//ctx.arc(randomX, randomY, randomSize, 0, 2 * Math.PI);

		ctx.arc(Math.round(randomX), Math.round(randomY), Math.round(randomSize), 0, 2 * Math.PI);

		ctx.fill();
		ctx.closePath();
	}

}
function randomBetween(min, max) {
	return min + (Math.random() * (max-min));
}


//window.addEventListener('resize', setupStars, false);

setupStars();
