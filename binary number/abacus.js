export class BinaryAbacus {
    constructor(containerId, bits) {
        this.container = document.getElementById(containerId);
        this.bits = bits;
        this.createAbacus();
    }

    createAbacus() {
        this.container.innerHTML = '';
        for (let i = 0; i < this.bits; i++) {
            const rod = document.createElement('div');
            rod.className = 'rod';
            const bead = document.createElement('div');
            bead.className = 'bead zero';
            bead.onclick = () => this.toggleBead(i);
            rod.appendChild(bead);
            this.container.appendChild(rod);
        }
    }

    toggleBead(rod) {
        const bead = this.container.children[rod].getElementsByClassName('bead')[0];
        bead.classList.toggle('zero');
        bead.classList.toggle('one');
        bead.classList.toggle('active');
    }

    setNumber(binary) {
        const bits = binary.padStart(this.bits, '0').split('').reverse();
        for (let i = 0; i < this.bits; i++) {
            const bead = this.container.children[i].getElementsByClassName('bead')[0];
            if (bits[i] === '1') {
                bead.className = 'bead one active';
            } else {
                bead.className = 'bead zero';
            }
        }
    }

    getNumber() {
        let binary = '';
        for (let i = this.bits - 1; i >= 0; i--) {
            const bead = this.container.children[i].getElementsByClassName('bead')[0];
            binary += bead.classList.contains('active') ? '1' : '0';
        }
        return binary;
    }
}