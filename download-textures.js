// Script to download planet textures from NASA and other sources
// These are public domain images from NASA's Solar System Exploration

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// High-quality texture URLs (2K resolution where available)
const textureUrls = {
  // NASA and public domain sources
  sun: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/sun.jpg',
  mercury: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mercury.jpg',
  venus: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/venus_atmosphere.jpg',
  earth: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
  mars: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars.jpg',
  jupiter: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/jupiter.jpg',
  saturn: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturn.jpg',
  uranus: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/uranus.jpg',
  neptune: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/neptune.jpg',
  pluto: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/pluto.jpg',
  
  // Additional textures
  earth_normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
  earth_specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  moon: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
  saturn_ring: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturn_ring_alpha.png'
};

// Ensure textures directory exists
const texturesDir = path.join(__dirname, 'public', 'textures');
if (!fs.existsSync(texturesDir)) {
  fs.mkdirSync(texturesDir, { recursive: true });
}

// Download function
function downloadTexture(name, url) {
  return new Promise((resolve, reject) => {
    const fileName = `${name}.jpg`;
    if (name === 'saturn_ring') {
      fileName = `${name}.png`;
    }
    const filePath = path.join(texturesDir, fileName);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`✓ ${name} texture already exists`);
      resolve();
      return;
    }
    
    console.log(`Downloading ${name} texture...`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          
          file.on('finish', () => {
            file.close();
            console.log(`✓ Downloaded ${name} texture`);
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${name} texture`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

// Download all textures
async function downloadAllTextures() {
  console.log('Starting texture downloads...\n');
  
  for (const [name, url] of Object.entries(textureUrls)) {
    try {
      await downloadTexture(name, url);
    } catch (error) {
      console.error(`✗ Failed to download ${name}: ${error.message}`);
    }
  }
  
  console.log('\nTexture download complete!');
}

// Run the download
downloadAllTextures();