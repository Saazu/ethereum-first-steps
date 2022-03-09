import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloContract = await HelloWorld.deploy();
  await helloContract.deployed();
  return helloContract;
}

//@ts-ignore
async function sayHello(helloContract) {
  console.log("Say hello: ", await helloContract.hello());
}

deploy().then(sayHello);