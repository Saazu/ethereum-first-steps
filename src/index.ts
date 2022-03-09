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
    throw new Error("There was an issue requesting accounts. Please refresh your window and ensure you have Metamask installed")
  }
 
  //the address is one from a network run locally via: npm hardhat node
  const hello = new ethers.Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3", 
    [
      "function hello() public pure returns (string memory)"
    ], 
     //@ts-ignore
    new ethers.providers.Web3Provider(window.ethereum)
  );

  const counter = new ethers.Contract(
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512", 
    [
      "function count () public",
      "function getCount () public view returns (uint256)"
    ],
    //@ts-ignore
    new ethers.providers.Web3Provider(window.ethereum).getSigner()
  );

  console.log("Hi",counter);

  const newDiv = document.createElement('div');
  newDiv.textContent = await counter.getCount();

  const button = document.createElement('button');
  button.onclick = async function () {
    try {
      await counter.count();
    } catch {
      window.alert("You need to use a wallet with sufficient funds");
    }
    
    newDiv.textContent = await counter.getCount();
  }
  const helloContractText = document.createElement('p');
  helloContractText.textContent = await hello.hello();
  

  document.body.append(helloContractText);
  document.body.append(newDiv);

  button.textContent = "Increment Count"
  document.body.append(button);
}

run();