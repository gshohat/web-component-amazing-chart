export function createGraph(options, _svg) {
    const {coordinates, points} = createPositions(options);
    createLine(points, coordinates, options, _svg);
    // createCircles(coordinates, _svg);
}

function createPositions(options) {
    const earliestTime =  options.data[0].time;
    const ratio = options.baseCorrection / (options.data[options.data.length - 1].time - earliestTime);
    let coordinates = [],
        points =[];
    for (let item of options.data) {
        const delta = item.time - earliestTime;
        let point = {};
        point.x = Math.round((ratio * delta) + options.chartPadding + options.paddingLeftAxisY);
        point.y = Math.round(options.height - ((options.heightCorrection * item.price) / options.maxPrice)  - options.chartPadding - options.paddingBottomAxisX);
        coordinates.push(point);
        points.push(`L${point.x},${point.y}`);
    }
    return {coordinates, points};
}

function createLine(points, coordinates, options, _svg) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.style.fill ='none';
    line.style.stroke = '#32ca46';
    line.style.strokeWidth = '5';
    let dValue = `m${coordinates[0].x},${coordinates[0].y}`;
    const pointsTrimmed = points.splice(1)
    dValue += pointsTrimmed.join(' ');
    line.setAttribute('d', dValue);
    if (options.animate)
        line.setAttribute("class", 'line' );
    _svg.appendChild(line);
}

function createCircles(coordinates, _svg) {
    for (let item of coordinates) {
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", item.x);
        circle.setAttribute("cy", item.y);
        circle.setAttribute("r", '5');
        circle.setAttribute("class", 'point-symbol' );
        _svg.appendChild( circle );
    }
}
