const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7165', // Replace with your API server URL
      secure: false, // If your API server uses a self-signed certificate
      changeOrigin: true,
    })
  );
};
