
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const activityRouter = require('./routes/activity.router');
const myprofileRouter = require('./routes/myprofile.router');
const publicProfileRouter = require('./routes/publicprofile.router');
const searchRouter = require('./routes/search.router');
const imageUrlRouter = require('./routes/image-url.router');
const forgotPasswordRouter = require('./routes/forgot-password.router');

// S3 uploader
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/activity', activityRouter);
app.use('/api/myprofile', myprofileRouter);
app.use('/api/publicprofile', publicProfileRouter);
app.use('/api/search', searchRouter);
app.use('/api/imageurl', imageUrlRouter);
app.use('/api/forgotpassword', forgotPasswordRouter);

// Required information for Amazon S3 image bucket // 
app.use('/s3', UploaderS3Router({
  bucket: 'findyourpowerscytalebucket',           // required, this is the name of the bucket where our images are stored
  region: 'us-east-2',                            // optional
  headers: {'Access-Control-Allow-Origin': '*'},  // optional
  ACL: 'public-read',                             // this is the default - set to `public-read` to let anyone view uploads
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
