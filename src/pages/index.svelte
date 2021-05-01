<script lang="ts">
  import Button from "../components/Button.svelte";
  import type { OnClickType } from "../types/TicTacToe";
  import { createTicTacToeStore, createTurnStore, endGame } from "../store/TicTacToeStore";

  let ticTacToeState = createTicTacToeStore(3);
  let currentTurn = createTurnStore();
  const handleClick: OnClickType = (_, position) => {
    if (!position || winner !== "") return;
    if ($ticTacToeState[position.y][position.x] !== "") return;
    ticTacToeState.update(position, $currentTurn);
    currentTurn.toggle();
  };
  let winner = "";
  $: winner = endGame($ticTacToeState);
</script>

<main>
  {#each $ticTacToeState as row, i}
    <div style="display: flex;">
      {#each row as cell, j}
        <Button onClick={handleClick} position={{ x: j, y: i }} value={cell} style="margin: 2px" />
      {/each}
    </div>
  {/each}
  Winner: {winner}
</main>
