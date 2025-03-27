# GitHub Webhook Project Connected to Discord

This project sends messages to Discord notifying about stars given to the
repository with the webhook, issues created in the project, and issue status
updates.

These messages are sent to Discord through a bot that needs to be configured in
Discord.

## Setup Instructions

### 1. Install Dependencies

Rebuild Node modules:

```sh
npm install
```

### 2. Configure Environment Variables

- Copy the `.env.template` file and rename the copied file to `.env`.
- Open the `.env` file and fill in the required values.

### 3. Configure GitHub Webhook

- Select a GitHub repository.
- Go to **Settings** > **Webhooks**.
- Click **Add webhook**.
- Set the **Payload URL** to your server's endpoint.
- Set the **Content type** to `application/json`.
- Generate a **Secret Token** and set it in the `.env` file under
  `SECRET_TOKEN`.

### 4. Configure Discord Webhook

- Go to Discord and select your preferred channel.
- Right-click on the channel and navigate to: **Server Settings** >
  **Integrations** > **Webhooks**.
- Select a bot and click **Copy Webhook URL**.
- Paste this URL into the `.env` file under `DISCORD_WEBHOOK_URL`.

## Running the Project

Start the server with:

```sh
npm start
```
