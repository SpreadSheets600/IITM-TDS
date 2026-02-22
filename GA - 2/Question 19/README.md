# eShopCo Staff Portal Login (Google SSO)

This minimal FastAPI app demonstrates how to redirect staff to Google for authentication, store the returned `id_token` in session, and expose a helper endpoint that returns the raw token.

## Setup

1. **Create Google OAuth 2.0 credentials**
   * Visit the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and create OAuth credentials for a Web Application.
   * Add `http://127.0.0.1:8002/auth` (or your chosen host/port) as an **Authorized redirect URI**.
   * Copy the **Client ID** and **Client Secret**.

2. **Export credentials**

   ```bash
   export GOOGLE_CLIENT_ID="your-client-id"
   export GOOGLE_CLIENT_SECRET="your-client-secret"
   export SECRET_KEY="any-secure-string"  # optional override for session encryption
   ```

3. **Install dependencies**

   ```bash
   pip install fastapi uvicorn httpx
   ```

## Running the app

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8002
```

Visiting `http://127.0.0.1:8002/` immediately redirects you to Google if no session exists.

## Logging in and capturing the `id_token`

1. Log in with the Google account `24f2008474@ds.study.iitm.ac.in` when prompted.
2. After successful authentication you are redirected back to `/`, and the session holds the `id_token`.
3. Request `GET /id_token` to receive:

   ```json
   { "id_token": "<raw-token>" }
   ```

4. Submit the final payload as:

   ```json
   {
     "id_token": "<paste token here>",
     "client_id": "<your client id>"
   }
   ```

5. Optionally decode the token with `jwt_decode` to confirm:
   * `iss` is `https://accounts.google.com`
   * `aud` equals your client ID
   * `email_verified` is `true`
   * `email` is `24f2008474@ds.study.iitm.ac.in`
   * `exp` is in the future

## Notes

* `/login` redirects the browser to Google's OAuth screen.
* `/auth` exchanges the authorization `code` for tokens and stores `id_token` in a signed session.
* `/id_token` now returns only the raw token string, so you can capture it directly without extra fields.
