export class Abacus {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.createAbacus();
    }

    createAbacus() {
        this.container.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const rod = document.createElement('div');
            rod.className = 'rod';
            const separator = document.createElement('div');
            separator.className = 'separator';
            rod.appendChild(separator);
            const fiveBead = document.createElement('div');
            fiveBead.className = 'bead five';
            fiveBead.onclick = () => this.toggleBead(i, 'five');
            rod.appendChild(fiveBead);
            for (let j = 0; j < 4; j++) {
                const oneBead = document.createElement('div');
                oneBead.className = 'bead one';
                oneBead.onclick = () => this.toggleBead(i, 'one', j);
                rod.appendChild(oneBead);
            }
            this.container.appendChild(rod);
        }
    }

    toggleBead(rod, type, index) {
        const beads = this.container.children[rod].getElementsByClassName(`bead ${type}`);
        if (type === 'five') {
            beads[0].classList.toggle('active');
        } else {
            for (let i = 0; i <= index; i++) {
                beads[i].classList.add('active');
            }
            for (let i = index + 1; i < beads.length; i++) {
                beads[i].classList.remove('active');
            }
        }
    }

    setNumber(number) {
        let abacusNumber = number < 0 ? 10000000 + number : number;
        const digits = abacusNumber.toString().padStart(7, '0').split('').reverse();
        for (let i = 0; i < 7; i++) {
            const rod = this.container.children[i];
            const fiveBead = rod.getElementsByClassName('bead five')[0];
            const oneBeads = rod.getElementsByClassName('bead one');
            const digit = parseInt(digits[i]);
            fiveBead.classList.toggle('active', digit >= 5);
            for (let j = 0; j < 4; j++) {
                oneBeads[j].classList.toggle('active', j < (digit % 5));
            }
        }
    }

    clear() {
        const beads = this.container.getElementsByClassName('bead');
        for (let bead of beads) {
            bead.classList.remove('active');
        }
    }

    getValue() {
        let result = 0;
        for (let i = 0; i < 7; i++) {
            const rod = this.container.children[i];
            const fiveBead = rod.getElementsByClassName('bead five')[0];
            const oneBeads = rod.getElementsByClassName('bead one');
            let rodValue = fiveBead.classList.contains('active') ? 5 : 0;
            for (let oneBead of oneBeads) {
                if (oneBead.classList.contains('active')) rodValue++;
            }
            result += rodValue * Math.pow(10, i);
        }
        
        // 음수 처리
        if (result >= 5000000) {
            result = result - 10000000;
        }
        
        return result;
    }
}