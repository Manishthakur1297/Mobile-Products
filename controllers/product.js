const Product = require("../models/product");

exports.importData = async (req, res) => {
  try {
    let data = require("../products.json").products;

    for (key in data) {
      let product = new Product(data[key]);
      await product.save();
    }
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// Create Controller is to Insert or ADD New entry of the product to the database

exports.create = async (req, res) => {
  try {
    let data = req.body;
    let product = new Product(data);
    const result = await product.save().catch((e) => {
      console.log("ERROR : ", e);
      process.exit(1);
    });
    return res.json(result);
  } catch (error) {
    return res.status(400).json("ERROR : ", error.stack);
  }
};

// List Controller is used to Retrieve ALL Products from Database using Find() in mongodb

exports.list = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "popularity";
    let limit = req.query.limit ? parseInt(req.query.limit) : 50;

    let products = await Product.find()
      .select("_id title subcategory price popularity")
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(products);
  } catch (error) {
    return res.status(400).json({ msg: "Products Not Found!!!" });
  }
};

// List By Search is the one controller that is implemented to perform search requests to database
// and retrieve results from the Backend to Frontend

exports.listBySearch = async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "popularity";
  let limit = req.body.limit ? parseInt(req.body.limit) : 50;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let search = req.body.title ? req.body.title : "";

  // console.log(req.body);

  let findArgs = { title: "" };

  let searchQuery = new RegExp(search.toLowerCase(), "i");

  findArgs.title = searchQuery;

  console.log(findArgs);
  try {
    let products = await Product.find(findArgs)
      .select("_id title subcategory price popularity")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);
    res.json({
      size: products.length,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Products not found",
    });
  }
};
