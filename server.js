const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/posts.js')
const authRouter = require('./routes/usersAuth.js')

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', authRouter);
app.use('/api/posts', router);

mongoose.connect('mongodb://127.0.0.1:27017/user_auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
