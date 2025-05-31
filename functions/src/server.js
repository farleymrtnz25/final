const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const trabajadoresRoutes = require('./routes/trabajadores');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/.netlify/functions/api/trabajadores', trabajadoresRoutes);

module.exports.handler = serverless(app);