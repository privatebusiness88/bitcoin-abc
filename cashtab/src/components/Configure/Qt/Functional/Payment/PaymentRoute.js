 const express = require('express');
const paymentRouter = express.Router();
const axios = require('axios');
const { request } = require('express');
const { v4: UUID } = require('uuid');
require('dotenv').config();

paymentRouter.use(express.json({ type:'application/json' }));

paymentRouter.get('/payment-status/:payment_id', (req, res) => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.CIRCLE_API_KEY}`
    }
  };

  axios.get(`https://api-sandbox.circle.com/v1/payments/${req.params.payment_id}`, requestOptions).then((response) => {
    if (response.data.data.errorCode) {
      res.send({
        status: response.data.data.errorCode,
        id: response.data.data.id,
        amount: response.data.data.amount.amount,
        date: response.data.data.updateDate
      });
    } else if (response.data.data.status) {
      if (response.data.data.source.id) {
        axios.get(`https://api-sandbox.circle.com/v1/cards/${response.data.data.source.id}`, requestOptions).then((card) => {
          res.send({
            status: response.data.data.status,
            id: response.data.data.id,
            amount: response.data.data.amount.amount,
            date: response.data.data.updateDate,
            paymentMethod: `${card.data.data.network} •••• ${card.data.data.last4}`
          });
        }).catch((error) => {
          res.status(401).send('Error retrieving card data');
        });
      }
    }
  }).catch((error) => {
    res.status(404).send({
      paymentStatusError: error.response.data.message
    });
  });
});

paymentRouter.post('/create-card-payment', (req, res) => {
  const amount = req.body.data.payload.amount
  const encryptedCVV = req.body.data.payload.encryptedCVV;

  delete req.body.data.payload['encryptedCVV'];
  delete req.body.data.payload['amount'];

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.CIRCLE_API_KEY}`
    }
  };

  axios.post('https://api-sandbox.circle.com/v1/cards', req.body.data.payload, requestOptions).then((response) => {
      const data = {
        autoCapture: true,
        idempotencyKey: UUID(),
        encryptedData: encryptedCVV,
        keyId: req.body.data.payload.keyId,
        description: 'Payment Portal Payment',
        amount: {
          amount,
          currency: 'USD'
        },
        verification: 'cvv',
        source: {
          id: response.data.data.id,
          type: 'card'
        },
        metadata: {
          email: req.body.data.payload.metadata.email,
          sessionId: req.body.data.payload.metadata.sessionId,
          ipAddress: req.body.data.payload.metadata.ipAddress
        }
      };

      axios.post('https://api-sandbox.circle.com/v1/payments', data, requestOptions).then((response) => {
        res.send(response.data.data);
      }).catch((error) => {
        res.status(400).send(error.reponse.data);
      });
  }).catch((error) => {
    res.status(400).send(error.response.data);
  });
});

module.exports = paymentRouter;
