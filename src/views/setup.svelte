<script>
  import { Store } from 'electron-store';
  import { onMount } from 'svelte';

  const store = new Store();

  let accountSid = '';
  let authToken = '';
  let phoneNumber = '';

  $: exportable = accountSid || authToken || phoneNumber;

  onMount(() => {
    if (store.has('accountSid')) {
      accountSid = store.get('accountSid');
    }
    if (store.has('authToken')) {
      authToken = store.get('authToken');
    }
    if (store.has('phoneNumber')) {
      phoneNumber = store.get('phoneNumber');
    }
  });

  $: console.log(accountSid, authToken, phoneNumber);
</script>

<main>
  <h1>Welcome!</h1>
  <p>This is a simple app that makes requests to the Twilio API using your locally stored data. We won't share your info with anyone but Twilio. You'll find the information needed under Account > API Keys & Tokens on Twilio, as well as your phone number under Phone Numbers.</p>
  <hr/>
  <div class="grid grid-cols-2 gap-2">
    <div class="form-control w-full max-w-xs">
      <label class="label" for="accountSid">
        <span class="label-text">Account SID</span>
      </label>
      <input bind:value={accountSid} id="accountSid" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="authToken">
        <span class="label-text">Auth Token</span>
      </label>
      <input bind:value={authToken} id="authToken" type="password" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="phoneNumber">
        <span class="label-text">Phone Number</span>
      </label>
      <input bind:value={phoneNumber} id="phoneNumber" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="form-control w-full max-w-xs">
      <span class="label">
      <span class="label-text">Config file</span>
      </span>
      {#if (!exportable)}
        <button class="btn">Import</button>
      {:else}
        <button class="btn">Export</button>
      {/if}
    </div>
  </div>
</main>

<style>
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
  hr {
    margin: 15px 0;
  }

</style>