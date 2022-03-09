import { ethers } from "ethers";
//@ts-ignore
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";
import Hello from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";
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
    Hello.abi, 
     //@ts-ignore
    new ethers.providers.Web3Provider(window.ethereum)
  );

  const counter = new ethers.Contract(
    "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853", 
    Counter.abi,
    //@ts-ignore
    new ethers.providers.Web3Provider(window.ethereum).getSigner()
  );

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

  counter.on(counter.filters.CounterInc(), function(count) {
    newDiv.textContent = count;
  });

  const helloContractText = document.createElement('p');
  helloContractText.textContent = await hello.hello();
  

  document.body.append(helloContractText);
  document.body.append(newDiv);

  button.textContent = "Increment Count"
  document.body.append(button);
}

run();