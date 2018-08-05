import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        onClick={() => this.props.onClick(i)}
        value={this.props.squares[i]}
        needHighlight={this.props.line.includes(i)}
      />
    );
  }

  render() {
    const squares = [0, 1, 2].map(row => {
      return (
        <div className="board-row">
          {[0, 1, 2].map(column => {
            return this.renderSquare(row * 3 + column);
          })}
        </div>
      );
    });
    return <div>{squares}</div>;
  }
}
