function createGrid(n) {
    for (let i = 0; i < n*n; i++) {
        const gridUnit = document.createElement('div');
        gridUnit.classList.add = 'grid-unit';

        gridUnit.style.width = `${100/n}%`;
        gridUnit.style.height = `${100/n}%`;
        gridUnit.style.flex = 'auto';
        gridUnit.style['background-color'] = 'white';

        grid.appendChild(gridUnit);

        gridUnit.addEventListener('mouseover', () => {
            gridUnit.style['background-color'] = 'black';
        });
    }
}

function resetGrid(n) {
    // Remove all divs in parent 
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < n*n; i++) {
        const gridUnit = document.createElement('div');
        gridUnit.classList.add = 'grid-unit';

        gridUnit.style.width = `${100/n}%`;
        gridUnit.style.height = `${100/n}%`;
        gridUnit.style.flex = 'auto';
        gridUnit.style['background-color'] = 'white';

        grid.appendChild(gridUnit);

        gridUnit.addEventListener('mouseover', () => {
            gridUnit.style['background-color'] = 'black';
        });
    }
}

// Create n x n grid of divs within .sketchbook
const grid = document.querySelector('.grid');
const defaultSize = 16;

createGrid(defaultSize);

// Grid size range input
const range = document.querySelector('#num-grid');
const rangeFeedback = document.querySelector('#num-grid-feedback');

// Default range value and label
range.value = defaultSize;
rangeFeedback.textContent = `${defaultSize} x ${defaultSize}`;
var inputSize = range.value;

// update range feedback for each tick of range input
range.addEventListener('input', (e) => {
    rangeFeedback.textContent = `${e.target.value} x ${e.target.value}`;
    inputSize = e.target.value;
});

const rangeApply = document.querySelector('#grid-apply');

rangeApply.addEventListener('click', () => {
    resetGrid(inputSize);
});






