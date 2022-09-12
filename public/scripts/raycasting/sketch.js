let testRay;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  genBoundingBox();
  genRandWalls(10);
  //genTiltedMaze(150);
  genCircles(10);
  emitter = new Emitter(createVector(width/2, height/2), 90);

  //testRay = new Ray(createVector(width/2, height/2), 0);
}

function draw() {
  background(12);

  renderBoundaries();
  emitter.rayTrace();
  
  //testRay.setTargetPos(mouseX, mouseY);
  //let pt = testRay.lineTrace(boundaries[4]);
  //circle(pt.x, pt.y, 10);
  //testRay.drawComponent();
}
