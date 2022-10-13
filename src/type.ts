export interface ISquareProps {
  value: Square;
  onClick: () => void;
}

export interface ISquareState {
}

export interface IBoardProps {
  squares: Array<Square>;
  onClick: (i: number) => void;
}

export interface IBoardState {
}

export interface IGameProps {
}

export interface IGameState {
  history: Array<{
    squares: Squares;
  }>;
  xIsNext: boolean;
}

type Square = "X" | "O" | null;

export type Squares = Array<Square>
