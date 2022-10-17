const serverPort = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

// It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json())

//  middleware for logging
app.use(function (req, res, next) {
  contentLenght = req.headers['content-length'] ? req.headers['content-length'] : ''
  transactionId = req.body.transactionId ? req.body.transactionId : ''
  origin = req.body.origin ? req.body.origin : ''
  pathname = req.body.pathname ? req.body.pathname : ''
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${origin} ${pathname.replace(/(.{30})..+/, "$1…")} ${contentLenght}`)
  next()
})

// healthcheck
app.get('/health', (req, res) => {
  res.send('BattlePage API is ready!')
})

// demo
app.get('/lazy-request', (req, res) => {
  setTimeout(function(){
    res.send({'a':10})
  }, 5000)
})

app.get('/items', function(req, res) {
  let start = Date.now()

  
  res.set('Server-Timing', `server;dur=${Date.now() - start}`)
  res.json([
    {
      'name':'Madmonq Amumu',
      'path': './src/madmonq/madmonq_amumu_wallpaper.jpg',
      'price': '515 CZK'
    },
    {
      'name':'Nomad Tumbler',
      'path': './src/madmonq/madmonq_badges_wallpaper_1920x1080.png',
      'price': '35 CZK'
    },
    {
      'name':'Focus Paper Refill',
      'path': './src/madmonq/madmonq_beauty_setup.png',
      'price': '89 CZK'
    },
    {
      'name':'Machined Mechanical Pencil',
      'path': './src/madmonq/madmonq_doom_wallpaper.jpg',
      'price': '35 CZK'
    },
    {
      'name':'Innkeeper',
      'path': './src/other/Waves_Dark_Alt_6016x6016.jpg',
      'price': '108 CZK'
    },
    {
      'name':'Posters',
      'path': './src/other/Waves_Monterey_Light_6016x6016.jpg',
      'price': '80 CZK'
    },
    {
      'name':'Posters 2',
      'path': './src/other/Waves_Light_6016x6016.jpg',
      'price': '160 CZK'
    },
    {
      'name':'Flatlay',
      'path': './src/other/Waves_Dark_Alt_6016x6016.jpg',
      'price': '515 CZK'
    }
  ])
})

app.get('/items-optimized', function(req, res) {
  let start = Date.now()

  
  res.set('Server-Timing', `server;dur=${Date.now() - start}`)
  res.json([
    {
      'name':'Madmonq Amumu',
      'path': './src/madmonq/madmonq_amumu_wallpaper.avif',
      'price': '515 CZK'
    },
    {
      'name':'Nomad Tumbler',
      'path': './src/madmonq/madmonq_badges_wallpaper_1920x1080.avif',
      'price': '35 CZK'
    },
    {
      'name':'Focus Paper Refill',
      'path': './src/madmonq/madmonq_beauty_setup.avif',
      'price': '89 CZK'
    },
    {
      'name':'Machined Mechanical Pencil',
      'path': './src/madmonq/madmonq_doom_wallpaper.avif',
      'price': '35 CZK'
    },
    {
      'name':'Innkeeper',
      'path': './src/other/Waves_Dark_Alt_6016x6016.avif',
      'price': '108 CZK'
    },
    {
      'name':'Posters',
      'path': './src/other/Waves_Monterey_Light_6016x6016.avif',
      'price': '80 CZK'
    },
    {
      'name':'Posters 2',
      'path': './src/other/Waves_Light_6016x6016.avif',
      'price': '160 CZK'
    },
    {
      'name':'Flatlay',
      'path': './src/other/Waves_Dark_Alt_6016x6016.avif',
      'price': '515 CZK'
    }
  ])
})

app.listen(serverPort, () => {
  console.log(`${new Date().toISOString()} BattlePage server listening on port ${serverPort}`)
})