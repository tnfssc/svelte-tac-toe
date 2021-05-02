<script lang="ts">
  import type { ButtonValue, OnClickType, Position } from "src/types/TicTacToe";

  import MdClose from "svelte-icons/md/MdClose.svelte";
  import MdRadioButtonUnchecked from "svelte-icons/md/MdRadioButtonUnchecked.svelte";

  export let style = "";
  export let value: ButtonValue = "";
  export let position: Position;
  export let onClick: OnClickType;
  const handleClick = () => onClick(position);
</script>

<button on:click="{handleClick}" style="{style} aspect-ratio: 1;">
  <span class="{value !== '' ? 'full-opacity' : ''}">
    {#if value === "X"}
      <MdClose />
    {/if}
    {#if value === "O"}
      <MdRadioButtonUnchecked />
    {/if}
  </span>
</button>

<style>
  button {
    min-width: 48px;
    min-height: 48px;
    transition: transform ease-in-out 250ms;
    background: linear-gradient(
      135deg,
      rgba(0, 23, 36, 1) 0%,
      rgba(0, 78, 125, 1) 100%
    );
    border-radius: 2em;
    border: none;
    color: white;
    filter: drop-shadow(3px 3px 0.4rem black);
    cursor: pointer;
  }

  button:hover {
    transform: scale(1.05);
  }
  button:focus {
    border: 1px solid aqua;
  }
  span {
    opacity: 0;
    transition: opacity ease-in-out 250ms;
  }
  .full-opacity {
    opacity: 0.8;
  }
</style>
