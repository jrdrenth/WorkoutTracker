const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.APP_PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(MONGODB_URI || 'mongodb://localhost/workoutdb', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Routes
app.use('/api', require('./controllers/apiRoutes'));
app.use('/', require('./controllers/htmlRoutes'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
