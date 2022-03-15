const express = require('express')
const res = require('express/lib/response')
const app =  express()
const PORT = process.env.PORT || 1337
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt")
const saltRounds = 10
const UserSchema = require('./modals/userschema')


bcrypt.genSalt(saltRounds, function(err, salt) {
});

require('dotenv').config()
const connectDB = require('./config/db')

connectDB();

// app.post('/signup', async (req, res) => {
//   const tweet = new Tweet (req.body)
//   await tweet.save()
// })

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

app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
  res.render('startscreen.hbs')
})

app.get('/profile', (req, res) => {
  res.render('profile.hbs')
})

app.post('/profile', (req, res) => {
  Promise.all([UserSchema.findOne({username: req.body.username})])
  .then(result => {
    console.log(result);
  })
  // const newuser = new UserSchema (req.body)
  // await newuser.save()
})


app.get('/login', (req, res) => {
  console.log("test");
  res.render('login.hbs')
})

app.post('/login', (req, res) => {
  UserSchema.create(req.body)
  res.redirect('/profile')
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

app.post('/signup', (req, res) => {
  console.log(req.body);
  UserSchema.create(req.body)
  res.redirect('/profile')

})

app.listen(PORT, () => {
  console.log(`Hello on port: ${PORT}`)
})


app.post ('/login', async (req, res) => {
  try {
    const checkuser = await UserSchema.findOne({ username: req.body.username });
    if (checkuser) {
      const vergelijkwachtwoord = await bcrypt.compare(req.body.password, checkuser.password);
      if (vergelijkwachtwoord) {
        console.log("Inloggen voltooid!")
        res.redirect("/profile")
      } else {
        console.error("Foute gebruikersnaam of wachtwoord")
      }
    } else {
      console.error("Foute gebruikersnaam of wachtwoord")
    }
  } catch (error) {
    console.error(error);
  }
})

app.post ('/signup' , async (req, res) => {
  console.log('De gegevens zijn succesvol opgehaald')
  const wachtwoord = await bcrypt.hash(req.body.password, saltRounds)
  const newUser = new UserSchema ({
    username: req.body.username,
    email: req.body.email,
    password: wachtwoord
  });

  newUser.save((error) => {
    if (error) {
      console.log(error);
      return res.status(500).redirect('/signup');
    }
    return res.status(200).redirect('/profile');
});
});


