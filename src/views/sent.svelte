<script>
  import { navigateTo } from 'svelte-router-spa';

  const successLog = sessionStorage.getItem('successLog');
  const errorLog = sessionStorage.getItem('errorLog');
</script>

<main>
  <div class="flex w-full">
    <div class="grid flex-grow p-3">
      <h1>Sent to</h1>
      <textarea class="textarea" rows="10" readonly>{successLog}</textarea>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="grid flex-grow p-3">
      <h1>Errors</h1>
      <textarea class="textarea" rows="10" readonly>{errorLog}</textarea>
    </div>
  </div>
  <button class="btn btn-success btn-block mt-5" on:click={() => navigateTo('/prepare')}>Send another one!</button>
</main>

<style>
  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 1em;
  }
</style>