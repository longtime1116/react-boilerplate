import React from "react";
import Board from "./Board";
import "./Game.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          index: 0
        }
      ],
      isAscending: true,
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          index: i
        }
      ]),
      stepNumber: this.state.stepNumber + 1,
      xIsNext: !this.state.xIsNext
    });
  };

  jumpTo = i => {
    // Not implement yet.
    this.setState({
      stepNumber: i,
      xIsNext: i % 2 === 0
    });
  };

  changeOrder = () => {
    this.setState({
      isAscending: !this.state.isAscending
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);
    let status;
    let line = [];

    if (result) {
      status = "Winner: " + result.winner;
      line = result.line;
    } else if (this.state.stepNumber < 9) {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    } else {
      status = "Draw";
    }

    const moves = history.map((obj, index) => {
      const location = `(${Math.floor(obj.index / 3)}, ${obj.index % 3})`;
      const description = index
        ? `Go to move #${location}`
        : "Go to game start";
      const className = index === this.state.stepNumber ? "bold_line" : "";
      return (
        <li key={index}>
          <button className={className} onClick={() => this.jumpTo(index)}>
            {description}
          </button>
        </li>
      );
    });
    const sorted_moves = this.state.isAscending ? moves : moves.reverse();
    let orderDescription;
    if (this.state.isAscending) {
      orderDescription = "To descending order";
    } else {
      orderDescription = "To ascending order";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={i => this.handleClick(i)}
            squares={current.squares}
            line={line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button
              onClick={() => {
                this.changeOrder();
              }}
            >
              {orderDescription}
            </button>
          </div>
          <ol>{sorted_moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}
