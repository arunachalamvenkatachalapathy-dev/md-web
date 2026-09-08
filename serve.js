// Zero-dependency local development server powered by Bun's native HTTP server
const server = Bun.serve({
  port: 5173,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    
    // Serve static files
    const file = Bun.file('.' + pathname);
    return new Response(file);
  },
});

console.log(`\n⚡ Market Debunk dev server active at: http://localhost:${server.port}/\n`);
