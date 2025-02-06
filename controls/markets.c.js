const asyncHandler =  require("express-async-handler")
const {ethers} = require("ethers");
const { SILO_LENS, SILO_LENS_ABI, SILO__MARKET_ADDRESS, RPC_URL } = require("../libs/constants");
const  LENS_ABI = require("../abis/lens.json")
// Create an Ethers provider
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);


// Create a contract instance
const siloLens = new ethers.Contract(SILO_LENS, LENS_ABI, provider);

const getMarkets = asyncHandler( async (req, res) => {

      // Function to fetch APRs
async function fetchAPR() {
    try {
      const borrowAPR = await siloLens.getBorrowAPR(SILO__MARKET_ADDRESS);
      const depositAPR = await siloLens.getDepositAPR(SILO__MARKET_ADDRESS);
  
      console.log(`Borrow APR: ${ethers.utils.formatUnits(borrowAPR, 18)}%`);
      console.log(`Deposit APR: ${ethers.utils.formatUnits(depositAPR, 18)}%`);

      const formattetedBorrow = ethers.utils.formatUnits(borrowAPR, 18)
      const formattetedDeposit = ethers.utils.formatUnits(depositAPR, 18)
      const borrowAPRPercentage = parseFloat(formattetedBorrow) * 100;
      const depositAPRPercentage = parseFloat(formattetedDeposit) * 100;
      res.status(200).json({formattetedBorrow, formattetedDeposit, borrowAPRPercentage, depositAPRPercentage})
    } catch (error) {
      console.error("Error fetching APR:", error);
      res.status(400).json({error})
    }
  }

  fetchAPR()
})

module.exports = {
    getMarkets
}