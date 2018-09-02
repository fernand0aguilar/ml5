let mobileNet, predictor;
let video;
let value = 0;
let slider, addButton, trainButton;

// Setup program - Run Once
function setup(){
	createCanvas(320, 270);
	video = createCapture(VIDEO, () => {
		// Create model from ml5 library
		mobileNet = ml5.featureExctractor('MobileNet', () => {
			console.log("Model is ready!");
		});
		// Create transfer learning classifier
		predictor = mobileNet.regression(video, () => {
			console.log("Video is ready!");
		});
	});
	video.hide();
	background(0);

	createDomElements();
	handleDomElements();
}

// P5.js while(1) loop
function draw(){
	background(0);
	image(video, 0, 0, 320, 240);
	rectMode(CENTER);
	fill(255, 0, 200);

	rect(value * width, height/2, 50, 50);
	fill(255);
	textSize(16);
	text(value, 10, height - 10);
}

// Creates html elements using p5 lib
function createDomElements() {
	slider = createSlider(0, 1, 0.5, 0.01);
	addButton = createButton("Add Example Image");
	trainButton = createButton("Train");
}

// Handle Click on Buttons 
function handleDomElements() {
	addButton.mousePressed(() => {
		predictor.addImage(slider.value());
	});

	trainButton.mousePressed(() => {
		predictor.train(() => {
			if (loss !== null) console.log(loss);
			else {
				console.log("Training complete!");
				predictor.predict(gotResults);
			}
		});
	});
}

// CallBack to predict function
function gotResults(error, result) {
	if (error) console.error(error);
	else {
		value = result;
		predictor.predict(gotResults);
	}
}