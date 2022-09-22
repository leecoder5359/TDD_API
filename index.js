const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const multer = require("multer");//대용량 처리 (이미지 등)
const app = express();
const user = require('./api/user');

// const logger = (req, res, next) => {
//     console.log('Logger');
//     next();
// };
//
// const logger2 = (req, res, next) => {
//     console.log('Logger2');
//     next();
// };
// app.use(logger);
// app.use(logger2);

if(process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user);

// app.listen(4567, () => {
//    console.log('Server is running');
// });

module.exports = app;
