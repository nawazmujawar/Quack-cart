const express = require("express")
const router = express.Router()
const checkAuth = require("../middleware/checkAuth")
const orderController = require("../controller/order")

router.get("/", checkAuth, orderController.order_get_all)

router.post("/", checkAuth, orderController.order_post)

router.get("/:orderId", checkAuth, orderController.order_get_single)

router.delete("/:orderId", checkAuth, orderController.order_delete)

module.exports = router