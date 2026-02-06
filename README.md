<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Farmers Marketplace - Agri Network

This is a marketplace application connecting farmers with buyers for agricultural products.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Set the `DATABASE_URL` in [.env](.env) to your Neon PostgreSQL connection string
4. Run the backend server in one terminal:
   `npx tsx server.ts`
5. Run the frontend in another terminal:
   `npm run dev`

## Deployment Instructions

### Frontend (Netlify)
1. Connect your repository to Netlify
2. Set the build command to: `npm run deploy`
3. Set the publish directory to: `dist`
4. Add the following redirect rule in netlify.toml (already configured):
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-production-backend-url/api/:splat"  # Replace with your actual backend URL
     status = 200
     force = true
   ```

### Backend
Deploy the backend server (server.ts) to a Node.js hosting platform like Render, Railway, or Heroku.

### Environment Variables
- For the backend: DATABASE_URL (your Neon PostgreSQL connection string)
- For the frontend: REACT_APP_API_URL (production backend URL)
