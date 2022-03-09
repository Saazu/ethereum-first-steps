import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const counterContract = await Counter.deploy();
  await counterContract.deployed();
  return counterContract;
}

async function countThenReturnCount(counterContract) {
  await counterContract.count();
  console.log("Counting...");
  console.log("New number is: ", await counterContract.getCount());
}

deploy().then(countThenReturnCount);