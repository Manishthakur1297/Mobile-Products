const express = require("express");
const router = express.Router();

const {
  list,
  importData,
  listBySearch,
  create,
  fetchData,
} = require("../controllers/product");

// @route       GET api/products
// @desc        LIST ALL PRODUCTS
// @access      Public

router.get("/products", list);

// @route       POST api/products
// @desc        ADD NEW PRODUCT
// @access      Public

router.post("/products", create);

// @route       GET api/products/import
// @desc        Upload Data to DB
// @access      Public

router.get("/products/import", importData);

// @route       GET api/products/fetch
// @desc        Upload Data to DB
// @access      Public

router.get("/products/fetch", fetchData);

// @route       POST api/products/by/search
// @desc        Search PRODUCTS
// @access      Public

router.post("/products/by/search", listBySearch);

module.exports = router;
