import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Messenger from './artifacts/contracts/Messenger.sol/Messenger.json';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

function App() {
  //! Rainbow Kit


  const [message, setMessage] = useState();

  useEffect(() => {
    fetchMessage();
  }, [])

  //! fetching accounts
  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  async function fetchMessage() {
    //! Checking wallet connection
    if(typeof window.ethereum != 'undefined') {
      //! fetching web3 provider + contract instantiation (no signer needed for a getter)
      const [address] = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractInstance = new ethers.Contract(contractAddress, Messenger.abi, provider);

      //! using of a public getter function
      try{
        console.log(contractInstance)
        const data = await contractInstance.getMessage();
        console.log(data)
        setMessage(data);
      }
      catch(err) {
        console.log(err);
      }

    }
  }

  async function messageSetter() {
    if (!message) return
    //! Checking wallet connection
    if(typeof window.ethereum != 'undefined') {
      //! fetching accounts and web3 provider + contract instantiation
      //! (signer needed for a tetting transaction)
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, Messenger.abi, signer);

      //! using of a public setter function (transaction will need a wallet confirmation)
      const transaction = await contractInstance.setMessage(message);
      setMessage('');
      await transaction.wait();
      fetchMessage();
    }
  }

  return (
    <div className="App">
      <p>{message}</p>
      <input onChange={e => setMessage(e.target.value)} placeholder='Enter a message'/>
      <button onClick={messageSetter}>Set greeting</button>
      <ConnectButton />
    </div>
  );
}

export default App;
