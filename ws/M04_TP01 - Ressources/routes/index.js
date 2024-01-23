const express = require('express');
const router = express.Router();
const randomNumber = require('../services/random-number')
const tryNumer = require('../services/try-number')

let card = randomNumber.RandomNumber.generate()

console.log(card)

let nbOfTries = 0

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/try', (req, res) => {
  console.log(req.body);
  res.send('Hello World')
})

router.post('/try', (req, res) => {
    nbOfTries++  
    cardFound = 0;
    switch (tryNumer.tryNumber(parseInt(req.body.attempt), card).resultType) {
      case 'TOO_LOW':
        console.log(tryNumer.tryNumber(parseInt(req.body.attempt), card).text)
        return res.status(202).render('index.ejs', {
          message: tryNumer.tryNumber(parseInt(req.body.attempt), card).text,
          cardFound: cardFound,
        })
        break
      case 'TOO_HIGH':
        console.log(tryNumer.tryNumber(parseInt(req.body.attempt), card).text)
        return res.status(202).render('index.ejs', {
          message: tryNumer.tryNumber(parseInt(req.body.attempt), card).text,
          cardFound: cardFound,
        })
        break
      case 'CORRECT':
        cardFound = card;
        console.log(tryNumer.tryNumber(parseInt(req.body.attempt), card).text)
        return res.status(202).render('index.ejs', {
          message: tryNumer.tryNumber(parseInt(req.body.attempt), card).text,
          cardFound: cardFound,
        })
      case 'ERROR':
        console.log(tryNumer.tryNumber(parseInt(req.body.attempt), card).text)
        return res.status(422).render('index.ejs', {
          message: tryNumer.tryNumber(parseInt(req.body.attempt), card).text,
          cardFound: cardFound,
        })
    }
  },
)

module.exports = router;