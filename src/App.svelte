<script lang="ts">
  import Button from "./lib/Button.svelte";
  import type { OnClickType, ButtonValue } from "./lib/Button.svelte";

  let ticTacToeState: ButtonValue[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const handleClick: OnClickType = (_, position) => {
    if (!position) return;
    ticTacToeState[position.y][position.x] = "X";
  };
</script>

<main>
  {#each ticTacToeState as row, i}
    <div style="display: flex;">
      {#each row as cell, j}
        <Button onClick={handleClick} position={{ x: j, y: i }} value={cell} style="margin: 2px" />
      {/each}
    </div>
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
</style>
