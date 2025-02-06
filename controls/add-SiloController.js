const asyncHandler =  require("express-async-handler")
const Silo = require("../models/siloModel")
const addSilo =  asyncHandler(async (req, res) => {
const {
    name,
    logo,
    sonicXp,
    borrowAPR,
    utilization,
    availableToBorrow,
    maxLT,
    maxLTV,
    TVL,
    liquadationFee,
   contractAddress,
  depositAPR,
  siloAddress
} = req.body


 if(!name || ! contractAddress) {
    return res.status(401).json({
        message : "Name and address is required"
    })
 }

  const silo =  new Silo({
    name,
    logo,
    sonicXp,
    borrowAPR,
    depositAPR,
    utilization,
    availableToBorrow,
    maxLT,
    maxLTV,
    TVL,
    liquadationFee,
   contractAddress,
   siloAddress
  })

   const savedSilo = await silo.save()

  res.status(201).json({
    message : "New silo added",
     savedSilo
  })

})

 const getAllSilos = asyncHandler(async(req, res) => {
  
    const silos = await Silo.find()

    res.status(200).json({
        silos 
    })
 })

module.exports = {
     addSilo, getAllSilos
}