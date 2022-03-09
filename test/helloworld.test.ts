import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect} from "chai";

describe("Hello World", function () {
  it("Should say Hello World", async function () {
    //setup
    //deploy
    //test
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed();
    expect(await hello.hello()).to.equal("Hello World");
  });
});