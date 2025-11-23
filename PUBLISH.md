# Publishing Guide for Zium Slider

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. **Login to npm**: Run `npm login` in your terminal
3. **Git repository**: Make sure your code is pushed to GitHub

## Step-by-Step Publishing Process

### 1. Build the Package

```bash
npm run build
```

This will:
- Bundle the JavaScript files
- Minify the code
- Copy CSS files to dist/

### 2. Test Locally (Optional)

Test the package locally before publishing:

```bash
npm pack
```

This creates a `.tgz` file you can test.

### 3. Check Package Name Availability

Make sure the package name `zium-slider` is available:

```bash
npm view zium-slider
```

If it returns 404, the name is available. If it shows package info, you may need to use a scoped package like `@prorakib77/zium-slider`.

### 4. Update Version (if needed)

If you've made changes, update the version in `package.json`:

- Patch: `1.0.1` (bug fixes)
- Minor: `1.1.0` (new features)
- Major: `2.0.0` (breaking changes)

Or use npm version commands:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 5. Publish to npm

```bash
npm publish
```

For scoped packages (if name is taken):
```bash
npm publish --access public
```

### 6. Verify Publication

Check your package on npm:
- Visit: https://www.npmjs.com/package/zium-slider
- Or run: `npm view zium-slider`

### 7. CDN Availability

After publishing, your package will be available via jsDelivr CDN:

**CSS:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zium-slider@latest/dist/simple-slider.css">
```

**JavaScript:**
```html
<script src="https://cdn.jsdelivr.net/npm/zium-slider@latest/dist/simple-slider.min.js"></script>
```

**Specific Version:**
```html
<script src="https://cdn.jsdelivr.net/npm/zium-slider@1.0.0/dist/simple-slider.min.js"></script>
```

## Updating the Package

1. Make your changes
2. Update version: `npm version patch`
3. Build: `npm run build`
4. Publish: `npm publish`
5. Push to GitHub: `git push && git push --tags`

## Important Notes

- The `prepublishOnly` script automatically builds before publishing
- Only files listed in `files` array or not in `.npmignore` will be published
- Make sure `dist/` folder is included (it's in the `files` array)
- Always test locally before publishing
- Consider using semantic versioning

## Troubleshooting

**Error: Package name already taken**
- Use a scoped package: Change name to `@prorakib77/zium-slider` in package.json
- Publish with: `npm publish --access public`

**Error: You must verify your email**
- Check your npm account email and verify it

**Error: Unauthorized**
- Run `npm login` again
- Check you're logged into the correct account

## After Publishing

1. Create a GitHub release
2. Update documentation if needed
3. Share on social media/forums
4. Monitor npm downloads and GitHub stars

