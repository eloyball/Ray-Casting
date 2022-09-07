let boundaries = [];

function genWalls(num) {
    for(let i = 0; i < num; i++) {
        boundaries.push(new Wall(random(width), random(height), random(width), random(height)));
    }
}

function genTiltedMaze(size) {
    let x = 0;
    let y = 0;
    
    while(true) {
        if(random(1) < 0.5) {
            boundaries.push(new Wall(x, y, x + size, y + size));
        } else {
            boundaries.push(new Wall(x, y + size, x + size, y));
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