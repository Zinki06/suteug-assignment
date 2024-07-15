let svm;
let ui;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
    
    svm = new SVM();
    ui = new UI(svm);
    
    ui.setupButtons();
}

function draw() {
    background(240);
    svm.drawPoints();
    if (svm.showSVM && svm.points.length > 0) {
        svm.drawSVM();
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        svm.addPoint(mouseX, mouseY);
    }
}