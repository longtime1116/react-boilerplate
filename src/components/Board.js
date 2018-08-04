import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  renderSquare(i) {
    return (
      <Square
        onClick={() => this.handleClick(i)}
        value={this.state.squares[i]}
      />
    );
  }

  handleClick = i => {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
  };

  // ↓だとエラーになる。onClick()に handleClick 関数そのものを渡してしまうので、Square コンポーネント
  // の方でクリックされたときに this がなにかわからなくなってしまう。
  //renderSquare(i) {
  //  return <Square onClick={this.handleClick} value={this.state.squares[i]} />;
  //}

  //handleClick() {
  //  const squares = this.state.squares.slice();
  //  squares[0] = "X";
  //  this.setState({ squares: squares });
  //}

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
