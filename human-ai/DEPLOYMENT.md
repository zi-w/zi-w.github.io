# Human-AI Page Deployment

This document explains how the human-ai page is automatically deployed to GitHub Pages.

## How It Works

The human-ai directory contains a Vite/React application that needs to be built before deployment. A GitHub Actions workflow (`.github/workflows/deploy-human-ai.yml`) automatically:

1. **Triggers** when you push changes to the `main` branch that affect files in `human-ai/`
2. **Builds** the Vite application using `npm run build`
3. **Deploys** the built files to GitHub Pages at https://zi-w.github.io/human-ai/

## One-Time Setup (Already Configured)

The Vite configuration includes `base: '/human-ai/'` to ensure all assets load correctly from the subdirectory path.

## GitHub Pages Configuration

**You need to configure this once in your GitHub repository:**

1. Go to https://github.com/zi-w/zi-w.github.io/settings/pages
2. Under **"Build and deployment"** → **"Source"**, select **GitHub Actions**
3. Save the settings

This tells GitHub to use the Actions workflow instead of Jekyll for deployment.

## Monitoring Deployments

### View Workflow Runs
- Go to https://github.com/zi-w/zi-w.github.io/actions
- Look for "Deploy Human-AI to GitHub Pages" workflow runs
- Click on any run to see detailed logs

### Deployment Status
- Successful deployments show a green checkmark ✓
- Failed deployments show a red X ✗
- Typical deployment time: 1-2 minutes

## Manual Deployment

To manually trigger a deployment without making changes:

1. Go to https://github.com/zi-w/zi-w.github.io/actions
2. Click on "Deploy Human-AI to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

## Local Development

To run the app locally for development:

```bash
cd human-ai
npm install
npm run dev
```

The app will be available at http://localhost:3000

**Note:** Local development uses `localhost:3000` while production uses `/human-ai/` path. The Vite config handles this automatically.

## Troubleshooting

### Deployment fails with permission error
- Go to Settings → Actions → General → Workflow permissions
- Ensure "Read and write permissions" is selected
- Save and re-run the workflow

### Page shows 404 after deployment
- Verify GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Check that the workflow completed successfully
- Wait a few minutes for GitHub's CDN to update

### Assets not loading (blank page or missing styles)
- Verify `base: '/human-ai/'` is set in `vite.config.ts`
- Check browser console for 404 errors on asset paths
- Rebuild and redeploy

### Changes not appearing after push
- Verify your changes are in files under `human-ai/` directory
- Check that you pushed to the `main` branch
- View the Actions tab to confirm the workflow ran
- Clear browser cache or try incognito mode
