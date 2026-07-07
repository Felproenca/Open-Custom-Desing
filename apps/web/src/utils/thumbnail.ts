const CAPTURE_WIDTH = 440;
const CAPTURE_HEIGHT = 260;
const JPEG_QUALITY = 0.6;

/**
 * Capture a thumbnail from HTML by rendering it in a temporary offscreen
 * iframe, drawing the iframe to a canvas, and returning a JPEG data-URL.
 *
 * The iframe is created without `sandbox` so the canvas is not tainted.
 * It is removed from the DOM immediately after capture.
 */
export function captureThumbnail(html: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const iframe = document.createElement('iframe');
      iframe.style.cssText =
        'position:fixed;left:-9999px;width:1920px;height:1080px;border:none;visibility:hidden';
      iframe.setAttribute('loading', 'eager');
      iframe.srcdoc = html;
      document.body.appendChild(iframe);

      const cleanup = () => {
        try { document.body.removeChild(iframe); } catch {}
      };

      const timer = setTimeout(() => {
        cleanup();
        resolve(null);
      }, 4000);

      iframe.onload = () => {
        // Give the browser a frame to layout, then paint to canvas.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = CAPTURE_WIDTH;
              canvas.height = CAPTURE_HEIGHT;
              const ctx = canvas.getContext('2d');
              if (!ctx) { clearTimeout(timer); cleanup(); resolve(null); return; }
              ctx.drawImage(iframe as unknown as CanvasImageSource, 0, 0, CAPTURE_WIDTH, CAPTURE_HEIGHT);
              const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
              clearTimeout(timer);
              cleanup();
              resolve(dataUrl);
            } catch {
              clearTimeout(timer);
              cleanup();
              resolve(null);
            }
          });
        });
      };

      // If the iframe was already loaded (cached srcdoc) the onload may not
      // fire — check readyState as a fallback.
      if (iframe.contentDocument?.readyState === 'complete') {
        iframe.dispatchEvent(new Event('load'));
      }
    } catch {
      resolve(null);
    }
  });
}
