const User = require("../models/User");
const tok = require('jsonwebtoken');


const Admin = require("../models/Admin")

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 4 * 24 * 60 * 60;
const createToken = (id) => {
  return tok.sign({ id }, 'my secret code', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}
module.exports.signup_post = async (req, res) => {
  console.log(req.body);
  const { name, email, password, srn } = req.body;

  try {
    const user = await User.create({ name, email, password, srn });
    const token = createToken(user._id);
    res.cookie('tok', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('tok', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('tok', '', { maxAge: 1 });
  res.redirect('/');
}

/*admin*/


module.exports.adsignup_get = (req, res) => {
  res.render('adsignup');
}

module.exports.adlogin_get = (req, res) => {
  res.render('adlogin');
}
module.exports.adsignup_post = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const admin = await Admin.create({ email, password });
    const token = createToken(admin._id);
    res.cookie('tok', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ admin: admin._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.adlogin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.cookie('tok', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ admin: admin._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

