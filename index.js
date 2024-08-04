const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the viewport to 1920x1080
    await page.setViewport({width: 1920, height: 1080});

    // Define the HTML content with a canvas element
    const content = `
    <html>
      <body>
        <canvas id="noiseCanvas" width="1920" height="1080"></canvas>
        <script>
          const canvas = document.getElementById('noiseCanvas');
            canvas.width = 1920;
            canvas.height = 1080;
            canvas.style.position='absolute';
            canvas.style.top='0';
            canvas.style.left='0';
            document.body.style.margin='0';
          const ctx = canvas.getContext('2d');
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          
          // Generate noise
          for (let i = 0; i < imageData.data.length; i += 4) {
            const color = Math.floor(Math.random() * 256);
            imageData.data[i] = color; // Red
            imageData.data[i + 1] = color; // Green
            imageData.data[i + 2] = color; // Blue
            imageData.data[i + 3] = 255; // Alpha
          }
          
          ctx.putImageData(imageData, 0, 0);
        </script>
      </body>
    </html>
  `;

    // Set the page content to the defined HTML with the canvas
    await page.setContent(content);

    // Take a screenshot and save it as noise.png
    for (let i=0; i<100; i++){
        console.time('save')
        const buf = await page.screenshot();
        //console.log(buf.byteLength);
        console.timeEnd('save')

    }
    await browser.close();
    console.log('Screenshot saved as noise.png');
})();
