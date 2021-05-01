import type { ButtonValue, Position } from "src/types/TicTacToe";
import { writable } from "svelte/store";

export function createTicTacToeStore(size: number) {
  function newStore(size: number) {
    const store: ButtonValue[][] = [];
    for (let i = 0; i < size; i++) {
      const row: ButtonValue[] = [];
      for (let j = 0; j < size; j++) {
        row.push("");
      }
      store.push(row);
    }
    return store;
  }

  const { subscribe, set, update } = writable(newStore(size));

  return {
    subscribe,
    update: (pos: Position, XO: ButtonValue) =>
      update(prevStore => {
        if (prevStore[pos.y][pos.x] !== "") return prevStore;
        prevStore[pos.y][pos.x] = XO;
        return prevStore;
      }),
    reset: () => set(newStore(size)),
  };
}

export function createTurnStore(initial: ButtonValue = "O") {
  const { subscribe, set, update } = writable<ButtonValue>(initial);
  return {
    subscribe,
    toggle: () => update(prev => (prev === "O" ? "X" : "O")),
    set,
  };
}

export function endGame(state: ButtonValue[][]): ButtonValue {
  let primaryDiagCount = 0;
  let secondaryDiagCount = 0;
  for (let i = 0; i < state.length; i++) {
    if (state[i][0] !== "" && state[i].every(cell => state[i][0] === cell)) return state[i][0]; // Row check
    if (state[0][i] !== "" && state.every(row => state[0][i] === row[i])) return state[0][i]; // Column check
    if (state[0][0] !== "" && state[i][i] === state[0][0]) primaryDiagCount++; // Primary diagonal check
    if (state[0][state.length - 1] !== "" && state[i][state.length - 1 - i] === state[0][state.length - 1])
      secondaryDiagCount++; // Secondary diagonal check
  }
  if (primaryDiagCount === state.length) return state[0][0];
  if (secondaryDiagCount === state.length) return state[0][state.length - 1];
  return "";
}
