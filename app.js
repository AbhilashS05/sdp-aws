const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, AdrequireAuth } = require('./middleware/authMiddleware');
const res = require('express/lib/response');

const app = express();
const PORT = process.env.PORT || 3000;
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://arun:arun@cluster1.lqbst.mongodb.net/sdp-aws';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes


app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.get('/CSE', requireAuth, (req, res) => res.render('CSE'));
app.get('/ECE', requireAuth, (req, res) => res.render('ECE'));
app.get('/civil', requireAuth, (req, res) => res.render('civil'));
app.get('/Mech', requireAuth, (req, res) => res.render('Mech'));
app.get('/civil', requireAuth, (req, res) => res.render('civil'));
app.get('/ad', AdrequireAuth, (req, res) => res.render('ad'));
app.get('/booking', requireAuth, (req, res) => res.render('booking'));

app.use(authRoutes);
