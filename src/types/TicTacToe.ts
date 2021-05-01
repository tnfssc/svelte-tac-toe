export type ButtonValue = "" | "X" | "O";
export type Position = {
  x: number;
  y: number;
};
export type OnClickType = (
  e: MouseEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
  },
  position?: Position
) => void;
