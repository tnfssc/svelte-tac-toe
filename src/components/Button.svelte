<script lang="ts">
  import type { ButtonValue, OnClickType, Position } from "src/types/TicTacToe";

  export let style = "";
  export let value: ButtonValue = "";
  export let position: Position;
  export let onClick: OnClickType;
  const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (e) =>
    onClick(e, position);
</script>

<button on:click="{handleClick}" style="{style}">
  {value}
</button>

<style>
  button {
    min-width: 48px;
    min-height: 48px;
    background-color: white;
    border-color: black;
  }
</style>
