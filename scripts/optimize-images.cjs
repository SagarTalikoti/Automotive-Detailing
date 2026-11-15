const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(__dirname, '../public/assets');
const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/optimized');
const MANIFEST_PATH = path.resolve(__dirname, '../src/data/imageManifest.json');

const TARGET_WIDTHS = [320, 480, 640, 768, 1024, 1440, 1920];

const IMAGES_TO_PROCESS = [
  'service-interior.jpg',
  'service-ceramic.jpg',
  'user-ppf-install.jpg',
  'user-detailer-polishing.jpg',
  'user-wheel-wash.jpg',
  'hero-car-bright.jpg',
  'hero-car.jpg',
  'about-detailer.jpg',
  'brand-studio.jpg',
  'porsche-dirty-before.jpg',
  'porsche-clean-after.jpg',
  'gallery-porsche-bright.jpg',
  'gallery-audi.jpg',
  'gallery-amg.jpg',
  'gallery-bmw.jpg',
  'gallery-rangerover-bright.jpg'
];

async function runOptimization() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifest = {};

  for (const filename of IMAGES_TO_PROCESS) {
    const inputPath = path.join(ASSETS_DIR, filename);
    if (!fs.existsSync(inputPath)) {
      continue;
    }

    const ext = path.extname(filename);
    const base = path.basename(filename, ext);

    const metadata = await sharp(inputPath).metadata();
    const origWidth = metadata.width || 1200;
    const origHeight = metadata.height || 800;
    const aspectRatio = origWidth / origHeight;

    const widthsToGenerate = TARGET_WIDTHS.filter(w => w < origWidth);
    if (!widthsToGenerate.includes(origWidth)) {
      widthsToGenerate.push(origWidth);
    }
    widthsToGenerate.sort((a, b) => a - b);

    const avifEntries = [];
    const webpEntries = [];
    const jpgEntries = [];

    for (const w of widthsToGenerate) {
      const h = Math.round(w / aspectRatio);

      const avifName = `${base}-${w}.avif`;
      const webpName = `${base}-${w}.webp`;
      const jpgName = `${base}-${w}.jpg`;

      const avifOut = path.join(OUTPUT_DIR, avifName);
      const webpOut = path.join(OUTPUT_DIR, webpName);
      const jpgOut = path.join(OUTPUT_DIR, jpgName);

      // Only generate if not exists
      if (!fs.existsSync(avifOut)) {
        await sharp(inputPath)
          .resize(w, h, { fit: 'inside', withoutEnlargement: true })
          .avif({ quality: 80, effort: 4 })
          .toFile(avifOut);
      }

      if (!fs.existsSync(webpOut)) {
        await sharp(inputPath)
          .resize(w, h, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85, effort: 4 })
          .toFile(webpOut);
      }

      if (!fs.existsSync(jpgOut)) {
        await sharp(inputPath)
          .resize(w, h, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true, mozjpeg: true })
          .toFile(jpgOut);
      }

      avifEntries.push(`/assets/optimized/${avifName} ${w}w`);
      webpEntries.push(`/assets/optimized/${webpName} ${w}w`);
      jpgEntries.push(`/assets/optimized/${jpgName} ${w}w`);
    }

    manifest[`/assets/${filename}`] = {
      base,
      width: origWidth,
      height: origHeight,
      aspectRatio,
      fallbackSrc: `/assets/optimized/${base}-${widthsToGenerate[widthsToGenerate.length - 1]}.jpg`,
      srcSetAvif: avifEntries.join(', '),
      srcSetWebp: webpEntries.join(', '),
      srcSetJpg: jpgEntries.join(', '),
      widths: widthsToGenerate
    };
  }

  // Hero posters
  const heroSrc = path.join(ASSETS_DIR, 'hero-car-bright.jpg');
  if (fs.existsSync(heroSrc)) {
    const desktopWebp = path.join(OUTPUT_DIR, 'hero-poster-desktop.webp');
    if (!fs.existsSync(desktopWebp)) {
      await sharp(heroSrc).resize(1400, null, { fit: 'inside' }).webp({ quality: 85 }).toFile(desktopWebp);
    }
    const mobileWebp = path.join(OUTPUT_DIR, 'hero-poster-mobile.webp');
    if (!fs.existsSync(mobileWebp)) {
      await sharp(heroSrc).resize(640, null, { fit: 'inside' }).webp({ quality: 85 }).toFile(mobileWebp);
    }
  }

  const manifestDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`✅ Image optimization check complete. Manifest synced.`);
}

runOptimization().catch(err => {
  console.error('❌ Error optimizing images:', err);
  process.exit(1);
});
