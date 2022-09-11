class Emitter {
    constructor(pos, count) {
        this.pos = pos;
        this.rays = [];
        this.initRays(count);
    }

    updatePos(x, y) {
        if((x < 0 || x > width) || (y < 0 || y > height)) {
            return;
        }
        
        this.pos = createVector(x, y);
        for(const ray of this.rays) {
            ray.originPos = this.pos;
        }
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