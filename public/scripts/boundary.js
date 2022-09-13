let boundaries = [];

class Boundary {
    constructor(x1, y1) {
        this.x1 = x1;
        this.y1 = y1;
    }
}

class Wall extends Boundary {
    constructor(x1, y1, x2, y2) {
        super(x1, y1);
        this.x2 = x2;
        this.y2 = y2;
    }

    drawComponent() {
        stroke(255);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

class Sphere extends Boundary {
    constructor(x1, y1, r) {
        super(x1, y1);
        this.r = r;
    }

    drawComponent() {
        stroke(255);
        noFill();
        circle(this.x1, this.y1, this.r * 2);
    }
}

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
    
    for(let i = 0; i < 10000; i++) {
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

function genCircles(num) {    
    let record = [];
    let maxNum = min(num, 10);
    
    for(let i = 0; i < 1000; i++) {
        const r = random(25, 50);

        const circle = {
            r: r,
            x: random(r, width - r),
            y: random(r, height - r),
        }

        let valid = true;

        for(const otherC of record) {
            distance = dist(circle.x, circle.y, otherC.x, otherC.y);
            overlap = circle.r + otherC.r;
            
            if(distance < overlap) {
                valid = false;
                break;
            }
        }
        
        if(valid) {
            record.push(circle);
            boundaries.push(new Sphere(circle.x, circle.y, circle.r));
        }

        if(record.length >= maxNum) {
            break;
        }
    }
}

function renderBoundaries() {
    for(const bound of boundaries) {
        bound.drawComponent();
    }
}