export const template = document.createElement('template');

template.innerHTML = `
<style>                               
    svg {
        background: #efefef;
    }
  
    polyline,
      .point-symbol {
        fill: none;
        stroke-width: 4px;
        stroke-linejoin: round;
        stroke-linecap: square;
        stroke: #0074d9;
      }
  
      .point-symbol {
        fill: #efefef;
      }
      
      .axis,
      .dash {
        stroke: #999;
      }
      
      .label {
        text-anchor: end;
        font-family: Helvetica, Arial, sans-serif;
        fill: #999;
        line-height: 1;
      }
      
      .label.middle {
        text-anchor: middle;
      }
      
      .divider {
        stroke-width: 1px;
        stroke: #999;
        stroke-dasharray: 2, 6;
      }
      
      .line{
          stroke-dasharray: 2300;
          stroke-dashoffset: 2300;
          animation: dash 5s linear forwards;
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
    
</style>
    
<svg viewBox="0 0 600 400" width="600" height="400" id="svg_wrapper"></svg>    
`
