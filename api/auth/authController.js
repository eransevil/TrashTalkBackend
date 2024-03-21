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
    res.status(401).send({ err: "Invalid username or password" });
  }
}
async function loginWithGoogle(req, res) {
  const { idToken } = req.body;

  try {
    const user = await authService.loginWithGoogle(idToken);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    logger.error("Failed to Login " + err);
    res.status(403).send({ err: "Login user already regsiter with email" });
  }
}

async function signup(req, res) {
  try {
    const { username, password, email, imgUrl } = req.body;
    const account = await authService.signup(username, password, email, imgUrl);
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
  loginWithGoogle,
};
