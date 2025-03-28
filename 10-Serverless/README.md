# GitHub Webhook for Discord as a Function

This project deploys serverless functions using **Netlify Functions**, which are triggered when a user performs actions such as **starring** or **creating an issue** in a GitHub repository.

## Requirements

Before getting started, ensure you have the following installed:

- **Node.js** and **npm**
- **Netlify CLI**
- A **Netlify** account
- A **Discord server** with permission to configure **webhooks**

## Installation and Configuration

Follow these steps to set up and deploy the project:

### 1. Install Dependencies
Run the following command to install the required packages:

```sh
npm install
```

### 2. Install Netlify CLI
Install the Netlify CLI globally with:

```sh
npm install -g netlify-cli
```

### 3. Log in to Netlify
Authenticate with Netlify by running:

```sh
netlify login
```

### 4. Configure Environment Variables
In the Netlify interface, navigate to:

**Site Configuration** > **Environment Variables** > **Add Variable** > **Import from .env file**

You must enter the variables defined in the **.env.template** file.

### 5. Obtain the Discord Webhook URL
To obtain the **Discord webhook URL**:

1. In Discord, go to **Server Settings** > **Integrations** > **Webhooks**.
2. Create a new webhook and copy the provided URL.
3. Set this URL in the `DISCORD_WEBHOOK_URL` environment variable in Netlify.

### 6. Deploy the API on Netlify
Run the following command to deploy your function in production:

```sh
netlify deploy --prod
```

### 7. Configure the Webhook in GitHub
To connect GitHub with your function on Netlify:

1. Go to your **GitHub** repository.
2. Navigate to **Settings** > **Webhooks** > **Add Webhook**.
3. In the **Payload URL** field, enter the URL provided by Netlify after deployment.
   
   The URL provided by Netlify follows this format:
   
   ```sh
   https://example-name-functions.netlify.app
   ```
   
4. Append the following extension to the URL:

   ```sh
   /.netlify/functions/github-discord
   ```
   
   Resulting in:
   
   ```sh
   https://example-name-functions.netlify.app/.netlify/functions/github-discord
   ```

5. Save the changes, and GitHub will trigger the webhook when a configured action occurs.