

// require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it working

const express = require('express')
const res = require('express/lib/response')
const app =  express()
const PORT = process.env.PORT || 1337
const bodyParser = require('body-parser')

// const Tweet = require('./modals/Tweet')
const UserSchema = require('./modals/userschema')


require('dotenv').config()
const connectDB = require('./config/db')

connectDB();

// app.post('/createTweet', async (req, res) => {
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

app.get('/login', (req, res) => {
  console.log("test");
  res.render('login.hbs')
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
})

app.listen(PORT, () => {
  console.log(`Hello on port: ${PORT}`)
})


// //////////////////
//     new try     //
// //////////////////




// app.post("/test-post", async (req, res) => {
//   await database
//     .collection("test_collection")
//     .insertOne({ name: req.body.name, age: req.body.age });

//   let newUser = await database
//     .collection("test_collection")
//     .findOne({ name: req.body.name });

//   console.log(newUser); // Log the new user to the database

//   res.redirect("/");
// });

// const username = "Stein";
// const password = "SuperCoolWachtwoord";

// let session;

// app.post("/login-test", async (req, res) => {
//   console.log(req.body);
//   if (req.body.username == username && req.body.password == password) {
//     // Check if the username and password are correct
//     console.log("Valid username and password");
//     session = req.session;
//     session.username = req.body.username;
//     console.log(req.session);
//     res.redirect("/login");
//   } else {
//     console.log("Invalid username or password");
//     res.redirect("/");
//   }
// });

// app.get("/login", (req, res) => {
//   console.log(req.session.username); // Get the username from the session

//   res.render("login", { username: req.session.username }); // Render the login page
// });

