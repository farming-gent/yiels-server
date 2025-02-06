
const express = require("express");
const connectionDb = require("./libs/dbConnection");
const cors = require('cors');
const env = require("dotenv").config();
const session = require("express-session");
const http = require('http');
const cron = require('node-cron');
const {ethers} = require("ethers");
const Silo = require("./models/siloModel");
const  LENS_ABI = require("./abis/lens.json")
const {SILO_LENS, RPC_URL} = require("./libs/constants")
// Create an Ethers provider
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);


// Create a contract instance
const siloLens = new ethers.Contract(SILO_LENS, LENS_ABI, provider);
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

function logMessage() {
  console.log('Cron job executed at:', new Date().toLocaleString());
  }

   const handleAPRupdates = async () =>  {

     try {
const  silos = await Silo.find()
 
for (let silo of silos) {
  // Step 2: Fetch APRs for each market's address
  const borrowAPR = await siloLens.getBorrowAPR(silo.siloAddress);
  const depositAPR = await siloLens.getDepositAPR(silo.siloAddress);

  // Format APRs
  const formattetedBorrow = ethers.utils.formatUnits(borrowAPR, 18);
  const formattetedDeposit = ethers.utils.formatUnits(depositAPR, 18);
  const borrowAPRPercentage = parseFloat(formattetedBorrow) * 100;
  const depositAPRPercentage = parseFloat(formattetedDeposit) * 100;

  // Step 3: Update the Silo or Market document
  // Update the relevant market in the database with the fetched APRs
  await Silo.findOneAndUpdate(
      { siloAddress: silo.siloAddress }, // Find the market by address
      {
          'borrowAPR': borrowAPRPercentage, // For example, update APRs or any other fields you need
          'depositAPR': depositAPRPercentage,
          // Add any other fields you'd like to update here
      }
  );

  console.log(`Updated APRs for market: ${silo.name}`);
}
      
     } catch (error) {
      console.log(error)
     }
   }


  // Schedule the cron job to run every minute
  cron.schedule('0 */10 * * *', () => {
    handleAPRupdates();
  });

connectionDb();

app.use(cors())
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60000 * 60,
  }
}));




app.use("/api/v1/market", require("./routes/markets"));
app.use("/api/v1/silo", require("./routes/siloRoute"));


server.listen(PORT, () => {
  console.log("app started at", PORT);
});



