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

// Default range value
range.value = defaultSize;
rangeFeedback.textContent = `${defaultSize} x ${defaultSize}`;

// Helper function to update range feedback
function updateRangeFeedback(input) {
    const rangeFeedback = document.querySelector('#num-grid-feedback');
    rangeFeedback.textContent = `${input} x ${input}`;
};

range.addEventListener('change', () => {
    resetGrid(range.value);
});





