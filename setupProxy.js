const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://festejandoando.fly.dev',
      changeOrigin: true,
    })
  );
};