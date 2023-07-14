const express = require("express");
const {
  getProduct,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,

  protectUser,
  paginateResult,
} = require("../controler/Product");
const router = express.Router();
router.get("/", protectUser, getProduct);
router.get("/paginate", paginateResult);
router.post("/product", addProduct);
router.get("/product:id", getSingleProduct);
router.put("/product:id", updateProduct);
router.delete("/product:id", deleteProduct);
module.exports = router;
