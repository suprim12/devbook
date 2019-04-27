const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
// Db Config
const db = require('./config/keys').mongoURI;
// Middleware
app.use(express.json());
app.use(express.Router());
// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);
// Connect to db
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log(`Connected to db`))
    .catch((err) => console.error(`Connection Error ${err}`));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port}`));