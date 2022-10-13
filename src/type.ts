export interface ISquareProps {
  value: string | null;
  onClick: () => void;
}

export interface ISquareState {
}

export interface IBoardProps {
}

export interface IBoardState {
  squares: Array<string | null>;
  xIsNext: boolean;
}
