class Ray {
    constructor(pos, angle) {
        this.originPos = pos;
        this.dir = p5.Vector.fromAngle(radians(angle));
        this.targetPos = createVector(this.originPos.x, this.originPos.y);
    }

    lineTrace(bound) {      
        const x1 = this.originPos.x;
        const y1 = this.originPos.y;
        const x2 = this.originPos.x + this.dir.x;
        const y2 = this.originPos.y + this.dir.y;

        const x3 = bound.x1;
        const y3 = bound.y1;

        if(bound instanceof Wall) {
            const x4 = bound.x2;
            const y4 = bound.y2;

            const d = (x3 - x4) * (y1 - y2) - (x1 - x2) * (y3 - y4);

            if(d == 0) {
                return;
            }

            const t = ((x3 - x1) * (y1 - y2) - (y3 - y1) * (x1 - x2)) / d;
            const u = -((x3 - x4) * (y3 - y1) - (y3 - y4) * (x3 - x1)) / d;

            if(t > 0 && t < 1 && u > 0) {
                const hitPt = createVector();

                hitPt.x = x3 + t * (x4 - x3);
                hitPt.y = y3 + t * (y4 - y3);

                return hitPt;
            }
        }

        return;
    }

    setTargetPos(x, y) {
        this.targetPos = createVector(x, y);
    }

    drawComponent() {
        stroke(255, 100);
        line(this.originPos.x, this.originPos.y, this.targetPos.x, this.targetPos.y);
    }
}