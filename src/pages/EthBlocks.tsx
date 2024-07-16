import { useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';

function EthBlocks() {
  const [lastetBlock, setLastetBlock] = useState(undefined)
  const [wallets, setWallets] = useState(undefined)
  const provider = useMemo(() => {
    var provider = "https://mainnet.infura.io/v3/a4c43d09c9dd4d839563aaf3ff722a6d";
    var web3Provider = new Web3.providers.HttpProvider(provider);
    return web3Provider
  }, [])
  async function getBlock() {
    let block = await new Web3(provider).eth.getBlock('latest')
    setLastetBlock(block)
  }
  useEffect(() => {
    getBlock()
  }, [])
  async function gethTxData(txHash: string) {
    try {
      const tx = await (new Web3(provider) as any).eth.getTransaction(txHash);
      console.log("RES: ", tx)
      setWallets({ from: tx?.from, to: tx?.to })
      // const inputData = tx.input.slice(10);
      // console.log("IN: ", inputData)
      // const decodedParams = new Web3(provider).eth.abi.decodeParameters(ABI, inputData);

      // console.log('Decoded Parameters:', decodedParams);
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='eth blockData'>
      <strong>{"BLOCK NUM: " + (lastetBlock?.number || "LOADING")}</strong>
      <div className="wallets">
        <div className="walletAddress">From: {wallets && < a target='_blank' href={"https://etherscan.io/address/" + wallets.from}>{wallets?.from || ""}</a>}</div>
        <div className="walletAddress">to: {wallets && < a target='_blank' href={"https://etherscan.io/address/" + wallets.to}>{wallets?.to || ""}</a>}</div>
      </div>
      <div className="transactions">
        {lastetBlock?.transactions?.map((txHash) => {
          return <div className='txHash' onClick={() => {
            gethTxData(txHash)
          }}>{txHash}</div>
        })}
      </div>
    </div>
  )
}

export default EthBlocks