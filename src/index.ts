import { ethers } from "ethers";

// Connecting to metamask

//for some reason, passing the object returned by this function does not work
//will investigate
async function getEth() {
  //@ts-ignore
  const eth = window.ethereum;
  if (!eth) {
    throw new Error ("No Metamask installed");
  }
  return eth;
}

async function hasAccounts() {
  //@ts-ignore
  const accounts = await window.ethereum.request({ method: "eth_accounts"}) as string[];
  return accounts && accounts.length > 0;
}

async function requestAccounts() {
  //@ts-ignore
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts"}) as string[];
  return accounts && accounts.length > 0;
}

async function run() {
  if (!await hasAccounts() && !await requestAccounts()) {
    throw new Error("There was an issue requesting accounts. Please refresh your window.")
  }
 
  //the address is one from a network run locally via: npm hardhat node
  const hello = new ethers.Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3", 
    [
      "function hello() public pure returns (string memory)"
    ], 
     //@ts-ignore
    new ethers.providers.Web3Provider(window.ethereum)
  )
  document.body.innerHTML = await hello.hello();
}

run();