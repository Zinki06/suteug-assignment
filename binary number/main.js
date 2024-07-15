import { BinaryAbacus } from './abacus.js';
import { addBinary, subtractBinary, multiplyBinary, divideBinary } from './binaryOperations.js';

const BITS = 16;

class BinaryAbacusCalculator {
    constructor() {
        this.abacusA = new BinaryAbacus('abacusA', BITS);
        this.abacusB = new BinaryAbacus('abacusB', BITS);
        this.abacusResult = new BinaryAbacus('abacusResult', BITS);
        this.setupEventListeners();
        this.calculateRealtime();
    }

    setupEventListeners() {
        document.getElementById('inputA').addEventListener('input', this.handleInput.bind(this, 'A'));
        document.getElementById('inputB').addEventListener('input', this.handleInput.bind(this, 'B'));
        document.getElementById('operation').addEventListener('change', this.calculateRealtime.bind(this));
        this.abacusA.container.addEventListener('click', this.handleAbacusClick.bind(this, 'A'));
        this.abacusB.container.addEventListener('click', this.handleAbacusClick.bind(this, 'B'));
    }

    handleInput(abacus) {
        const input = document.getElementById(`input${abacus}`);
        input.value = input.value.replace(/[^01]/g, '').substr(0, BITS);
        this[`abacus${abacus}`].setNumber(input.value);
        this.calculateRealtime();
    }

    handleAbacusClick(abacus) {
        const binary = this[`abacus${abacus}`].getNumber();
        document.getElementById(`input${abacus}`).value = binary;
        this.calculateRealtime();
    }

    calculateRealtime() {
        const binaryA = this.abacusA.getNumber().padStart(BITS, '0');
        const binaryB = this.abacusB.getNumber().padStart(BITS, '0');
        const operation = document.getElementById('operation').value;

        let result, steps, remainder;

        switch (operation) {
            case 'add':
                ({ result, steps } = addBinary(binaryA, binaryB, BITS));
                break;
            case 'subtract':
                ({ result, steps } = subtractBinary(binaryA, binaryB, BITS));
                break;
            case 'multiply':
                ({ result, steps } = multiplyBinary(binaryA, binaryB, BITS));
                break;
            case 'divide':
                ({ result, remainder, steps } = divideBinary(binaryA, binaryB, BITS));
                break;
        }

        this.abacusResult.setNumber(result);

        const decimalA = parseInt(binaryA, 2);
        const decimalB = parseInt(binaryB, 2);
        const decimalResult = parseInt(result, 2);

        let resultText = `계산: ${binaryA} ${this.getOperationSymbol(operation)} ${binaryB}<br>
                          결과 (이진수): ${result}<br>
                          결과 (십진수): ${decimalResult}`;

        if (operation === 'divide' && remainder) {
            resultText += `<br>나머지 (이진수): ${remainder}<br>
                           나머지 (십진수): ${parseInt(remainder, 2)}`;
        }

        document.getElementById('result').innerHTML = resultText;
        document.getElementById('steps').innerHTML = steps.join('<br>');
    }

    getOperationSymbol(operation) {
        switch (operation) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '';
        }
    }
}

// 클래스의 인스턴스 생성
new BinaryAbacusCalculator();