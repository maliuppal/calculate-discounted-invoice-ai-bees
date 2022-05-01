const passport = require("passport");
import * as categoryController from '../controllers/category.controller';


let resource = '/category';

module.exports = (app, version) => {

  app.get(
    `${version}${resource}`,
    passport.authenticate("jwt", { session: false }),
    categoryController.findAllCategories
  );

  app.post(
    `${version}${resource}`,
    passport.authenticate("jwt", { session: false }),
    categoryController.createCategory
  );

  app.get(
    `${resource}/:id`,
    passport.authenticate("jwt", { session: false }),
    categoryController.findOneCategory
  );

  app.put(
    `${resource}/:id`,
    passport.authenticate("jwt", { session: false }),
    categoryController.updateCategory
  );

  app.delete(
    `${resource}/:id`,
    passport.authenticate("jwt", { session: false }),
    categoryController.deleteCategory
  );

}

// db.category.hasMany(db.product, { foreignKey: 'categoryId' });
// db.product.belongsTo(db.category, { foreignKey: 'categoryId' });