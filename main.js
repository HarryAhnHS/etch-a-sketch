//Create default grid of n rows and cols - default colors 
function createGrid(n) {
    for (let i = 0; i < n*n; i++) {
        const gridUnit = document.createElement('div');
        gridUnit.classList.add('grid-unit');

        gridUnit.style.width = `${100/n}%`;
        gridUnit.style.height = `${100/n}%`;
        gridUnit.style.flex = 'auto';
        gridUnit.style['background-color'] = 'white';

        grid.appendChild(gridUnit);

        gridUnit.addEventListener('mouseover', () => {
            gridUnit.style['background-color'] = 'black';
            gridUnit.classList.add('colored');
        });
    }
};

//Delete existing grid and create new default grid of n rows and cols - keep chosen colors
function resetGrid(n, pColor, bgColor) {
    // Remove all divs in parent 
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < n*n; i++) {
        const gridUnit = document.createElement('div');
        gridUnit.classList.add('grid-unit');

        gridUnit.style.width = `${100/n}%`;
        gridUnit.style.height = `${100/n}%`;
        gridUnit.style.flex = 'auto';
        gridUnit.style['background-color'] = bgColor;

        grid.appendChild(gridUnit);

        gridUnit.addEventListener('mouseover', () => {
            gridUnit.style['background-color'] = pColor;
            gridUnit.classList.add('colored');
        });
    }
};

// Change pen color - loop through all grids and update 'mouseover' event function
function changePenColor(pColor) {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].addEventListener('mouseover', () => {
            gridList[i].style['background-color'] = pColor;
            gridList[i].classList.add('colored');
        });
    }
};

// Change BG color - keep existing colored ones but change those divs without class 'colored'
function changeBGColor(bgColor) {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        if (!(gridList[i].classList.contains('colored'))) {
            console.log(gridList[i]);
            gridList[i].style['background-color'] = bgColor;
        }
    }
};

// MAIN EXEC:
// Create n x n grid of divs 
const grid = document.querySelector('.grid');
const defaultSize = 16;

createGrid(defaultSize);

// Default colors: 
const defaultPenColor = '#000000';
const defaultBGColor = '#FFFFFF';

// Color inputs
const penColorInput = document.querySelector('#pen-color');
const bgColorInput = document.querySelector('#bg-color');

// Grid size range input
const range = document.querySelector('#num-grid');
const rangeFeedback = document.querySelector('#num-grid-feedback');

// Default range value and label
range.value = defaultSize;
rangeFeedback.textContent = `${defaultSize} x ${defaultSize}`;

var inputSize = range.value;

// Update range feedback for each tick of range input
range.addEventListener('input', (e) => {
    rangeFeedback.textContent = `${e.target.value} x ${e.target.value}`;
    inputSize = e.target.value;
});

// Apply button for grid size range input - Keep colors and background
const rangeApply = document.querySelector('#grid-apply');
rangeApply.addEventListener('click', () => {
    resetGrid(inputSize, penColorInput.value, bgColorInput.value);
});

// Reset button - reset colors, backgrounds, grid size to default
const reset = document.querySelector('#reset-grid');
reset.addEventListener('click', () => {
    resetGrid(defaultSize, defaultPenColor, defaultBGColor);
    range.value = defaultSize;
    rangeFeedback.textContent = `${defaultSize} x ${defaultSize}`;

    penColorInput.value = '#000000';
    bgColorInput.value = '#FFFFFF';
})

// Implementation of Pen and BG color inputs to grid
penColorInput.addEventListener('input', (e) => {
    changePenColor(`${e.target.value}`);
});
bgColorInput.addEventListener('input', (e) => {
    changeBGColor(`${e.target.value}`);
});



