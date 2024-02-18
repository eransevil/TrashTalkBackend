const authService = require("./authService.js");
const logger = require("../../services/loggerService");

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    logger.error("Failed to Login " + err);
    res.status(401).send({ err: "nvalid username or password" });
  }
}

async function signup(req, res) {
  try {
    const { username, password, fullname, imgUrl } = req.body;
    const account = await authService.signup(
      username,
      password,
      fullname,
      imgUrl
    );
    logger.debug(
      `auth.route - new account created: ` + JSON.stringify(account)
    );
    const user = await authService.login(username, password, imgUrl);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    logger.error("Failed to signup " + err);
    res.status(500).send({ err: "Failed to signup" });
  }
}

async function logout(req, res) {
  try {
    req.session.destroy();
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" });
  }
}

module.exports = {
  login,
  signup,
  logout,
};
