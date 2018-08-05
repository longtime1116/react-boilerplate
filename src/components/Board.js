import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        onClick={() => this.props.onClick(i)}
        value={this.props.squares[i]}
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
