
const { validationResult } = require('express-validator');
const { Product } = require('amazonproductscraper');
const axios = require("axios");
const cheerio = require("cheerio");
const searchProduct = require('../models/searchProduct');

exports.getProductFromAliexpress = async (req, res, next) => {
    // send any product url here
    // url = 'https://www.aliexpress.com/item/32849272573.html?spm=a2g0o.productlist.0.0.623c227fEtP8TN&algo_pvid=28e0f55b-74ee-4408-b0ff-e967685b916f&aem_p4p_detail=202112021028452324506235896840001360120&algo_exp_id=28e0f55b-74ee-4408-b0ff-e967685b916f-2&pdp_ext_f=%7B%22sku_id%22%3A%2265211394726%22%7D'
    try {
        url = req.body.link;
        const scrape = require('aliexpress-product-scraper');
        const product = scrape(url);
        let data = [];
        await product.then(res => {
            data = res;
        });
        res.status(200).json({
            success: true,
            data: data,
        })
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.success = false;
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getProductFromAmazon = async (req, res, next) => {
    try {
        // paste any url here
        let url = req.body.link;
        console.log(url);
        const producto = await new Product(url).init();
        let data = producto.get();
        let price = data.price;
        price = price.split('$');
        data.price = parseFloat(price[1]);
        data.price = data.price*85.67;
        res.status(200).json({
            success: true,
            data: data,
            message : "product from amazon fetched successfully"
        })
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.success = false;
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}

exports.postOrder = async (req, res, next) => {
    try {
        // paste any url here
        let data = req.body;
        console.log(data);
        const product = new searchProduct(data);
        await product.save();

        res.status(200).json({
            success: true,
            message: 'order placed Successfully!'
        });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}
exports.getAllOrders = async (req, res, next) => {
    try {
        const products = await searchProduct.find();
        const docCount = await searchProduct.countDocuments();
        res.status(200).json({
            data: products,
            count: docCount
        });
    } catch (err) {
        if (!err.statusCode) {
            console.log(err);
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation'
        }
        next(err);
    }

}
 






