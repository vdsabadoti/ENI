const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

router.get('/', (req, res) => {
  return res.status(202).render('listusers.ejs', {
    users: JSON.parse(localStorage.getItem('user')),
  })
})

router.get('/po', (req, res) => {
  return res.status(202).render('signin.ejs');
})

router.post(
  '/po',
  body('mail').isEmail().withMessage('Mail format is not valid or empty'),
  body('password').isLength({ min: 4 }).withMessage('Password must contain at least 4 characters'),
  body('password2')
    .exists()
    .withMessage('You must type a confirmation password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match'),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty){
       return res.status(402).render('signin.ejs', {
        errors : errors.array()
    }); 
    } else {
        console.log(req.body.mail);
        addStorage(req.body.mail);
        return res.status(202).render('signin.ejs')
    }
  },
)

function addStorage(mail) {
    console.log("Add storage");
    let localStorageContent = localStorage.getItem('user')
    let localStorageArray = JSON.parse(localStorageContent);
    if (localStorageArray === null){
        localStorageArray = [];
    }
    localStorageArray.push(mail);
    let localStorageNewContent = JSON.stringify(localStorageArray);
    console.log(localStorageNewContent);
    localStorage.setItem('user', localStorageNewContent)
}

module.exports = router