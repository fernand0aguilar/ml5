const classifier = ml5.imageClassifier('MobileNet', modelReady);
let img;

function modelReady(){
	createP("Model Loaded");
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	noCanvas();
	img  = createImg("/images/bird.jpg", imageReady);
	img.size(600, 400);
}


function imageReady(){
	classifier.predict(img, gotResult);
}

function gotResult(err, results){
	if(err){
		console.error(err);
	}
	createP("Result: " + results[0].className);
	createP("Probability: " + nf(results[0].probability, 0, 2));
}
