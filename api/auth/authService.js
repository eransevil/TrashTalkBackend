const bcryptjs = require("bcryptjs");
const userService = require("../user/userService");
const logger = require("../../services/loggerService");

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`);
  const user = await userService.getByUsername(username.toLowerCase());
  if (!user) return Promise.reject("Invalid username or password");
  const match = await bcryptjs.compare(password, user.password);
  if (!match) return Promise.reject("Invalid username or password");

  delete user.password;
  return user;
}

async function signup(username, password, fullname, imgUrl) {
  const saltRounds = 10;

  logger.debug(
    `auth.service - signup with username: ${username}, fullname: ${fullname}`
  );
  if (!username || !password || !fullname)
    return Promise.reject("fullname, username and password are required!");

  const user = await userService.getByUsername(username.toLowerCase());
  if (user) return Promise.reject("Username is alrady taken.");

  const hash = await bcryptjs.hash(password, saltRounds);
  return userService.add({ username, password: hash, fullname, imgUrl });
}

module.exports = {
  signup,
  login,
};
