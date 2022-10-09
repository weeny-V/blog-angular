const express = require('express');

const router = express.Router();

router.get('/success', (req, res) => {
  return res.sendFile(process.cwd() + '/server/pages/failedLogin.html')
})

router.get('/account/exist', (req ,res) => {
  return res.sendFile(process.cwd() + '/server/pages/profileAlreadyExist.html')
})

module.exports = { responsesRouter: router };
