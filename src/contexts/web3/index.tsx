import { useState, useEffect, createContext } from 'react'
import { Web3ContextData, Web3ProviderData } from './types'
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils';
import NFTMarketplace from '../../contracts/ABI/NFTMarketplace.json'

export const Web3Context = createContext<Web3ContextData>({} as Web3ContextData)

const CONTRACT_ABI = NFTMarketplace as unknown as AbiItem
const CONTRACT_ADDRESS = "0xDcd2F9479e8e609813f95c0B97546F75e6094f38"
//0xEc6Bd8d5cA95a33A561CCf1A26D9793B493e867E

export const Web3Provider = ({ children }: Web3ProviderData) => {
  const [contract, setContract] = useState<Contract>({} as Contract)
  const [loadingContract, setLoadingContract] = useState<boolean>(true)

  useEffect(() => {
    getWeb3()
  }, [])

  const getWeb3 = async () => {
    const newWeb3 = new Web3(`https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`)
    const newContract = new newWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    setContract(newContract)
    setLoadingContract(false)
  }

  return (
    <Web3Context.Provider value={{ contract, loadingContract }}>
      {
        loadingContract ? "loading..." : children
      }
    </Web3Context.Provider>
  )
}