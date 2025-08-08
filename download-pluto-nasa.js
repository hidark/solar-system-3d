import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NASA and alternative sources for Pluto
const plutoUrls = [
  // NASA New Horizons mission images
  'https://www.nasa.gov/sites/default/files/thumbnails/image/nh-pluto-in-false-color.jpg',
  'https://photojournal.jpl.nasa.gov/jpeg/PIA19873.jpg',
  'https://photojournal.jpl.nasa.gov/jpeg/PIA20291.jpg',
  // Alternative direct links
  'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg',
  'https://images-assets.nasa.gov/image/PIA20291/PIA20291~orig.jpg'
];

function downloadWithHttps(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadWithHttps(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        if (stats.size < 1000) {
          fs.unlinkSync(dest);
          reject(new Error('File too small'));
        } else {
          resolve(stats.size);
        }
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function tryDownloadPluto() {
  const filePath = path.join(__dirname, 'public', 'textures', 'pluto.jpg');
  
  // First check if we need to replace existing corrupt file
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size < 1000) {
      console.log('Removing corrupt pluto.jpg (only ' + stats.size + ' bytes)');
      fs.unlinkSync(filePath);
    } else {
      console.log('Pluto texture already exists and is valid (' + (stats.size / 1024).toFixed(1) + ' KB)');
      return;
    }
  }
  
  // Try each URL
  for (const url of plutoUrls) {
    console.log(`\nTrying: ${url.substring(0, 60)}...`);
    
    try {
      // Try with https module for better redirect handling
      if (url.startsWith('https://')) {
        const size = await downloadWithHttps(url, filePath);
        console.log(`✓ Success! Downloaded Pluto texture (${(size / 1024).toFixed(1)} KB)`);
        return;
      } else {
        // Try with fetch for http URLs
        const response = await fetch(url);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          if (buffer.byteLength > 1000) {
            fs.writeFileSync(filePath, Buffer.from(buffer));
            console.log(`✓ Success! Downloaded Pluto texture (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
            return;
          }
        }
        console.log(`✗ Failed: Invalid response`);
      }
    } catch (error) {
      console.log(`✗ Failed: ${error.message}`);
    }
  }
  
  console.log('\n❌ All attempts failed. Creating a procedural Pluto texture instead...');
  
  // Create a simple gray texture as fallback
  // We'll just copy the Mercury texture and darken it since they look similar
  const mercuryPath = path.join(__dirname, 'public', 'textures', 'mercury.jpg');
  if (fs.existsSync(mercuryPath)) {
    console.log('Using Mercury texture as base for Pluto...');
    fs.copyFileSync(mercuryPath, filePath);
    console.log('✓ Created Pluto texture from Mercury base');
  }
}

tryDownloadPluto().catch(console.error);