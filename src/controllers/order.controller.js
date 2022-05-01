import orderService from '../services/order.service';
const db = require("../config/database");
const Order = db.order;
const Product = db.product;


const createOrder = async (req, res) => {
     // Validate request
     if (!req.body.product) {
        res.status(400).send({
            message: 'product can not be empty to place order!',
        });
        return;
    }

    const product = await Product.findByPk(req.body.product);
    let [orderInvoice, discount] = await orderService.genterateInvoice(product);
    if (orderInvoice == -1) {
        orderInvoice = product.price;
    }

    // Create a Category
    const order = {
        product: product.name,
        price: product.price,
        discount: discount,
        invoicePrice: orderInvoice,
    };

    // Save Category in the database
    Order.create(order)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Category.',
            });
        });
};

export {
    createOrder
}