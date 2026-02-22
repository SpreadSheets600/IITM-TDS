# IITM TDS Vercel Function

This repository hosts a single Vercel Serverless Function in `api/index.js`. The handler only accepts `GET` requests and returns the IIT Madras contact address so it can be deployed anywhere Vercel supports Node.js 18.

## Deploying to Vercel

1. Install the Vercel CLI if you do not already have it:
   ```bash
   npm install -g vercel
   ```
2. Authenticate using your Vercel account:
   ```bash
   vercel login
   ```
3. Link to the existing Vercel project so that deployments go to `local-question-17`:
   ```bash
   vercel link --project local-question-17
   ```
   You may be prompted to confirm the project ID `prj_1yJp9ErMX4YRwbujBkAkUVBNagcq` and the org `team_o5p2CYmMtXHURHDuoQS6BO5b`.

   > **Note:** you don’t need a custom runtime entry in `vercel.json`; Vercel will automatically detect a Node handler. A bare `{"version":2}` file is enough. Removing the old `functions` section avoids the “Function Runtimes must have a valid version” error.
4. Deploy to production:
   ```bash
   vercel --prod
   ```

If you need to re-run the same deploy, `vercel --prod --confirm` skips confirmation prompts.

## Testing Locally

1. Start the local dev server:
   ```bash
   vercel dev
   ```
2. Visit `http://localhost:3000/api/index` in your browser or via `curl` to verify the JSON payload before deploying.
