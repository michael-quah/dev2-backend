const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const customer = require('./customer');

app = express();
app.use(bodyparser.json());
app.use(cors());

app.use(customer.router);

app.listen(5000);