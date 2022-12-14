function setup() {
  createCanvas(windowWidth, windowHeight);
  
  genBoundingBox();
  genRandWalls(3);
  //genTiltedMaze(150);
  genCircles(6);
  emitter = new RCEmitter(createVector(width/2, height/2), 90);
}

function draw() {
  background(12);

  renderBoundaries();
  emitter.rayTrace();
}

// ==================== Mouse Action Mapping ====================

function mousePressed() {
  emitter.updatePos(mouseX, mouseY);
}

function mouseDragged() {
  emitter.updatePos(mouseX, mouseY);
}