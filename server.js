const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
