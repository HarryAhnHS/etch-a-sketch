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
    }
};

//Delete existing grid and create new default grid of n rows and cols - keep chosen colors
function resetGrid(n, bgColor) {
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
    }
};


// End pen; Remove mouseover event
function endPen() {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].removeEventListener('mouseover',colorPen);
        console.log('removed');
    }
}

// Helper func for mouseover event in changePenColor - get color input value
function colorPen() {
    this.style['background-color'] = penColorInput.value;
    this.classList.add('colored');
}

// Add pen color  - loop through all grids and update 'mouseover' event function
function changePenColor() {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].addEventListener('mouseover', colorPen);
    }
};

// Change BG color - keep existing colored ones but change those divs without class 'colored'
function changeBGColor(bgColor) {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        if (!(gridList[i].classList.contains('colored'))) {
            gridList[i].style['background-color'] = bgColor;
        }
    }
};

// Reset toggle button to Off if currently active
function resetToggle() {
    let toggle = document.querySelector('.toggle');
    let text = document.querySelector('.toggle-text');
    if (active) {
        active = false;
        toggle.classList.remove('active');
        text.textContent = 'Off';
        endPen();
    }
};

// MAIN EXEC:

// Create n x n grid of divs 
const grid = document.querySelector('.grid');
const defaultSize = 16;

createGrid(defaultSize);

// TOGGLE - for pen coloring
let active = false;

function toggle() {
    let toggle = document.querySelector('.toggle');
    let text = document.querySelector('.toggle-text');
    active = !active;
    if (active) {
        toggle.classList.add('active');
        text.textContent = 'On';
        changePenColor();
    } else {
        toggle.classList.remove('active')
        text.innerHTML = 'Off';
        endPen();
    }
}


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
    // Toggle Off
    resetToggle();
    resetGrid(inputSize, `${bgColorInput.value}`);
});

// Reset button - reset colors, backgrounds, grid size to default
const reset = document.querySelector('#reset-grid');
reset.addEventListener('click', () => {
    // Toggle Off
    resetToggle();

    // Reset colors to default
    penColorInput.value = '#000000';
    bgColorInput.value = '#FFFFFF';

    resetGrid(defaultSize, defaultBGColor);
    range.value = defaultSize;
    rangeFeedback.textContent = `${defaultSize} x ${defaultSize}`;
});

// Implementation of Pen and BG color inputs to grid
penColorInput.addEventListener('input', (e) => {
    if (active) changePenColor();
});

bgColorInput.addEventListener('input', (e) => {
    changeBGColor(`${e.target.value}`);
});



