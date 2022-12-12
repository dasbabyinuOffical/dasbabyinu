import {ethers } from "ethers";
import moment from "moment";
import rewardAbi from "../config/abi/Reward.json";
import { getDecimalOf,getLatestBlock,approve,getSymbol,getBlock} from "./wallet";

const RewardContract = "0xA6F76D1d583b8652e26f2984680259F82E0512c9";
declare var window: any;

export interface Reward{
  id: number,
  depositSymbol:string,
  rewardSymbol: string,
  supply:string,
  depositAmount: string,
  amount:string,
  reward:string,
  totalRewardPerDay:string,
  rewardPerDay:string,
  startTime:string,
  endTime:string
}

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

  const  gas = await daiContractWithSigner.estimateGas.createPool(depositToken,rewardToken,amount,endBlock);
  const tx = await daiContractWithSigner.createPool(depositToken,rewardToken,amount,endBlock,{
    gasLimit: gas,
  });

  tx.wait();
  return tx.hash;
}

export async function Rewards(poolId:number):Promise<Reward>{
  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);
  const sender =  localStorage.getItem("account");

  const pid = ethers.BigNumber.from(poolId);
  const pool = await daiContractWithSigner.pools(pid);

  const user = await daiContractWithSigner.users(sender,pid);

  const rewardDecimal  = await getDecimalOf(pool.rewardToken);

  const userReward = await daiContractWithSigner.rewards(pid);

  const depositSymbol = await getSymbol(pool.depositToken);

  const rewardSymbol = await getSymbol(pool.rewardToken);

  let rewardPerDay = ethers.BigNumber.from(0);
  if(pool.depositAmount > 0){
    rewardPerDay = ethers.BigNumber.from(user.amount).mul(ethers.BigNumber.from(pool.rewardPerBlock)).mul(ethers.BigNumber.from(3*3600*24)).div(ethers.BigNumber.from(pool.depositAmount));  
  }
  let totalRewardPerDay = ethers.BigNumber.from(pool.rewardPerBlock).mul(ethers.BigNumber.from(3*3600*24));

  const startBlock = await getBlock(pool.startBlock.toNumber());
  const startTime = moment(startBlock.timestamp*1000).format("YYYY-MM-DD HH:mm:ss"); 

  const endTimestamp = startBlock.timestamp+(pool.endBlock.toNumber()-pool.startBlock.toNumber())*3;
  const endTime = moment(endTimestamp*1000).format("YYYY-MM-DD HH:mm:ss"); 

  console.log("start block:",pool.startBlock.toNumber(),startBlock.timestamp);

  const reward:Reward = {
    id : poolId,
    depositSymbol:depositSymbol,
    rewardSymbol: rewardSymbol, 
    supply:ethers.utils.formatUnits(pool.supply,rewardDecimal),
    depositAmount:  ethers.utils.formatUnits(pool.depositAmount,pool.depositTokenDecimal),
    amount: ethers.utils.formatUnits(user.amount,pool.depositTokenDecimal),
    reward: ethers.utils.formatUnits(userReward,rewardDecimal),
    totalRewardPerDay:  ethers.utils.formatUnits(totalRewardPerDay,rewardDecimal),
    rewardPerDay: ethers.utils.formatUnits(rewardPerDay,rewardDecimal),
    startTime:startTime,
    endTime:endTime,
  };
  return reward;
}

export async function PoolId():Promise<number>{
  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  const poolId = daiContractWithSigner.poolId();
  return poolId;
}

export async function Stake(pid:number,token:string,amount:number):Promise<string>{
  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  const decimal = await getDecimalOf(token);
  const depositAmount = ethers.BigNumber.from(amount).mul(ethers.BigNumber.from(10).pow(decimal));

  //approve first
  const approveStatus = await approve(token,RewardContract,depositAmount);
  if (approveStatus === false){
    return "failed to approve."
  }

  const gas = await daiContractWithSigner.estimateGas.deposit(ethers.BigNumber.from(pid),token,depositAmount);
  const tx =  await daiContractWithSigner.deposit(ethers.BigNumber.from(pid),token,depositAmount,{
    gasLimit:gas,
  });

  await tx.wait();
  return tx.hash;
}

export async function Reedem(pid:number):Promise<string>{
  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  const gas = await daiContractWithSigner.estimateGas.withdrawAll(ethers.BigNumber.from(pid));
  const tx  = await daiContractWithSigner.withdrawAll(ethers.BigNumber.from(pid),{
    gasLimit:gas,
  });

  await tx.wait();
  return tx.hash;
}

export async function Take(pid:number):Promise<string>{
  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  const gas = await daiContractWithSigner.estimateGas.emergencyWithdrawAll(ethers.BigNumber.from(pid));
  const tx  = await daiContractWithSigner.emergencyWithdrawAll(ethers.BigNumber.from(pid),{
    gasLimit:gas,
  });

  await tx.wait();
  return tx.hash;
}


export async function Claim(pid:number):Promise<string>{
  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  const daiContract = new ethers.Contract(RewardContract, rewardAbi, providerWeb3);
  const signer = providerWeb3.getSigner();
  const daiContractWithSigner = daiContract.connect(signer);

  const gas = await daiContractWithSigner.estimateGas.claimRewards(ethers.BigNumber.from(pid));
  const tx  = await daiContractWithSigner.claimRewards(ethers.BigNumber.from(pid),{
    gasLimit:gas,
  });

  tx.wait();
  return tx.hash;
}