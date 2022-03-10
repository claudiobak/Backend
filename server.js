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

require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working

const express = require('express')
const res = require('express/lib/response')
const app =  express()
const PORT = process.env.PORT || 1337
const bodyParser = require('body-parser')

const Tweet = require('./modals/Tweet')

require('dotenv').config()
const connectDB = require('./config/db')

connectDB();

app.post('/createTweet', async (req, res) => {
  const tweet = new Tweet (req.body)
  await tweet.save()
})

const { engine } = require ('express-handlebars');
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/view/layouts/',
  partialsDir: __dirname + '/view/partials'
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

app.get('/profile', (req, res) => {
  res.render('profile.hbs')
})

app.get('/login', (req, res) => {
  console.log("test");
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