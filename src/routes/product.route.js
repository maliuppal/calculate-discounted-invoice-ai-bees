const passport = require("passport");
import * as productController from '../controllers/product.controller';

let resource = '/product';

module.exports = (app, version) => {

  app.get(
    `${version}${resource}`,
    passport.authenticate("jwt", { session: false }),
    productController.findAllProducts
  );

  app.post(
    `${version}${resource}`,
    passport.authenticate("jwt", { session: false }),
    productController.createProduct
  );

  app.get(
    `${resource}/:id`,
    passport.authenticate("jwt", { session: false }),
    productController.findOneProduct
  );

  app.put(
    `${resource}/:id`,
    passport.authenticate("jwt", { session: false }),
    productController.updateProduct
  );

  app.delete(
    `${resource}/:id`,
    passport.authenticate("jwt", { session: false }),
    productController.deleteProduct
  );
}