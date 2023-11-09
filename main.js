// FUNCTION: Create default grid of n rows and cols - default colors 
function createGrid(n) {
    for (let i = 0; i < n*n; i++) {
        const gridUnit = document.createElement('div');
        gridUnit.classList.add('grid-unit');

        gridUnit.style.width = `${100/n}%`;
        gridUnit.style.height = `${100/n}%`;
        gridUnit.style.flex = 'auto';
        gridUnit.style['background-color'] = 'white';
        gridUnit.style['outline'] = '1px solid #F9F9F9';

        grid.appendChild(gridUnit);
    }
};

// FUNCTION: Delete existing grid and create new default grid of n rows and cols - keep chosen colors
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
        gridUnit.style['outline'] = '1px solid #F9F9F9';

        grid.appendChild(gridUnit);
    }
};


// FUNCTION: End pen; Remove mouseover event from all grids
function endPen() {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].removeEventListener('mouseover',fillUnit);
        gridList[i].removeEventListener('click',fillUnit);
        gridList[i].removeEventListener('mouseover',eraseUnit);
        gridList[i].removeEventListener('click',eraseUnit);
        gridList[i].removeEventListener('mouseover',RGBUnit);
        gridList[i].removeEventListener('click',RGBUnit);
        console.log('removed');
    }
}



// FUNCTION: Add/Change pen color mouseover based on current penColorInput  - all grids update 'mouseover' event
function changePenColor() {
    endPen(); // Reset previous events 
    // Edgecase #1 - when toggle pen while mouseover a cell, then change the initial cell background
    function getMousePos(e) {
        console.log(document.elementFromPoint(e.clientX, e.clientY));
        const initElement = document.elementFromPoint(e.clientX, e.clientY);

        if (initElement.classList.contains("grid-unit")) {
            initElement.style['background-color'] = penColorInput.value;
            initElement.classList.add('colored');
        }
        document.removeEventListener('mousemove', getMousePos);
    }
    document.addEventListener('mousemove', getMousePos);
    
    // Add event listener to all grid children
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].addEventListener('mouseover', fillUnit);
        gridList[i].addEventListener('click', fillUnit);
    }
};
// FUNCTION: Helper func for mouseover event in changePenColor - get color input value and change color
function fillUnit() {
    this.style['background-color'] = penColorInput.value;
    this.classList.add('colored');
}


// FUNCTION: change pen color to current background color, and remove 'colored' tag
function setEraser() {
    endPen(); // Reset previous events 
    // Edgecase #1 - when toggle pen while mouseover a cell
    function getMousePos(e) {
        console.log(document.elementFromPoint(e.clientX, e.clientY));
        const initElement = document.elementFromPoint(e.clientX, e.clientY);

        if (initElement.classList.contains("grid-unit") && initElement.classList.contains("colored")) {
            initElement.style['background-color'] = bgColorInput.value;
            initElement.classList.remove('colored');
        }
        document.removeEventListener('mousemove', getMousePos);
    }
    document.addEventListener('mousemove', getMousePos);
    
    // Add event listener to all grid children
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].addEventListener('mouseover', eraseUnit);
        gridList[i].addEventListener('click', eraseUnit);
    }
};

function eraseUnit() {
    if (this.classList.contains('colored')) {
        this.style['background-color'] = bgColorInput.value;
        this.classList.remove('colored');
    }
}

// FUNCTION: change pen color to random RGB, and add 'colored' tag
function setRGB() {
    endPen(); // Reset previous events 
    // Edgecase #1 - when toggle pen while mouseover a cell
    function getMousePos(e) {
        console.log(document.elementFromPoint(e.clientX, e.clientY));
        const initElement = document.elementFromPoint(e.clientX, e.clientY);

        if (initElement.classList.contains("grid-unit") && initElement.classList.contains("colored")) {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            initElement.style['background-color'] = `#${randomColor}`;
            initElement.classList.add('colored');
        }
        document.removeEventListener('mousemove', getMousePos);
    }
    document.addEventListener('mousemove', getMousePos);
    
    // Add event listener to all grid children
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        gridList[i].addEventListener('mouseover', RGBUnit);
        gridList[i].addEventListener('click', RGBUnit);
    }
};
function RGBUnit() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style['background-color'] = `#${randomColor}`;
        this.classList.add('colored');
}


// FUNCTION: Change BG color - keep existing colored ones but change those divs without class 'colored'
function changeBGColor(bgColor) {
    const gridList = grid.children;
    for (let i = 0; i < gridList.length; i++) {
        if (!(gridList[i].classList.contains('colored'))) {
            gridList[i].style['background-color'] = bgColor;
        }
    }
};


// FUNCTION: Reset all toggle buttons to Off if currently active
function resetToggle() {
    let toggle = document.querySelector('.toggle');
    let text = document.querySelector('.toggle-text');
    if (active) {
        active = false;
        toggle.classList.remove('active');
        grid.classList.remove('active-grid');
        reset.classList.remove('active-reset');
        text.textContent = 'Off';
        endPen();
        if (rgb) {
            rgb = false;
            const rgbBtn = document.querySelector('#rgb-mode');
            rgbBtn.classList.remove('rgbActive');
        }
        if (erase) {
            erase = false;
            const eraserBtn = document.querySelector('#eraser');
            eraserBtn.classList.remove('eraserActive');
        }
    }
};


// MAIN EXEC:

// Create n x n grid of divs 
const grid = document.querySelector('.grid');
const defaultSize = 16;
const reset = document.querySelector('#reset-grid');

createGrid(defaultSize);

// TOGGLE - for pen
let active = false;

function toggle() {
    let toggle = document.querySelector('.toggle');
    let text = document.querySelector('.toggle-text');
    active = !active;
    if (active) {
        toggle.classList.add('active');
        grid.classList.add('active-grid');
        reset.classList.add('active-reset');
        text.textContent = 'On';
        if (erase) setEraser();
        else if (rgb) setRGB();
        else changePenColor();
    } else {
        toggle.classList.remove('active')
        grid.classList.remove('active-grid');
        reset.classList.remove('active-reset');
        text.innerHTML = 'Off';
        endPen();
    }
}

// Key toggle to spacebar
window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault(); // prevent default scrolling 
        toggle();
    }
});

// Toggle for eraser
let erase = false;
function eraserToggle() {
    const eraseBtn = document.querySelector('.eraser-ctr');
    erase = !erase;
    if (erase) {
        // Edgecase - if rgb is on when erase is toggled, then auto turn off rgb
        if (rgb) {
            rgb = false;
            const rgbBtn = document.querySelector('.rgb-ctr');
            rgbBtn.classList.remove('rgbActive');
        }
        console.log('erase on');
        eraseBtn.classList.add('eraserActive');
        if (active) setEraser();
    } else {
        console.log('erase off')
        eraseBtn.classList.remove('eraserActive')
        if (active) {
            if (rgb) setRGB();
            else changePenColor();
        }
    }   
}
// Key toggle for eraser
window.addEventListener('keydown', function (e) {
    if (e.code === 'KeyE') {
        e.preventDefault(); // prevent default scrolling 
        eraserToggle();
    }
});


// Toggle for RGB
let rgb = false;
function rgbToggle() {
    const rgbBtn = document.querySelector('.rgb-ctr');
    rgb = !rgb;
    if (rgb) {
        // Edgecase - if eraer is on when rgb is toggled, then auto turn off erase
        if (erase) {
            erase = false;
            const eraserBtn = document.querySelector('.eraser-ctr');
            eraserBtn.classList.remove('eraserActive');
        }
        console.log('rgb on');
        rgbBtn.classList.add('rgbActive');
        if (active) setRGB();
    } else {
        console.log('rgb off')
        rgbBtn.classList.remove('rgbActive')
        if (active) {
            if (erase) setEraser();
            else changePenColor();
        }
    }
}
// Key toggle for eraser
window.addEventListener('keydown', function (e) {
    if (e.code === 'KeyR') {
        rgbToggle();
    }
});


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



