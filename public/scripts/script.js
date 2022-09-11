let boundaries = [];
let emitter;

function genBoundingBox() {
    boundaries.push(new Wall(0, 0, width, 0));
    boundaries.push(new Wall(width, 0, width, height));
    boundaries.push(new Wall(width, height, 0, height));
    boundaries.push(new Wall(0, height, 0, 0));
}

function genRandWalls(num) {
    for(let i = 0; i < num; i++) {
        boundaries.push(new Wall(random(width), random(height), random(width), random(height)));
    }
}

function genTiltedMaze(size) {
    let x = 0;
    let y = 0;
    
    while(true) {
        if(random(1) < 0.5) {
            boundaries.push(new Wall(x, y, x + size + 0.1, y + size + 0.1));
        } else {
            boundaries.push(new Wall(x, y + size + 0.1, x + size + 0.1, y));
        }

        x += size;

        if(x > width) {
            x = 0;
            y += size;
        }

        if(y > height) {
            break;
        }
    }
}

function renderBoundaries() {
    for(const bound of boundaries) {
        bound.drawComponent();
    }
}

function mousePressed() {
    emitter.updatePos(mouseX, mouseY);
}

function mouseDragged() {
    emitter.updatePos(mouseX, mouseY);
}