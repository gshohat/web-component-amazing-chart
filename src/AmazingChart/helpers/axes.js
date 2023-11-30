export function createAxes(options, _svg) {
    let dashLength = 5,
        xLabel = options.chartPadding + options.paddingLeftAxisY - (dashLength * 2),
        fontSizeLabel = 9;

    createAxisY({fontSizeLabel, dashLength, xLabel, ...options}, _svg);
    createAxisX({fontSizeLabel, dashLength, xLabel, ...options}, _svg);
}

export function createAxisY(options, _svg) {
    const coordinates = {
        x1: options.chartPadding + options.paddingLeftAxisY,
        y1: options.chartPadding,
        x2: options.chartPadding + options.paddingLeftAxisY,
        y2: options.chartPadding + options.heightCorrection,
    };
    createAxis(coordinates, options.strokeWidth, _svg);
    createAxisYLabels(options, _svg);
}

function createAxis(coordinates, strokeWidth,  _svg) {
    let axisY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axisY.setAttribute("x1", coordinates.x1 );
    axisY.setAttribute("y1", coordinates.y1 );
    axisY.setAttribute("x2", coordinates.x2 );
    axisY.setAttribute("y2", coordinates.y2 );
    axisY.setAttribute("stroke_width", strokeWidth );
    axisY.setAttribute("class", 'axis' );
    _svg.appendChild( axisY );
}


function createAxisYLabels(options, _svg) {

    let _step = 5,
        yLabel;

    for (let i = 0; i <= _step; i++ ) {
        yLabel = (options.chartPadding + options.heightCorrection) - ((options.heightCorrection / _step) * i);

        createAxisYDash({yLabel, ...options}, _svg);
        createAxisYLabel({yLabel, _step, ...options}, _svg, i);
        createLineAreaDivider({yLabel, ...options}, _svg);
    }
}

function createAxisYDash(options, _svg) {
    const x1Dash = options.chartPadding + options.paddingLeftAxisY - options.dashLength,
        x2Dash = options.chartPadding + options.paddingLeftAxisY;

    let dash= document.createElementNS("http://www.w3.org/2000/svg", 'line');
    dash.setAttribute("x1", x1Dash );
    dash.setAttribute("y1", options.yLabel );
    dash.setAttribute("x2", x2Dash + (options.strokeWidth/2));
    dash.setAttribute("y2", options.yLabel );
    dash.setAttribute("class", 'dash' );
    dash.setAttribute("stroke_width", options.strokeWidth );
    _svg.appendChild( dash );
}

function createAxisYLabel(options, _svg, i) {
    const currentStep = (options.maxPrice / options._step) * i;
    const label= document.createElementNS("http://www.w3.org/2000/svg", 'text');
    label.setAttribute("x", options.xLabel );
    label.setAttribute("y", options.yLabel + (options.fontSizeLabel/3));
    label.setAttribute("class", 'label' );
    const labelText = document.createTextNode(Math.round(currentStep));
    label.style.fontSize = options.fontSizeLabel + 'px';
    label.appendChild(labelText);
    _svg.appendChild(label);
}

function createLineAreaDivider(options, _svg) {
    let lineAreaDivider= document.createElementNS("http://www.w3.org/2000/svg", 'line');
    lineAreaDivider.setAttribute("x1", options.chartPadding + options.paddingLeftAxisY );
    lineAreaDivider.setAttribute("y1", options.yLabel );
    lineAreaDivider.setAttribute("x2", options.chartPadding + options.paddingLeftAxisY + options.baseCorrection);
    lineAreaDivider.setAttribute("y2", options.yLabel );
    lineAreaDivider.setAttribute("class", 'divider' );
    _svg.appendChild( lineAreaDivider );
}

export function createAxisX(options, _svg, data) {
    const coordinates = {
        x1: options.chartPadding + options.paddingLeftAxisY,
        y1: options.chartPadding + options.heightCorrection,
        x2: options.chartPadding + options.paddingLeftAxisY + options.baseCorrection,
        y2: options.chartPadding + options.heightCorrection,
    };
    createAxis(coordinates, options.strokeWidth, _svg);
    createAxisXLabels(options, _svg, data);
}

function createAxisXLabels(options, _svg, data) {
    const _step = options.pointsNumber;

    const y1Dash = options.chartPadding + options.heightCorrection - options.dashLength,
        y2Dash = y1Dash + (options.dashLength * 2)
    ;
    let yLabel = y2Dash + (options.dashLength * 2);

    const earliestTime = options.data[0].time;
    const latestTime = options.data[options.data.length - 1].time;
    const period = latestTime - earliestTime;
    const delta = period / _step;
    let currentTime = earliestTime;

    for(let i = 0; i <= options.pointsNumber; i++ ) {
        options.xLabel = options.chartPadding + options.paddingLeftAxisY + ((options.baseCorrection/_step) * i);
        createAxisXDash({y1Dash, y2Dash, ...options}, _svg);
        createAxisXLabel({yLabel, currentTime, ...options}, _svg);
        currentTime += delta;
    }
}

function createAxisXDash(options, _svg) {
    let dash= document.createElementNS("http://www.w3.org/2000/svg", 'line');
    dash.setAttribute("x1", options.xLabel );
    dash.setAttribute("y1", options.y1Dash );
    dash.setAttribute("x2", options.xLabel);
    dash.setAttribute("y2", options.y2Dash );
    dash.setAttribute("class", 'dash' );
    dash.setAttribute("stroke_width", options.strokeWidth );
    _svg.appendChild( dash );
}

function createAxisXLabel(options, _svg) {
    let date, monthName, dateLabel, shortYear;

    date = new Date(options.currentTime);
    monthName = date.toLocaleString('default', { month: 'short' });
    shortYear = date.getFullYear().toString().slice(-2);
    dateLabel = `${monthName} \`${shortYear}`;


    let label= document.createElementNS("http://www.w3.org/2000/svg", 'text');
    label.setAttribute("x", options.xLabel );
    label.setAttribute("y", options.yLabel);
    label.setAttribute("class", 'label middle' );
    let labelText = document.createTextNode(dateLabel);
    label.style.fontSize = options.fontSizeLabel + 'px';
    label.appendChild(labelText);
    _svg.appendChild( label );
}

export function sort(data) {
    data.sort((point1, point2) => {
       return point1 - point2;
    });
}
