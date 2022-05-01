const passport = require("passport");
import * as userController from '../controllers/user.controller';

let resource = '/user';

module.exports = (app, version) => {
  app.post(
    `${version}${resource}/register`,
    userController.register
  );
  app.post(
    `${version}${resource}/login`,
    userController.login
  );
}