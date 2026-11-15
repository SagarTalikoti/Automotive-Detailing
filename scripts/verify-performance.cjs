const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/BusinessComputers.in/.gemini/antigravity/brain/22a345ed-7089-485d-9a76-c2f281215b43';

async function verifyPerformance() {
  console.log('⚡ Starting comprehensive performance & visual verification...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const networkRequests = [];
  page.on('response', (response) => {
    const url = response.url();
    if (url.includes('/assets/')) {
      networkRequests.push({
        url: url.replace(/^http:\/\/localhost:4173/, ''),
        status: response.status(),
        contentType: response.headers()['content-type'] || '',
        size: response.headers()['content-length'] || 0
      });
    }
  });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));

  const startTime = Date.now();
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2', timeout: 30000 });
  const totalLoadTime = Date.now() - startTime;

  // Measure Core Web Vitals via PerformanceObserver inside page
  const metrics = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const perfEntries = performance.getEntriesByType('navigation')[0] || {};
      const paintEntries = performance.getEntriesByType('paint');

      let fcp = 0;
      paintEntries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          fcp = entry.startTime;
        }
      });

      let cls = 0;
      try {
        const layoutShiftEntries = performance.getEntriesByType('layout-shift');
        layoutShiftEntries.forEach(entry => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
      } catch (e) {}

      resolve({
        fcp: Math.round(fcp),
        ttfb: Math.round(perfEntries.responseStart - perfEntries.requestStart || 0),
        domContentLoaded: Math.round(perfEntries.domContentLoadedEventEnd || 0),
        loadComplete: Math.round(perfEntries.loadEventEnd || 0),
        cls: parseFloat(cls.toFixed(4))
      });
    });
  });

  console.log('📊 Performance Metrics:');
  console.log(metrics);
  console.log(`⏱️ Total Page Load Time: ${totalLoadTime}ms`);

  // Verify Interior Detailing Image
  console.log('\n🔍 Verifying Interior Detailing image in DOM...');
  const interiorImgData = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('h3, h4'));
    const interiorTitle = cards.find(el => el.textContent.includes('Interior Detailing'));
    if (!interiorTitle) return { found: false, reason: 'Title not found' };

    const card = interiorTitle.closest('.group') || interiorTitle.parentElement.parentElement;
    const img = card ? card.querySelector('img') : null;
    const picture = card ? card.querySelector('picture') : null;

    return {
      found: !!img,
      src: img ? img.currentSrc || img.src : null,
      naturalWidth: img ? img.naturalWidth : 0,
      naturalHeight: img ? img.naturalHeight : 0,
      complete: img ? img.complete : false,
      hasPicture: !!picture
    };
  });
  console.log('Interior Detailing Image Status:', interiorImgData);

  // Take Screenshot of Hero Section
  console.log('\n📸 Capturing Hero screenshot...');
  const heroEl = await page.$('#hero');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-optimized-view.png') });
  }

  // Scroll to Services and capture screenshot
  console.log('📸 Capturing Services screenshot...');
  await page.evaluate(() => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));

  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.screenshot({ path: path.join(ARTIFACT_DIR, 'services-interior-view.png') });
  }

  // Mobile viewport test (390px - iPhone 14/15)
  console.log('\n📱 Testing Mobile Viewport (390px)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile-hero-optimized.png') });

  // Scroll to services on mobile
  await page.evaluate(() => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile-services-interior.png') });

  // Summary of assets fetched
  console.log('\n📦 Key Assets Transferred:');
  const imageAssets = networkRequests.filter(r => r.url.includes('service-interior') || r.url.includes('hero-poster'));
  console.log(imageAssets);

  await browser.close();

  // Save report JSON
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'performance-audit.json'),
    JSON.stringify({ metrics, totalLoadTime, interiorImgData, imageAssets, consoleLogs }, null, 2)
  );
  console.log('🎉 Verification completed successfully!');
}

verifyPerformance().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
