const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const app = express();
const cors = require('cors');
const db = require('./db');
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'Secret'}));

db.connect();

const { authRouter } = require('./routers/authRouter');
const { googleSignupRouter } = require('./routers/googleSignupRouter');
const { googleLoginRouter } = require('./routers/googleLoginRouter');
const { responsesRouter } = require('./routers/responsesRouter');
const { facebookSignupRouter } = require('./routers/facebookSignupRouter');
const { facebookLoginRouter } = require('./routers/facebookLoginRouter');
const { userRouter } = require('./routers/userRouter');
const { twitterSignupRouter } = require('./routers/twitterSignupRouter');

app.use('/', responsesRouter)
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/signup', googleSignupRouter);
app.use('/login', googleLoginRouter);
app.use('/facebook/signup', facebookSignupRouter);
app.use('/facebook/login', facebookLoginRouter);
app.use('/twitter/signup', twitterSignupRouter);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`> Example app listening on port ${port}`)

    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

function errorHandler(err, req, res) {
  res.status(500).send({ message: err, status: 500 });
}

app.use(errorHandler);
