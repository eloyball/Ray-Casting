function setup() {
  createCanvas(windowWidth, windowHeight);
  
  genBoundingBox();
  genRandWalls(6);
  //genTiltedMaze(150);
  emitter = new Emitter(createVector(width/2, height/2), 90);
}

function draw() {
  background(12);

  renderBoundaries();
  emitter.rayTrace();
}
