const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

const bundler = new Bundler('src/site/index.html', {
  cache: false
})

const app = express()

app.use(
  '/.netlify/functions',
  proxy({
  target: 'http://127.0.0.1:9000/',

      pathRewrite: {
        '^/\.netlify/functions':''
    },

  })
)

app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 3000))
