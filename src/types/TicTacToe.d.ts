export type ButtonValue = "" | "X" | "O";
export type Position = {
  x: number;
  y: number;
};
export type OnClickType = (position?: Position) => void;
