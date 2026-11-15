const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const input = path.resolve(__dirname, '../public/assets/hero-video-1.mp4');
const outDesktop = path.resolve(__dirname, '../public/assets/hero-video-desktop.mp4');
const outMobile = path.resolve(__dirname, '../public/assets/hero-video-mobile.mp4');

console.log('⚡ Compressing hero video for instant streaming...');
console.log('Input:', input);

// Desktop 1280x720, faststart, crf 24, no audio (muted hero)
execSync(`"${ffmpeg}" -y -i "${input}" -vf "scale=1280:-2" -c:v libx264 -crf 24 -preset fast -an -movflags +faststart "${outDesktop}"`, { stdio: 'inherit' });

// Mobile 720x405, faststart, crf 26, no audio
execSync(`"${ffmpeg}" -y -i "${input}" -vf "scale=720:-2" -c:v libx264 -crf 26 -preset fast -an -movflags +faststart "${outMobile}"`, { stdio: 'inherit' });

console.log('Original size:', fs.statSync(input).size, 'bytes');
console.log('Optimized Desktop size:', fs.statSync(outDesktop).size, 'bytes');
console.log('Optimized Mobile size:', fs.statSync(outMobile).size, 'bytes');
