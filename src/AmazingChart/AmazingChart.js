import {template} from './template';
import {createAxes, sort} from './helpers/axes';
import {createGraph} from './helpers/graph';

export class AmazingChart extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._svg = this._shadowRoot.querySelector('#svg_wrapper');
    }

    set options(value) {
        createChart(value, this._svg);
    }
}

function createChart(options, _svg) {
    const chartPadding = 20,
    paddingLeftAxisY = 40,
    paddingBottomAxisX = 20,

    pointsNumber = options.data.length - 1,
    strokeWidth = 1,
    height = 400,
    heightCorrection = height - (chartPadding * 2) - paddingBottomAxisX,
    base = 600,
    baseCorrection = base - (chartPadding * 2) - paddingLeftAxisY;

    const maxPrice = options.data.reduce(function (prev, current) {
        return Math.max(prev, current.price);
    }, 0);

    sort(options.data);

    const extendedOptions = {
        chartPadding,
        paddingBottomAxisX,
        paddingLeftAxisY,
        height,
        heightCorrection,
        baseCorrection,
        strokeWidth,
        maxPrice,
        pointsNumber,
        base,
        animate: options.animate,
        data: options.data,

    };
    createAxes(extendedOptions, _svg);
    createGraph(extendedOptions, _svg);
}
