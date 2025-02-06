const express = require("express")
const { addMarket, getMrkets } = require("../controls/marketsController")

 const router = express.Router()

  //router.route("/home").get(getMarkets)
  router.route("/add-market").post(addMarket)
  router.route("/get-markets").get(getMrkets)

 module.exports = router