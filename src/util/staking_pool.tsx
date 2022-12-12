import { ethers } from "ethers";
import rewardAbi from "../config/abi/Reward.json";
import { getDecimalOf,getLatestBlock,approve } from "./wallet";

const RewardContract = "0xA6F76D1d583b8652e26f2984680259F82E0512c9";
declare var window: any;

export async function CreatePool(depositToken:string,rewardToken:string,rewardAmount:string,endTimestamp:number):Promise<string>{
   if (!window.ethereum) {
    return "0";
  }

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  // decimal
  const decimal = await getDecimalOf(rewardToken);
  const amount = ethers.utils.parseUnits(rewardAmount, decimal);

  // block
  const block = await getLatestBlock();
  const endBlock = ethers.BigNumber.from(Math.round(block.number + (endTimestamp - block.timestamp)/3));
  

  //approve first
  const approveStatus = await approve(rewardToken,RewardContract,amount);
  if (approveStatus === false){
    return "failed to approve."
  }

  console.log("contract create pool:",depositToken,rewardToken,amount,endBlock);
  const  gas = await daiContractWithSigner.estimateGas.createPool(depositToken,rewardToken,amount,endBlock);
  console.log("gas is:",gas);
  const tx = await daiContractWithSigner.createPool(depositToken,rewardToken,amount,endBlock,{
    gasLimit: gas,
  });

  tx.wait();
  return tx.hash;
}