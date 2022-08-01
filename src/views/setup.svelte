<script>
  import { navigateTo } from 'svelte-router-spa';

  let accountSid = localStorage.getItem('accountSid') || '';
  let authToken = localStorage.getItem('authToken') || '';
  let phoneNumber = localStorage.getItem('phoneNumber') || '';

  $: exportable = accountSid || authToken || phoneNumber;

  $: {
    localStorage.setItem('accountSid', accountSid);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('phoneNumber', phoneNumber);
    console.log('Updated local storage');
  }

  const importConfigFromJSON = (json) => {
    accountSid = json.accountSid;
    authToken = json.authToken;
    phoneNumber = json.phoneNumber;
  };

  const exportConfigToJSON = () => {
    return {
      accountSid,
      authToken,
      phoneNumber,
    };
  };

  const openJSONFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        importConfigFromJSON(json);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const saveJSONFile = () => {
    const json = exportConfigToJSON();
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
  };
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
        <button class="btn" on:click={() => openJSONFile()}>Import</button>
      {:else}
        <button class="btn" on:click={() => saveJSONFile()}>Export</button>
      {/if}
    </div>
  </div>
  <hr/>
  <button class="btn" on:click={() => navigateTo('/prepare')}>Next</button>
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