 const express = require('express');
const app = express();
const enforce = require('express-sslify')
const appRouter = require('./Routes/AppRoute');
const publicKeyRouter = require('./Routes/PublicKeyRoute');
const paymentRouter = require('./Routes/PaymentRoute');
const port = process.env.PORT || 8080;

app.use(enforce.HTTPS({trustProtoHeader: true}));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://pay.iredullc.com');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(publicKeyRouter);
app.use(paymentRouter);
app.use(appRouter);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
