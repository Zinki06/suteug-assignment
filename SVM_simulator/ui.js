class UI {
    constructor(svm) {
        this.svm = svm;
    }

    setupButtons() {
        select('#resetButton').mousePressed(() => this.svm.reset());
        select('#toggleSVMButton').mousePressed(() => this.svm.toggle());
        select('#classAButton').mousePressed(() => this.svm.setClass('A'));
        select('#classBButton').mousePressed(() => this.svm.setClass('B'));
    }
}