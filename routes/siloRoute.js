const express = require("express")
const { addSilo, getAllSilos } = require("../controls/add-SiloController")

const router = express.Router()

router.route("/add-silo").post(addSilo)
router.route("/get-silo").get(getAllSilos)


module.exports = router