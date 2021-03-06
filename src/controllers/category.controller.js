const db = require("../config/database");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
const createCategory = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: 'Category name can not be empty!',
        });
        return;
    }
    // Create a Category
    const category = {
        name: req.body.name,
        discount: req.body.discount,
        parentCategoryId: req.body.parentCategoryId || null,
    };
    // Save Category in the database
    Category.create(category)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Category.',
            });
        });
};

// Retrieve all Category from the database.
const findAllCategories = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Category.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Categorys.',
            });
        });
};
// Find a single Category with an id
const findOneCategory = (req, res) => {
    const id = req.params.id;
    Category.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Category with id=' + id,
            });
        });
};
// Update a Category by the id in the request
const updateCategory = (req, res) => {
    const id = req.params.id;
    Category.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Category was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Category with id=' + id,
            });
        });
};
// Delete a Category with the specified id in the request
const deleteCategory = (req, res) => {
    const id = req.params.id;
    Category.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Category was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Category with id=' + id,
            });
        });
};

export {
    createCategory,
    findAllCategories,
    findOneCategory,
    updateCategory,
    deleteCategory,
};
