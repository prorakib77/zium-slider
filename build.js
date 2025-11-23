const fs = require('fs');
const path = require('path');

// Copy CSS file to dist
const cssSource = path.join(__dirname, 'src', 'simple-slider.css');
const cssDest = path.join(__dirname, 'dist', 'simple-slider.css');

if (fs.existsSync(cssSource)) {
  fs.copyFileSync(cssSource, cssDest);
  console.log('✓ CSS file copied to dist/');
} else {
  console.error('✗ CSS source file not found');
  process.exit(1);
}

