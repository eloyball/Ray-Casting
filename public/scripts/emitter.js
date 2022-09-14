let emitter;

class Emitter {
    constructor(pos) {
        this.pos = pos;
        this.rays = [];
    }

    updatePos(x, y) {
        const x1 = (x < 1 || x > width - 1) ? (x < 1 ? 1 : width - 1) : x;
        const y1 = (y < 1 || y > height - 1) ? (y < 1 ? 1 : height - 1) : y;

        const offsetX = x1 - this.pos.x;
        const offsetY = y1 - this.pos.y;
        
        this.pos = createVector(x1, y1);
        for(const ray of this.rays) {
            ray.originPos = createVector((ray.originPos.x + offsetX), (ray.originPos.y + offsetY));
        }
    }
}

class RCEmitter extends Emitter {
    constructor(pos, count) {
        super(pos);
        this.initRays(count);
    }

    initRays(count) {
        const a = 360 / count;
        for(let i = 0; i < 360; i += a) {
            this.rays.push(new Ray(this.pos, i));
        }
    }

    rayTrace() {
        for(const ray of this.rays) {
            let nearPt = null;
            let maxDist = Infinity;

            for(const bound of boundaries) {
                const hitPt = ray.lineTrace(bound);

                if(hitPt) {
                    const dist = p5.Vector.dist(this.pos, hitPt);
                    
                    if(dist < maxDist) {
                        maxDist = dist;
                        nearPt = hitPt;
                    }
                }
            }

            if(nearPt) {
                ray.setTargetPos(nearPt.x, nearPt.y);
            }

            ray.drawComponent();
        }
    }
}

class RMEmitter extends Emitter {
    constructor(pos, angle) {
        super(pos);
        this.angle = angle;
    }

    rayMarch(n) {
        this.rays = [];
        this.rays.push(new MarchingRay(this.pos, this.angle));

        for(let i = 0; i < n; i++) {
            let minDist = Infinity;
            
            if(i > 0) {
                this.rays.push(new MarchingRay(this.rays[i - 1].targetPos, this.angle));
            }
            
            for(const bound of boundaries) {
                const d = this.rays[i].shortDistTo(bound);
                minDist = d < minDist ? d : minDist;
            }

            if(Math.abs(minDist) < 1) {
                break;
            }
            
            this.rays[i].drawComponent(Math.abs(minDist));
        }
    }

    drawComponent() {
        stroke(255);
        circle(this.pos.x, this.pos.y, 20);
    }
}