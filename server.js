const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()
const port = 8080
const path = require('path')
app.use('/', express.static(path.join(__dirname, 'dist')))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

const proxyMiddleware = createProxyMiddleware({
  target: 'https://jolly-sea-0d3061c1e.6.azurestaticapps.net/output',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove the /api prefix when forwarding to the target
  },
});

app.use('/api', proxyMiddleware);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
