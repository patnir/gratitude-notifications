const fs = require('fs');
const path = require('path');

// Simple approach: Use a headless browser or conversion service
// For now, let's create a script that can be run with puppeteer or similar
// But actually, let's use a simpler approach with sharp and @resvg/resvg-js

async function generateOGImage() {
  try {
    // Try to use @resvg/resvg-js if available
    let resvg;
    try {
      resvg = require('@resvg/resvg-js');
    } catch (e) {
      console.log('Installing @resvg/resvg-js...');
      console.log('Please run: npm install --save-dev @resvg/resvg-js');
      console.log('Then run this script again.');
      return;
    }

    const svgPath = path.join(__dirname, '../public/og-image.svg');
    const pngPath = path.join(__dirname, '../public/og-image.png');
    
    const svg = fs.readFileSync(svgPath, 'utf-8');
    
    const resvgInstance = new resvg.Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });
    
    const pngData = resvgInstance.render();
    const pngBuffer = pngData.asPng();
    
    fs.writeFileSync(pngPath, pngBuffer);
    console.log('✅ Generated og-image.png successfully!');
  } catch (error) {
    console.error('Error generating OG image:', error);
    console.log('\nAlternative: You can convert the SVG manually using:');
    console.log('- Online: https://cloudconvert.com/svg-to-png');
    console.log('- Or install @resvg/resvg-js and run this script again');
  }
}

generateOGImage();

