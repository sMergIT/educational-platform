const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const multer = require("multer");

const { sessionStore } = require('./config/db');

const userMiddleware = require('./middlewares/user.js');
const notFoundMiddleware = require('./middlewares/notfound404.js');
const errorMiddleware = require('./middlewares/error.js');
const authRouter = require('./routes/auth');
const sendmsgRouter = require('./routes/sendmsg');
const groupRouter = require('./routes/group.router');


// const isAuthMiddleware = require('./middlewares/isAuth.middleware')
require('./config/passport');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ dest: "uploads" }).single("filedata"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 2,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());


app.use(userMiddleware);

app.use('/auth', authRouter);
app.use('/sendmsg', sendmsgRouter);
app.use('/group', groupRouter);

app.use(notFoundMiddleware);

app.use(errorMiddleware);
module.exports = app;
