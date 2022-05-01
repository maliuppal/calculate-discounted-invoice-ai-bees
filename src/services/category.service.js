import { getFileData } from '../common/common';
import { getTransactionsData } from './transaction';

const getStockLevel = (sku: string, qty: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const promises = [getStocksData(sku), getTransactionsData(sku)];
            Promise.all(promises).then((skuData: any) => {
                // get product stock data
                if (!skuData[0]) {
                    resolve(null);
                }

                // get product transactions data and minus from orignal sales
                skuData[1].forEach((transaction: any) => {
                    skuData[0] = skuData[0] - transaction.qty;
                });

                resolve({ sku, qty: skuData[0] });
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};

const getStocksData = (sku: string) => {
    return new Promise((resolve, reject) => {
        getFileData('assets/stock.json')
            .then((stocks: any) => {
                stocks = JSON.parse(stocks);
                let skuStock: any = stocks.filter((stock: any) => stock.sku === sku);
                skuStock = skuStock.length ? skuStock[0].stock : null;
                resolve(skuStock);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

export {
    getStockLevel
};
