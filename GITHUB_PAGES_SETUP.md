# GitHub Pages Setup Guide

## Enable GitHub Pages for Your Repository

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/prorakib77/zium-slider
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will build and deploy your site (usually takes 1-2 minutes)
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://prorakib77.github.io/zium-slider/`

### Step 3: Access Your Demos

Once GitHub Pages is enabled, your demos will be available at:

- **Main Demo Page**: https://prorakib77.github.io/zium-slider/
- **Theme Showcase**: https://prorakib77.github.io/zium-slider/demo.html
- **All Slider Types**: https://prorakib77.github.io/zium-slider/demo-all-sliders.html

## Custom Domain (Optional)

If you want to use a custom domain:

1. In GitHub Pages settings, enter your domain
2. Add a `CNAME` file to your repository root with your domain name
3. Configure DNS records with your domain provider

## Updating the Demo

After making changes:

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Update demo"
   git push
   ```

2. GitHub Pages will automatically rebuild (may take a few minutes)

## Troubleshooting

**Demo not showing?**
- Check that GitHub Pages is enabled in Settings
- Wait a few minutes for the first deployment
- Check the Actions tab for any build errors

**404 Error?**
- Make sure `index.html` exists in the root
- Verify file names match exactly (case-sensitive)

**Styles not loading?**
- Make sure `dist/simple-slider.css` is in the repository
- Check browser console for 404 errors

## Adding Demo Links to README

The README.md already includes demo links that will work once GitHub Pages is enabled.

