export interface ISquareProps {
  value: Square;
  onClick: () => void;
}

export interface ISquareState {
}

export interface IBoardProps {
}

export interface IBoardState {
  squares: Array<Square>;
  xIsNext: boolean;
}

type Square = "X" | "O" | null;

export type Squares = Array<Square>
