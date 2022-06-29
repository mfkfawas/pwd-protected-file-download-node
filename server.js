const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const multer = require('multer');
const express = require('express');
const bcrypt = require('bcrypt');
const File = require('./model/file');

const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DATABASE_URL);
//return a middleware
const upload = multer({ dest: 'upload' });
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalname: req.file.originalname,
  };
  if (req.body.password != null && req.body.password !== '') {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await File.create(fileData);

  res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.route('/file/:id').get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const file = await File.findById(req.params.id);

  if (file.password != null) {
    if (req.body.password == null) {
      res.render('password');
      return;
    }

    if (!(await bcrypt.compare(req.body.password, file.password))) {
      res.render('password', { error: true });
      return;
    }
  }

  file.downloadCount++;
  await file.save();
  console.log(file.downloadCount);

  res.download(file.path, file.originalName);
}

const server = app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
