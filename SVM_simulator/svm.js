class SVM {
    constructor() {
        this.points = [];
        this.w = null;
        this.b = 0;
        this.showSVM = false;
        this.currentClass = 'A';
    }

    addPoint(x, y) {
        this.points.push({x: x, y: y, label: this.currentClass});
        if (this.showSVM) {
            this.calculate();
        }
    }

    reset() {
        this.points = [];
        this.showSVM = false;
    }

    toggle() {
        this.showSVM = !this.showSVM;
        if (this.showSVM) {
            this.calculate();
        }
    }

    setClass(c) {
        this.currentClass = c;
    }

    calculate() {
        if (this.points.length < 2) return;

        this.w = createVector(random(-1, 1), random(-1, 1));
        this.b = random(-1, 1);
        
        for (let i = 0; i < 1000; i++) {
            let error = false;
            for (let p of this.points) {
                let x = createVector(p.x / width - 0.5, p.y / height - 0.5);
                let y = p.label === 'A' ? 1 : -1;
                let activation = this.w.dot(x) + this.b;
                if (y * activation <= 0) {
                    this.w.add(p5.Vector.mult(x, y * 0.1));
                    this.b += y * 0.1;
                    error = true;
                }
            }
            if (!error) break;
        }
    }

    drawPoints() {
        for (let p of this.points) {
            fill(p.label === 'A' ? color(231, 76, 60) : color(52, 152, 219));
            ellipse(p.x, p.y, 10, 10);
        }
    }

    drawSVM() {
        this.drawLine(0, 'black', 2);
        this.drawLine(1, 'red', 1);
        this.drawLine(-1, 'red', 1);
    }

    drawLine(offset, color, weight) {
        let b2 = this.b + offset;
        strokeWeight(weight);
        if (abs(this.w.y) > abs(this.w.x)) {
            let x1 = (-b2 - this.w.x * -0.5) / this.w.y * height + height / 2;
            let x2 = (-b2 - this.w.x * 0.5) / this.w.y * height + height / 2;
            stroke(color);
            line(0, x1, width, x2);
        } else {
            let y1 = (-b2 - this.w.y * -0.5) / this.w.x * width + width / 2;
            let y2 = (-b2 - this.w.y * 0.5) / this.w.x * width + width / 2;
            stroke(color);
            line(y1, 0, y2, height);
        }
    }
}