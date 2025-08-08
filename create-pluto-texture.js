import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple gray texture for Pluto
const width = 1024;
const height = 512;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Base gradient
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, '#C4B5A0');
gradient.addColorStop(0.5, '#9B8873');
gradient.addColorStop(1, '#7A6A5A');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add some noise and features
for (let i = 0; i < 100; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const radius = Math.random() * 10 + 2;
  const opacity = Math.random() * 0.3;
  
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Save as JPEG
const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
const outputPath = path.join(__dirname, 'public', 'textures', 'pluto.jpg');
fs.writeFileSync(outputPath, buffer);

console.log('Pluto texture created successfully!');