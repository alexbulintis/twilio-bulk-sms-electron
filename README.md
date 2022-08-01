# Twilio Bulk SMS Electron (TBSE)

<center>

![image](https://user-images.githubusercontent.com/17914968/182099047-62e1be9c-b897-4ab0-8760-8ba60bfbc623.png)

</center>

## Description and features

This simple Electron app was created to help event organisers and marketing departments send bulk text messages (i.e. reminders for upcoming events) without having to write any code.

* stores SID, token, phone number in local storage
* can import/export config to share with team members
* can import lists of phone numbers
* built with Svelte & Electron

**Please only send messages to people who have explicitly agreed to receive messages from you.**

## Running and building locally

```
# Install dependencies
$ yarn # or npm install

# Run
$ yarn electron-dev # or npm run electron-dev

# Package
$ yarn electron-pack # or npm run electron-pack

# Package for other operating systems
$ npm i -g electron-builder
$ electron-builder -wlm
```

## Installing

If you just want to install this for your personal use (i.e. not development), check out the [Releases page](https://github.com/alexbulintis/twilio-bulk-sms-electron/releases) and download the right executable for your platform.
