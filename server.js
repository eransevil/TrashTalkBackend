const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const logger = require("./services/loggerService");

const app = express();
require("dotenv").config({ path: "./config.env" });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const session = expressSession({
  secret: "ssl",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1 * 60 * 60 * 10000 },
});

app.use(express.json());
app.use(session);

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:3001",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:5000, https://www.googleapis.com/oauth2/v3/tokeninfo",
    ], ///////////////////////////////////////////////////////////////IFAT USED 3000
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const userRoutes = require("./api/user/userRoutes");
const authRoutes = require("./api/auth/authRoutes");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
// app.get('/**', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
