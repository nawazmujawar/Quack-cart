const express = require("express")
const router = express.Router()
const checkAuth = require("../middleware/checkAuth")
const productController = require("../controller/product")

router.get("/",productController.product_get_all )

router.post("/", checkAuth, productController.product_post)

router.get("/:productId",productController.product_get_single)

router.patch("/:productId", checkAuth, productController.product_patch)

router.delete("/:productId", checkAuth,productController.product_delete)

module.exports = router