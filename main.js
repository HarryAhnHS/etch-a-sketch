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

createGrid(250);




