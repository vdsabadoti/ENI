const express = require('express')
const User = require('../services/user')
const argon2 = require('argon2')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch')
const { addUser, findByEmail } = require('../storage/users')
const { findAll } = require('../storage/users')

router.get('/', (req, res) => {
  console.log(findAll())
  return res.status(202).render('listusers.ejs', {
    users: findAll(),
  })
})

router.get('/logout', (req, res) => {
  console.log('User logout')
  req.session.user = undefined
  return res.redirect('/')
})

router.get('/connection', (req, res) => {
  let db = req.db
  let collection = db.get('usercollection')
  collection.find({}, function (e, docs) {
    res.render('listusers.ejs', {
      users: docs,
    })
  })
  /*return res.redirect('/');*/

  req.session.user = undefined
})

router.get('/login', (req, res) => {
  console.log(findAll())
  return res.status(202).render('login.ejs')
})

router.post('/login', async (req, res) => {
  let db = req.db
  let collection = db.get('usercollection')
  const findResult = await collection.findOne({ mail: req.body.mail })
  console.log('FindResult results : ')
  if (
    !findResult.isEmpty &&
    (await verifyPasswordWithHash(req.body.password, findResult.password))
  ) {
    req.session.user = new User(1, false, findResult.mail, 'argon2')
    return res.redirect('/')
  } else {
    return res.render('login.ejs', {
      message: 'User does not exist or password incorrect',
    })
  }
})

router.get('/signin', (req, res) => {
  console.log(req.session.signinPageViews)
  if (req.session.signinPageViews) {
    req.session.signinPageViews++
    console.log('Hello World ! You visited this page ' + req.session.signinPageViews + ' times')
    return res.status(202).render('signin.ejs')
  } else {
    req.session.signinPageViews = 1
    console.log('Hello World ! Welcome to this page for the first time!')
    return res.status(202).render('signin.ejs')
  }
})

router.post(
  '/signin',
  body('mail').isEmail().withMessage('Mail format is not valid or empty'),
  body('password').isLength({ min: 4 }).withMessage('Password must contain at least 4 characters'),
  body('password2')
    .exists()
    .withMessage('You must type a confirmation password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match'),
  async (req, res) => {
    const errors = validationResult(req)
    let db = req.db
    let collection = db.get('usercollection')
    let findResult = await collection.findOne({ mail: req.body.mail })
    console.log(findResult);
    if ((errors.errors.isArray && errors.errors.lenght) || findResult !== null) {
      if (!findResult.isEmpty) {
        errors.errors.push({
          value: '1',
          msg: 'Email already exists',
          param: 'mail',
          location: 'body',
        })
      }
      console.log(errors.array())
      return res.status(402).render('signin.ejs', {
        errors: errors.array(),
      })
    } else {
      createUserInDB(req.db, req.body.mail, req.body.password)
      return res.redirect('/ok/connection')
    }
  },
)

function addStorage(mail) {
  console.log('Add storage')
  let localStorageContent = localStorage.getItem('user')
  let localStorageArray = JSON.parse(localStorageContent)
  if (localStorageArray === null) {
    localStorageArray = []
  }
  localStorageArray.push(mail)
  let localStorageNewContent = JSON.stringify(localStorageArray)
  console.log(localStorageNewContent)
  localStorage.setItem('user', localStorageNewContent)
}

const hashingConfig = {
  // based on OWASP cheat sheet recommendations (as of March, 2022)
  parallelism: 1,
  memoryCost: 64000, // 64 mb
  timeCost: 3, // number of itetations
}

async function hashPassword(password) {
  return await argon2.hash(password, {
    hashingConfig,
  })
}

async function verifyPasswordWithHash(password, hash) {
  return await argon2.verify(hash, password, hashingConfig)
}

async function createUserInDB(db, mail, password) {
  console.log(mail)
  let collection = db.get('usercollection')
  hashPasswordX = await hashPassword(password)
  collection.insert(
    {
      mail: mail,
      password: hashPasswordX,
    },
    function (err, doc) {
      if (err) {
        console.log('Soucis !')
      }
    },
  )
  addUser(mail, hashPassword)
}

module.exports = router
