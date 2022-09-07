function setup() {
  createCanvas(windowWidth, windowHeight);
  
  genTiltedMaze(150);
}

function draw() {
  background(12);

  renderBoundaries();
}
