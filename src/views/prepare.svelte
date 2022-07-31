<script>
  import { navigateTo } from 'svelte-router-spa';

  let recipientsRaw = '';
  let message = '';
  $: recipients = recipientsRaw.split('\n').map(recipient => recipient.trim());

  $: {
    sessionStorage.setItem('recipients', recipients);
    sessionStorage.setItem('message', message);
  }

  sessionStorage.setItem('successLog', '');
  sessionStorage.setItem('errorLog', '');

  const importRecipientsFromTXT = (txt) => {
    recipientsRaw = txt;
    recipients = recipientsRaw.split('\n').map(recipient => recipient.trim());
  };

  const openTXTFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        importRecipientsFromTXT(e.target.result);
      };
      reader.readAsText(file);
    };
    input.click();
  };
</script>

<main>
  <div class="flex w-full">
    <div class="grid flex-grow p-3">
      <h1>Recipients</h1>
      <textarea bind:value={recipientsRaw} class="textarea bg-base-200" rows="10" placeholder="Phone numbers with country codes, separated by newline"></textarea>
      <div class="tooltip tooltip-bottom w-full" data-tip=".txt separated by newline">
        <button on:click={() => openTXTFile()} class="btn mt-5 w-full">Import</button>
      </div>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="grid flex-grow p-3">
      <h1>Message</h1>
      <textarea bind:value={message} class="textarea bg-base-200" rows="10" placeholder="Message to send"></textarea>
      <button on:click={() => navigateTo('/ready-to-send')} class="btn mt-5">Send</button>
    </div>
  </div>
</main>

<style>
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
</style>