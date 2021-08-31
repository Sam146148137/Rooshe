const express = require('express');
const path = require('path');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser')
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session')


const MONGODB_URI =
    'mongodb+srv://sam:146148137@cluster0.ql4hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function connectMongo() {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, err => {
        // console.log('connected')
    });
}

connectMongo()
    .then(result => console.log('connected to db'));

app.set('view engine', 'ejs');

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());



const routes = require('./routes/router');
const adminRouter = require('./routes/adminRoutes');

app.use(adminRouter);
app.use(routes);


const port = 3000;
app.listen(port, (req, res) => {
    console.log(`server started on port ${port}`)
});
