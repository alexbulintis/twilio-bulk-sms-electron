<script>
  import { navigateTo } from 'svelte-router-spa';

  const message = sessionStorage.getItem('message');
  const recipients = sessionStorage.getItem('recipients').split(',');
  const twilioSettings = {
    accountSid: localStorage.getItem('accountSid'),
    authToken: localStorage.getItem('authToken'),
    phoneNumber: localStorage.getItem('phoneNumber'),
  }
  const twilioSettingsIncomplete = Object.values(twilioSettings).some(value => !value);

  const addToSuccessLog = (message) => {
    sessionStorage.setItem('successLog', `${sessionStorage.getItem('successLog')}${message}\n`);
  }

  const addToErrorLog = (message) => {
    sessionStorage.setItem('errorLog', `${sessionStorage.getItem('errorLog')}${message}\n`);
  }

  const sendMessage = async () => {
    const { accountSid, authToken, phoneNumber } = twilioSettings;

    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    let requests = [];

    recipients.forEach(recipient => {
      const headers = new Headers();
      headers.append('Authorization', `Basic ${btoa(`${accountSid}:${authToken}`)}`);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const body = new URLSearchParams();
      body.append('To', recipient);
      body.append('From', phoneNumber);
      body.append('Body', message);
      const request = new Request(endpoint, { method: 'POST', headers, body });

      requests.push(fetch(request).then(response => {
        if (response.ok) {
          addToSuccessLog(`Sent: ${recipient}`);
        } else {
          addToErrorLog(`Failed: ${recipient}`);
        }
      }));
    });

    const responses = await Promise.all(requests);
    
    console.log(responses);

    navigateTo('/sent');
  }
</script>

<main>
  <h1>Almost there!</h1>
  {#if (twilioSettingsIncomplete)}
    <p>You need to <a href="/">finish setup</a> before you can send messages!</p>
  {/if}
  {#if (!message)}
    <p>You need to <a href="/prepare">write a message</a> to send!</p>
  {/if}
  {#if (!recipients || !recipients.length)}
    <p>You need to <a href="/prepare">have at least one recipient</a> to send!</p>
  {/if}

  <p>Ready to send this message to {recipients.length} recipient{recipients.length > 1 ? 's' : ''}?</p>
  <div class="bg-gray-200 p-3 mt-5 rounded">
    <p>{message}</p>
  </div>

  <button disabled={
    twilioSettingsIncomplete ||
    !message ||
    !recipients ||
    !recipients.length
  } on:click={() => sendMessage()} class="btn btn-block btn-success mt-5">Send</button>
</main> 

<style>
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  a {
    color: rgb(53, 43, 197);
    text-decoration: underline;
    font-weight: bold;
  }
</style>