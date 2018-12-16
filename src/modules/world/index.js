import React, { Component } from 'react'

export default class world extends Component {
  render() {
    return (
      <div className="map"
        style={{
          width: props.cells.length ? props.cells[0].length * props.cellSize : 1,
          height: props.cells.length * props.cellSize
        }}
      >
        {props.cells.reduce((prev, next, yIndex) => {
          prev.push(next.map((item, xIndex) => {
            let type;
            switch (item) {
              case '#':
                type = 'wall';
                break;
              case 'E':
                type = 'enemy';
                break;
              case 'H':
                type = 'health';
                break;
              case 'P':
                type = 'portal';
                break;
              case 'W':
                type = 'weapon';
                break;
              case 'B':
                type = 'boss';
                break;
              default:
                type = 'floor';
            }
            return (<Cell x={xIndex} y={yIndex} type={type} startHealth={100} />);
          }));
          return prev;
        }, [])}
      </div>
    )
  }
}
