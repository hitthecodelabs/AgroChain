import React from 'react'
import Web3 from 'web3';

function ConnectButton() {
  const handleClick = () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    web3.eth.getAccounts()
      .then(accounts => {
        console.log(accounts[0]); // imprime la dirección de la billetera de Metamask
      });
  }

  return (
    <button onClick={handleClick}>Conectar con Metamask</button>
  );
}


export default ConnectButton