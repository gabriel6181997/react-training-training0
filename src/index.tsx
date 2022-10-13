import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {
  IBoardProps,
  IBoardState,
  IGameProps,
  IGameState,
  ISquareProps,
  Squares,
} from "./type";

function Square(props: ISquareProps) {
  let className = "square";
  if (props.isHighlighted) {
    className += " highlight";
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component<IBoardProps, IBoardState> {
  renderSquare(i: number, isHighlighted: boolean) {
    return (
      <Square
        isHighlighted={isHighlighted}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {Array(3)
          .fill(0)
          .map((row, i) => {
            return (
              <div className="board-row" key={i}>
                {Array(3)
                  .fill(0)
                  .map((col, j) => {
                    const index = i * 3 + j;
                    const highlight =
                      this.props.winLine &&
                      this.props.winLine.indexOf(index) !== -1;
                    if (highlight) {
                      return this.renderSquare(index, highlight);
                    } else {
                      return this.renderSquare(index, false);
                    }
                  })}
              </div>
            );
          })}
      </div>
    );
  }
}

class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          col: 0,
          row: 0,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isAsc: true,
    };
  }

  toggleAsc() {
    this.setState({
      isAsc: !this.state.isAsc,
    });
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)?.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          col: (i % 3) + 1,
          row: Math.floor(i / 3) + 1,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const settlement = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc = move
        ? "Go to move #" + move + "(" + step.col + "," + step.row + ")"
        : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? "bold" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (settlement) {
      if (settlement.isDraw) {
        status = "Draw";
      } else {
        status = "Winner: " + settlement.winner;
      }
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
            winLine={settlement ? settlement.line : []}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.toggleAsc()}>
              {this.state.isAsc
                ? "Sort in descending order"
                : "Sort in ascending order"}
            </button>
          </div>
          <ol>{this.state.isAsc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(<Game />);

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { isDraw: false, winner: squares[a], line: [a, b, c] };
    }
  }

  if (squares.filter((e) => !e).length === 0) {
    return {
      isDraw: true,
      winner: null,
      line: null,
    };
  }

  return null;
}
