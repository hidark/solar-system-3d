// Fixed script to download planet textures using fetch
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// High-quality texture URLs (from Three.js examples)
const textureUrls = {
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
  moon: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg',
  earth_normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
  earth_specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
};

// Alternative URLs from other sources
const alternativeUrls = {
  sun: 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
  mercury: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
  venus: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
  mars: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
  jupiter: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
  saturn: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
  uranus: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
  neptune: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
};

// Ensure textures directory exists
const texturesDir = path.join(__dirname, 'public', 'textures');
if (!fs.existsSync(texturesDir)) {
  fs.mkdirSync(texturesDir, { recursive: true });
}

// Download function using fetch
async function downloadTexture(name, url) {
  const fileName = `${name}.jpg`;
  const filePath = path.join(texturesDir, fileName);
  
  // Check if file already exists and is valid
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size > 1000) { // If file is larger than 1KB, it's probably valid
      console.log(`✓ ${name} texture already exists (${(stats.size / 1024).toFixed(1)} KB)`);
      return true;
    } else {
      console.log(`✗ ${name} texture is corrupted (${stats.size} bytes), re-downloading...`);
    }
  }
  
  console.log(`Downloading ${name} texture from ${url}...`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    
    const size = Buffer.byteLength(buffer);
    console.log(`✓ Downloaded ${name} texture (${(size / 1024).toFixed(1)} KB)`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to download ${name}: ${error.message}`);
    
    // Try alternative URL if available
    if (alternativeUrls[name] && url !== alternativeUrls[name]) {
      console.log(`  Trying alternative URL for ${name}...`);
      return downloadTexture(name, alternativeUrls[name]);
    }
    
    return false;
  }
}

// Download all textures
async function downloadAllTextures() {
  console.log('Starting texture downloads...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [name, url] of Object.entries(textureUrls)) {
    const success = await downloadTexture(name, url);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\nTexture download complete!`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  
  if (failCount > 0) {
    console.log('\nNote: Failed textures will use procedural generation as fallback.');
  }
}

// Run the download
downloadAllTextures();