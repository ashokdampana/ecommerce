
const Product = require("../models/Product")
const connectDB = require("./db")
const {mensProducts} = require('../data/mens')
const {womensProducts} = require('../data/womens')
const {kidsProducts} = require('../data/kids')
const { default: mongoose } = require("mongoose")


function removeIdAndFixCategory(products) {
    return products.map(({ id, ...rest }) => ({
        ...rest
    }));
}

async function uploadData() {
    mongoose.connect('mongodb+srv://ashok025:pass1234@cluster0.4a88bbf.mongodb.net/ecommerce?appName=Cluster0')

    // Remove 'id' from each product
    const cleanMensProducts = removeIdAndFixCategory(mensProducts);
    const cleanWomensProducts = removeIdAndFixCategory(womensProducts);
    const cleanKidsProducts = removeIdAndFixCategory(kidsProducts);
    
    await Product.insertMany(cleanMensProducts);
    await Product.insertMany(cleanWomensProducts);
    await Product.insertMany(cleanKidsProducts);

    console.log('All products inserted without id');
}

uploadData()
