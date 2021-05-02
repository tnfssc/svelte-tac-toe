<script lang="ts">
  import Button from "../components/Button.svelte";
  import type { OnClickType } from "../types/TicTacToe";
  import {
    createTicTacToeStore,
    createTurnStore,
    endGame,
  } from "../store/TicTacToeStore";

  let ticTacToeState = createTicTacToeStore(4);
  let currentTurn = createTurnStore();

  const handleReset = () => ticTacToeState.reset();
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

  let winner = "";
  $: winner = endGame($ticTacToeState);
</script>

<main>
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
      <button on:click="{handleReset}">
        Winner: {winner}
      </button>
    </div>
  </div>
</main>

<style>
  .content {
    padding-top: 24px;
    padding-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
