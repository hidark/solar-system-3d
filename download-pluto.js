import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try different sources for Pluto texture
const plutoUrls = [
  'https://www.solarsystemscope.com/textures/download/2k_pluto.jpg',
  'https://planetary.s3.amazonaws.com/web/assets/pictures/20150714_nh_pluto_charon_color.jpg',
  'https://svs.gsfc.nasa.gov/vis/a010000/a011600/a011659/PlutoTexture_hires.jpg'
];

async function downloadPluto() {
  const filePath = path.join(__dirname, 'public', 'textures', 'pluto.jpg');
  
  for (const url of plutoUrls) {
    console.log(`Trying to download Pluto texture from: ${url}`);
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));
        console.log(`✓ Successfully downloaded Pluto texture (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
        return;
      } else {
        console.log(`✗ Failed: HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ Failed: ${error.message}`);
    }
  }
  
  // If all downloads fail, keep the procedural texture as fallback
  console.log('All Pluto texture downloads failed. Will use procedural texture.');
}

downloadPluto();