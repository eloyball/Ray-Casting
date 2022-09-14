function setup() {
  createCanvas(windowWidth, windowHeight);
  
  genBoundingBox();
  genRandWalls(3);
  //genTiltedMaze(150);
  genCircles(6);
  emitter = new RMEmitter(createVector(width/2, height/2), 0);
}

function draw() {
  background(12);

  renderBoundaries();
  emitter.rayMarch(100);
  emitter.drawComponent();
}

// ==================== Mouse Action Mapping ====================

let locked = false;

function mousePressed() {
  const lockRadius = 20;
  if(
    mouseX < (emitter.pos.x + lockRadius) &&
    mouseX > (emitter.pos.x - lockRadius) &&
    mouseY < (emitter.pos.y + lockRadius) &&
    mouseY > (emitter.pos.y - lockRadius) ) {
      locked = true;
    } else {
      locked = false;
      emitter.angle = (-1) * ((degrees(atan2(mouseX - emitter.pos.x, mouseY - emitter.pos.y))) - 90);
    }
}

function mouseDragged() {
  if(locked) {
    emitter.updatePos(mouseX, mouseY);
  } else {
    emitter.angle = (-1) * ((degrees(atan2(mouseX - emitter.pos.x, mouseY - emitter.pos.y))) - 90);
  }
}

function mouseReleased() {
  locked = false;
}