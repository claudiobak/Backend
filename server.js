// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



// const express =  require ('express')

// express()
//   .use('/static',express.static('static'))

//   .get('/', onhome)
//   .get('/about', onabout)
//   .get('/login', onlogin)

//   .listen(8000)

// function onhome(req, res) {
//   res.send('<h1>Hello World!</h1>')
// }

// function onabout(req, res) {
//   res.send('<h1>About me</h1>')
// }

// function onlogin(req, res) {
//   res.send('<h1>Login page</h1>')
// }

const express = require('express')
const res = require('express/lib/response')
const app =  express()
const PORT = process.env.PORT || 1337
const bodyParser = require('bodyParser')

const { engine } = require ('express-handlebars');
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials'
}));

app.use('/static',express.static('static'))
app.set('view engine', 'hbs');
app.set('views', 'view');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// app.get('/', (req, res) => {
//   res.send('login.hbs')
// })

app.get('/', (req, res) => {
  res.render('startscreen.hbs')
})

app.get('/about', (req, res) => {
  res.render('about.hbs')
})

app.get('/login', (req, res) => {
  res.render('login.hbs')
})

app.get('/contact', (req, res) => {
  res.send('contactpagina..')
})

app.get('*', (req, res) => {
  res.send('<h1>Not found..</h1>')
})

app.listen(PORT, () => {
  console.log(`Hello on port: ${PORT}`)
})