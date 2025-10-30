const fs = require('fs');
const path = require('path');

function ensureDir(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function copyRecursiveSync(source, target) {
  const stats = fs.statSync(source);
  if (stats.isDirectory()) {
    ensureDir(target);
    fs.readdirSync(source).forEach((child) => {
      copyRecursiveSync(path.join(source, child), path.join(target, child));
    });
  } else {
    ensureDir(path.dirname(target));
    fs.copyFileSync(source, target);
  }
}

const repoRoot = path.resolve(__dirname, '..', '..');
const sourceDir = path.join(repoRoot, 'legacy', 'public', 'images');
const targetDir = path.join(repoRoot, 'backend', 'public', 'images');

if (!fs.existsSync(sourceDir)) {
  console.error(`Source images directory not found: ${sourceDir}`);
  process.exit(1);
}

console.log(`Copying images from\n  ${sourceDir}\n→ ${targetDir}`);
copyRecursiveSync(sourceDir, targetDir);
console.log('Images copied successfully.');


