
import Category from '../models/category.model';

const genterateInvoice = async (product) => {

    let invoiceAmount, discount = 0;
    try {
        if (product.discount > 0) {
            discount = product.discount;
        } else {
            const category = await Category(product.categoryId);
            if (category.discount > 0) {
                discount = category.discount;
            } else {
                const parentCategory = await Category(category.parentCategoryId);
                if (parentCategory.discount > 0) {
                    discount = parentCategory.discount;
                }
            }
        }

        invoiceAmount = product.price - ((product.price / 100 ) * discount);
    } catch (err) {
        invoiceAmount = -1;
        console.log(`Error while generating invoice amount: ${err}`);
    }
    
    return [invoiceAmount, discount];
};

export default  {
    genterateInvoice
};
