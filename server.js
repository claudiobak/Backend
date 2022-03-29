const express = require('express')
const res = require('express/lib/response')
const app =  express()
const PORT = process.env.PORT || 1337
const bodyParser = require('body-parser')
const UserSchema = require('./modals/userschema')
const connectDB = require('./config/db')
const session = require('express-session')
let currentSession;
var parseurl = require('parseurl')

connectDB();
require('dotenv').config()

const { engine } = require ('express-handlebars');
const { redirect } = require('express/lib/response')
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/view/layouts/',
  partialsDir: __dirname + '/view/partials'
}));


// sessions

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }


// get the url pathname
var pathname = parseurl(req).pathname

// count the views
req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

next()
})


app.use('/static',express.static('static'))
app.set('view engine', 'hbs');
app.set('views', 'view');

app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
  res.render('startscreen.hbs')
})


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

app.post('/profile', (req, res) => {
  Promise.all([UserSchema.findOne({username: req.body.username})])
  .then(result => {
    console.log(result[0].email);
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

app.post('/update', (req, res) => {
  currentSession = req.session;
  UserSchema.updateOne({ username: currentSession.username }, { username: req.body.username, email: req.body.email }).exec();
  currentSession.username = req.body.username;
  currentSession.email = req.body.email;
  res.redirect('/profile');
})

app.post('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})


