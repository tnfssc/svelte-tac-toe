<script lang="ts" context="module">
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
</script>

<script lang="ts">
  export let style: string = "";
  export let value: ButtonValue = "";
  export let position: Position;
  export let onClick: OnClickType;
  const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = e => onClick(e, position);
</script>

<button on:click={handleClick} {style}>
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
