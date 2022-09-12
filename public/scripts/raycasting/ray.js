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
            console.log("wall");
            const x4 = bound.x2;
            const y4 = bound.y2;

            const d = (x3 - x4) * (y1 - y2) - (x1 - x2) * (y3 - y4);

            if(d == 0) {
                return false;
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

        if(bound instanceof Sphere) {
            const l = p5.Vector.sub(createVector(bound.x1, bound.y1), this.originPos);
            const tca = l.dot(this.dir);
            const d2 = l.dot(l) - tca * tca;
            const radius2 = bound.r * bound.r;
            
            if (d2 > radius2) {
                return false;
            }
            
            const thc = Math.sqrt(radius2 - d2);
            let t0 = tca - thc;
            let t1 = tca + thc;

            console.log(t0 + " - " + t1);

            if(t0 > t1) {
                let temp = t0;
                t0 = t1;
                t1 = temp;
            }

            if(t0 < 0) {
                t0 = t1;
                if (t0 < 0) {
                    return false;
                }
            }

            let hitPt = p5.Vector.mult(this.dir, t0);
            hitPt.add(this.originPos);
            return hitPt; 
        }
    }

    setTargetPos(x, y) {
        this.targetPos = createVector(x, y);
        this.dir = p5.Vector.sub(this.originPos, this.targetPos);
        this.dir.normalize();
    }

    drawComponent() {
        stroke(255, 100);
        line(this.originPos.x, this.originPos.y, this.targetPos.x, this.targetPos.y);
    }
}