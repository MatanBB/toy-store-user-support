const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')


const app = express()
const http = require('http').createServer(app)


app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: 
    [ 'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://localhost:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes.js') //updated .js
const userRoutes = require('./api/user/user.routes.js')
const toyRoutes = require('./api/toy/toy.routes.js')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)


/************LIST****************/

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})


// app.get('/api/toy', (req, res) => {
//   console.log(req.query)
//   var { name, label, sort, inStock } = req.query

//   const filterBy = {
//     name: name || '',
//     label: label || 'All',
//     sort: sort || 'name',
//     inStock: JSON.parse(inStock),
//   }
//   toyService.query(filterBy).then((toys) => {
//     res.send(toys)
//   })
// })

// // app.get('/api/toy/download', (req, res) => {
// //   toyService.downloadPDF()
// //     .then(() => {
// //       console.log('Downloading...')
// //       res.send('download successful')
// //     })
// // })

// /**************ADD************/

// app.post('/api/toy/', (req, res) => {
//   // const loggedinUser = userService.validateToken(req.cookies.loginToken)
//   // if (!loggedinUser) return res.status(401).send('Cannot add toy')
//   console.log('im here')
//   const { name, price } = req.body
//   const toy = {
//     name,
//     price
//   }
//   toyService.save(toy)
//     .then(savedToy => {
//       res.send(savedToy)
//     })
//     .catch((err) => {
//       console.log('OOPS:', err)
//       res.status(400).send('Cannot save toy')
//     })
// })

// /***************UPDATE******************/

// app.put('/api/toy/:toyId', (req, res) => {
//   const { name, price, _id } = req.body
//   const toy = {
//     _id,
//     name,
//     price
//   }
//   toyService.save(toy)
//     .then(savedToy => {
//       res.send(savedToy)
//     })
//     .catch((err) => {
//       console.log('OOPS:', err)
//       res.status(400).send('Cannot save toy')
//     })
// })

// /******************READ******************/

// app.get('/api/toy/:toyId', (req, res) => {
//   // let visitedToys = JSON.parse(req.cookies.visitedToys || '[]')
//   const { toyId } = req.params
//   // if (visitedToys.length >= 3 && !visitedToys.includes(toyId)) return res.status(401).send('Wait for a bit')
//   // if (!visitedToys.includes(toyId)) visitedToys.push(toyId)

//   // res.cookie('visitedToys', JSON.stringify(visitedToys), { maxAge: 15000 })
//   // console.log('User visited' + [...visitedToys])
//   toyService.getById(toyId)
//     .then(toy => {
//       res.send(toy)
//     })
// })

// /******************REMOVE******************/

// app.delete('/api/toy/:toyId', (req, res) => {
//   const { toyId } = req.params
//   toyService.remove(toyId)
//     .then(() => {
//       res.send('Removed!')
//     })
//     .catch((err) => {
//       console.log('OOPS:', err)
//       res.status(400).send('Unknown car')
//     })
// })

// const PORT = process.env.PORT || 3030



// app.listen(3030, () => console.log('Server listening on port 3030'))