export interface ISquareProps {
  value: Square;
  isHighlighted: boolean;
  onClick: () => void;
}

export interface ISquareState {
}

export interface IBoardProps {
  squares: Array<Square>;
  winLine: Array<number> | null;
  onClick: (i: number) => void;
}

export interface IBoardState {
}

export interface IGameProps {
}

export interface IGameState {
  history: Array<{
    squares: Squares;
    col: number;
    row: number;
  }>;
  stepNumber: number;
  xIsNext: boolean;
  isAsc: boolean,
}

type Square = "X" | "O" | null;

export type Squares = Array<Square>
