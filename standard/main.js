import { Abacus } from './abacus.js';

class AbacusCalculator {
    constructor() {
        this.abacus = new Abacus('abacus');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('setNumber').addEventListener('click', () => this.setNumber());
        document.getElementById('clearAbacus').addEventListener('click', () => this.clearAbacus());
        this.abacus.container.addEventListener('click', () => this.updateResult());
    }

    setNumber() {
        const input = document.getElementById('input').value;
        const number = parseInt(input);
        if (isNaN(number) || Math.abs(number) > 9999999) {
            alert('유효한 숫자를 입력해주세요 (-9999999 ~ 9999999).');
            return;
        }
        
        this.abacus.setNumber(number);
        this.updateResult();
    }

    clearAbacus() {
        this.abacus.clear();
        this.updateResult();
    }

    updateResult() {
        const result = this.abacus.getValue();
        document.getElementById('result').textContent = `현재 값: ${result}`;
    }
}

new AbacusCalculator();