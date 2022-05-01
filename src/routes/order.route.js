const passport = require("passport");
import * as orderController from '../controllers/order.controller';


let resource = '/order';

module.exports = (app, version) => {
  app.post(
    `${resource}`,
    passport.authenticate("jwt", { session: false }),
    orderController.createOrder
  );
}