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