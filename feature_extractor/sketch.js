let mobilenet, classifier;

let label = undefined;
let probability = NaN;

let probP, labelP;
let imageButton, imageLabel;
let trainButton;

function gotResult(err, results){
	if(err){
		console.error(err);
	}
	else{
		label = results[0].className;
		probability = results[0].probability;
		classifier.predict(gotResult);
	}
}


function setup() {
	
	createCanvas(640, 550);
	video = createCapture(VIDEO, () => {
		mobilenet = ml5.featureExtractor('MobileNet', () => {
			console.log("Model is ready!");
		});
		classifier = mobilenet.classification(video, () => {
			console.log("Video is ready!");
		});
	});
	video.hide();
	background(0);
	
	createDomElements();
	handleButtons();
}

function createDomElements(){
	imageButton = createButton("Add new Image");
	imageLabel = createInput("label");

	labelP = createP("Label: LOADING CAMERA");
	probP = createP("Probability: LOADING CAMERA");
	trainButton = createButton("Re-Train model");

}

function handleButtons(){
	imageButton.mousePressed(() => {
		let label = imageLabel.value();
		console.log("add image, label: " + label)
		classifier.addImage(label);
	});

	trainButton.mousePressed(() => {
		classifier.train((loss) => {
			console.log(loss);
		});
	});
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
