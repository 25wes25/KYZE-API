let express = require('express');
let router = express.Router({ strict: true });
let bodyParser = require('body-parser');
let app = express();

const mongoose = require('mongoose');

let usersRouter = require('./src/routes/UsersRouter');

// Local URL
// const url = 'mongodb://127.0.0.1:27017/kyze';
// Development URL
const url = 'mongodb+srv://Admin:admin@kyze-cluster.lmr0q.mongodb.net/kyze';

// Connect to MongoDB server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected: ', url)
});

db.on('error', err => {
    console.error('Connection error: ', err)
});

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

app.use(bodyParser.json({ type: 'application/json' }));
app.enable('strict routing');
app.set('strict routing', true);
app.use(router);
app.use(usersRouter);


app.get('/', function (req, res) {
    res.send("KYZE-API")
});

app.use(function(err, req, res) {
    console.log(err);
});


app.listen(port, function () {
    console.log(`Listening at ${port}/...`);
});

