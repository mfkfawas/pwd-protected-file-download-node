const dotenv = require('dotenv');
dotenv.config();

const multer = require('multer');
const express = require('express');
const app = express();
//return a middleware
const upload = multer({ dest: 'upload' });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  res.send('hai buddies');
});

const server = app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
