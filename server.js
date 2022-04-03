const express = require('express')
const res = require('express/lib/response')
const app =  express()
const PORT = process.env.PORT || 1337
const bodyParser = require('body-parser')
const UserSchema = require('./modals/userschema')
const connectDB = require('./config/db')
const session = require('express-session')
let currentSession;
const parseurl = require('parseurl')

connectDB();
require('dotenv').config()

// template/hbs setup
const { engine } = require ('express-handlebars');
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/view/layouts/',
  partialsDir: __dirname + '/view/partials'
}));
app.set('view engine', 'hbs');
app.set('views', 'view');

// sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


// zodat je public kan gebruiken voor css
app.use('/static',express.static('static'))


// waardes uit request halen
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
  res.render('startscreen.hbs')
})

// username en email displayen op profile page
app.get('/profile', (req, res) => {
  console.log(req.session);
  const user = {
    username: req.session.username,
    email: req.session.email,
  }
  res.render('profile.hbs', {
    user: user
  })
})


// promise all haalt de user op maar wacht dat de user is gevonden
app.post('/profile', (req, res) => {
  Promise.all([UserSchema.findOne({username: req.body.username})])
  .then(result => {
    currentSession = req.session;
    currentSession.username = req.body.username
    currentSession.email = result[0].email
  })
  .then(result => {
    res.redirect('profile')
  })

})


app.get('/login', (req, res) => {
  console.log("test");
  res.render('login.hbs')
})

// promise all haalt de user op maar wacht dat de user is gevonden
app.post('/login', (req, res) => {
  Promise.all([UserSchema.findOne({username: req.body.username, password:req.body.password})])
  .then(result => {
    res.redirect('/profile')
  })
})

app.get('/signup', (req, res) => {
  res.render('signup.hbs')
})


app.get('/contact', (req, res) => {
  res.send('contactpagina..')
})

app.get('*', (req, res) => {
  res.render('error.hbs')
})

// async await creeërt userschema en wacht dat deze is aangemaakt
app.post('/signup', async (req, res) => {
  console.log(req.body);
  await UserSchema.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    schoolname: req.body.schoolname,
  })
  currentSession = req.session
  currentSession.username = req.body.username;
  currentSession.email = req.body.email;
  res.redirect('/profile');

})

app.listen(PORT, () => {
  console.log(`Hello on port: ${PORT}`)
})

// Hier wordt de userschema geupdate met nieuwe info die de gebruiker zelf kan invullen tijdens de session
app.post('/update', (req, res) => {
  currentSession = req.session;
  UserSchema.updateOne({ username: currentSession.username }, { username: req.body.username, email: req.body.email }).exec();
  currentSession.username = req.body.username;
  currentSession.email = req.body.email;
  res.redirect('/profile');
})

// Hier wordt de session gedestroyed en daarmee logt de gebruiker uit
app.post('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})


