 const express = require('express');
const keyRouter = express.Router();
require('dotenv').config()

let publicKey = '';

const axios = require('axios');

const getPublicKey = () => {
  console.log('Retrieving public key.');
  const url = 'https://api-sandbox.circle.com/v1/encryption/public';

  const headers = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
    }
  };

  axios.get(url, headers).then((response) => {
    console.log('Fetched public key.');
      publicKey = response.data.data;
  }).catch((error) => {
    console.log(error);
  });
};

getPublicKey();

keyRouter.get('/key', (req, res) => {
    res.send(publicKey);
});

module.exports = keyRouter;
