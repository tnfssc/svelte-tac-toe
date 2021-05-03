<script lang="ts">
  import Button from "../components/Button.svelte";
  import type { ButtonValue, OnClickType } from "../types/TicTacToe";
  import {
    createTicTacToeStore,
    createTurnStore,
    endGame,
  } from "../store/TicTacToeStore";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import MdRadioButtonUnchecked from "svelte-icons/md/MdRadioButtonUnchecked.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  let ticTacToeState = createTicTacToeStore(4);
  let currentTurn = createTurnStore();

  const handleReset = () => {
    ticTacToeState.reset();
    overlayOpacity = 0;
  };
  const handleClick: OnClickType = (position) => {
    if (!position || winner !== "") return;
    if (
      position.y > $ticTacToeState.length - 1 ||
      position.y < 0 ||
      position.x > $ticTacToeState.length - 1 ||
      position.x < 0
    )
      throw new Error(
        `Value of position outside size ${{ position, state: $ticTacToeState }}`
      );

    if ($ticTacToeState[position.y][position.x] !== "") return;
    ticTacToeState.update(position, $currentTurn);
    currentTurn.toggle();
  };

  let winner: ButtonValue = "";
  $: winner = endGame($ticTacToeState);

  let overlayOpacity = 0;
  $: newOverlayOpacity(winner);
  const newOverlayOpacity = (wins: ButtonValue) => {
    console.log(winner);
    if (wins === "" || overlayOpacity >= 1) return;
    overlayOpacity += 0.05;
    requestAnimationFrame(() => newOverlayOpacity(wins));
  };
</script>

<div class="content">
  <div style="width: 90%; max-width: 800px;">
    {#each $ticTacToeState as row, i}
      <div style="display: flex;">
        {#each row as cell, j}
          <Button
            onClick="{handleClick}"
            position="{{ x: j, y: i }}"
            value="{cell}"
            style="margin: 12px; width: 30%;" />
        {/each}
      </div>
    {/each}
  </div>
</div>

{#if winner !== ""}
  <div class="overlay" style="opacity: {overlayOpacity};">
    <div class="winsText">
      <div style="max-height: 96px; max-width: 96px;">
        <span>
          {#if winner === "X"}
            <MdClose />
          {/if}
          {#if winner === "O"}
            <MdRadioButtonUnchecked />
          {/if}
        </span>
      </div>
      <span class="text"> wins </span>
    </div>
    <div role="button" class="retryIcon" on:click="{handleReset}">
      <MdRefresh />
    </div>
  </div>
{/if}

<style>
  .content {
    padding-top: 24px;
    padding-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .text {
    font-size: xx-large;
  }
  .winsText {
    width: 100%;
    max-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(245, 245, 245);
    color: black;
  }
  .retryIcon {
    max-width: 180px;
    max-height: 180px;
    margin-top: 96px;
    transition: transform ease-in-out 200ms;
    cursor: pointer;
  }
  .retryIcon:hover {
    transform: scale(1.05);
  }
</style>
