
const RPC_URL = "https://rpc.soniclabs.com"
const SILO__MARKET_ADDRESS = "0xE223C8e92AA91e966CA31d5C6590fF7167E25801"
const SILO_LENS = "0xE05966aee69CeCD677a30f469812Ced650cE3b5E"

// ABI for the SiloLens contract (only the APR functions)
const SILO_LENS_ABI = [
    "function getBorrowAPR(address _silo) external view returns (uint256)",
    "function getDepositAPR(address _silo) external view returns (uint256)"
  ];

module.exports = {
    RPC_URL,
    SILO_LENS,
    SILO__MARKET_ADDRESS,
    SILO_LENS_ABI
}
