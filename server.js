const express = require("express");
const cors = require("cors");
const expressSession = require('express-session')
const path = require('path')
const logger = require('./services/loggerService')

const app = express();
require("dotenv").config({ path: "./config.env" });


const session = expressSession({
  secret: 'ssl',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
  maxAge: 1*60*60*10000
  }

})

app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
      origin: ['http://127.0.0.1:3001', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:5000'],///////////////////////////////////////////////////////////////IFAT USED 3000
      credentials: true
  }
  app.use(cors(corsOptions))
}

const userRoutes = require('./api/user/userRoutes')

app.use('/api/user', userRoutes)


// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
// app.get('/**', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })



const port = process.env.PORT || 3001
app.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})


// const port = process.env.PORT || 3001;
// app.use(cors());
// app.use(express.json());
// app.use(require("./api/user/usersRoutes"));
// // get driver connection
// const dbo = require("./db/conn");

// app.listen(port, async () => {
//   // perform a database connection when server starts
//   await dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });
