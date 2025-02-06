const asyncHandler =  require("express-async-handler")
const Market = require("../models/marketModel")
const addMarket =  asyncHandler( async (req, res) => {
    const {
        name,
        id,
        address,
        protocolFee,
        deployerAddress,
        silo0,
        silo1
    } = req.body

    /*if(! silo1 || silo0){
        res.status(400).json({
            message : "silo contract addresses is required"
        })
    }*/

     const newMarket = new Market({
        name,
        id,
        address,
        protocolFee,
        deployerAddress,
        silo0,
        silo1 
     })

      const savedMarket = await newMarket.save()

      res.status(201).send("Market created")
})


 const getMrkets = asyncHandler(async(req, res) => {
     const markets = await Market.find().populate("silo0").populate("silo1")
     res.status(200).json(markets)
 })
module.exports = {
    addMarket,
    getMrkets
}