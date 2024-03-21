const bcryptjs = require("bcryptjs");
const userService = require("../user/userService");
const logger = require("../../services/loggerService");
const axios = require("axios");

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`);
  const user = await userService.getByUsername(username.toLowerCase());
  if (!user) return Promise.reject("Invalid username or password");
  const match = await bcryptjs.compare(password, user.password);
  if (!match) return Promise.reject("Invalid username or password");

  delete user.password;
  return user;
}
async function loginWithGoogle(idToken) {
  logger.debug(`auth.service - loginWithGoogle with idToken: ${idToken}`);
  const response = await axios({
    method: "get",
    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
    withCredentials: true,
  });
  const user = await userService.getByEmail(response?.data.email.toLowerCase());
  console.log("user", user);
  if (!user) {
    const email = response?.data.email;
    const name = response?.data.name;
    const userForReturn = { email, name };
    return userForReturn;
  } else {
  }
  return Promise.reject("user already regsiter with email");
}

async function signup(username, password, email, imgUrl) {
  const saltRounds = 10;

  logger.debug(
    `auth.service - signup with username: ${username}, email: ${email}`
  );
  if (!username || !password || !email)
    return Promise.reject("email, username and password are required!");

  const user = await userService.getByUsername(username.toLowerCase());
  if (user) return Promise.reject("Username is alrady taken.");

  const hash = await bcryptjs.hash(password, saltRounds);
  return userService.add({ username, password: hash, email, imgUrl });
}

module.exports = {
  signup,
  login,
  loginWithGoogle,
};
