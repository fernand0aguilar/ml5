let mobilenet;
let label = undefined;
let probability = 0;
let probP, labelP;

function modelReady(){
	createP("Model Loaded");
	mobilenet.predict(gotResult);
}


function gotResult(err, results){
	if(err){
		console.error(err);
	}
	else{
		label = results[0].className;
		probability = results[0].probability;
		mobilenet.predict(gotResult);
	}
}


function setup() {
	createCanvas(640, 550);
	video = createCapture(VIDEO, () => {
		mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
	});
	video.hide();
	background(0);

	labelP = createP("Label: LOADING CAMERA");
	probP = createP("Probability: LOADING CAMERA");
}

function draw(){
	background(0);
	image(video, 0, 0);
	fill(255, 0, 255);
	textSize(32);
	text(label, 10, height - 20);
	drawInfo();
}


function drawInfo(){
	labelP.html("Result: " + label);
	probP.html("Probability: " + probability);
}
