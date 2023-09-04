import { useState, createContext, useEffect } from 'react'
import { NFTWriteContextData, NFTWriteProviderData } from './types'
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import NFTMarketplace from '../../contracts/ABI/NFTMarketplace.json'
import { AbiItem } from 'web3-utils';

const CONTRACT_ABI = NFTMarketplace as unknown as AbiItem
const CONTRACT_ADDRESS = "0xDcd2F9479e8e609813f95c0B97546F75e6094f38"

export const NFTWriteContext = createContext<NFTWriteContextData>(
  {} as NFTWriteContextData
)

export const NFTWriteProvider = ({ children }: NFTWriteProviderData) => {
  const [connectedWallet, setConnectedWallet] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [contract, setContract] = useState<Contract>({} as Contract)

  useEffect(() => {
    if (!window.ethereum) return setError("Por favor, instale o Metamask")

    setWallet(window.ethereum._state.accounts)
    window.ethereum.on('accountsChanged', setWallet);

    return () => {
      window.ethereum.removeListener('accountsChanged', setWallet);
    }
  }, [])

  useEffect(() => {
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    setContract(contract)
  }, [connectedWallet])

  const connect = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  const setWallet = async (accounts: string[]) => {
    if (!accounts || !accounts.length) return clearWallet()

    setConnectedWallet(accounts[0])
  }

  const clearWallet = async () => {
    setConnectedWallet('')
  }

  const create = async (uri: string) => {
    const nft = await contract.methods.create(connectedWallet, uri).send({
      from: connectedWallet
    })
    console.log(nft)
  }

  return (
    <NFTWriteContext.Provider value={{ connectedWallet, error, connect, create }}>
      {children}
    </NFTWriteContext.Provider>
  )
}