import { useState, createContext, useEffect } from 'react'
import { NFTWriteContextData, NFTWriteProviderData } from './types'
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import NFTMarketplace from '../../contracts/ABI/NFTMarketplace.json'
import { AbiItem } from 'web3-utils';
import { CONTRACT_ADDRESS } from '../../util/contracts';
import { Loading } from '../../pages'
import { useNFTData } from '../NFTData/useNFTData'

const CONTRACT_ABI = NFTMarketplace as unknown as AbiItem

export const NFTWriteContext = createContext<NFTWriteContextData>(
  {} as NFTWriteContextData
)

export const NFTWriteProvider = ({ children }: NFTWriteProviderData) => {
  const [connectedWallet, setConnectedWallet] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [contract, setContract] = useState<Contract>({} as Contract)
  const [loading, setLoading] = useState<boolean>(true)

  const nftData = useNFTData()

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
    setLoading(false)
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

  const createOffer = async (token: number, price: number) => {
    const pow = Math.pow(10, 18)
    const priceInWei = price * pow      //Converting from eth to wei

    try {
      await contract.methods.createOffer(token, priceInWei.toString()).send({
        from: connectedWallet
      })
      nftData.refresh()
    } catch (err) {
      console.warn(err)
    }
  }

  const finishOffer = async (token: number) => {
    try {
      await contract.methods.finishOffer(token).send({
        from: connectedWallet
      })
      nftData.refresh()
    } catch (err) {
      console.warn(err)
    }
  }

  const buy = async (token: number, price: number) => {
    const pow = Math.pow(10, 18)
    const priceInWei = price * pow      //Converting from eth to wei
    try {
      await contract.methods.buy(token).send({
        from: connectedWallet,
        value: priceInWei
      })
      nftData.refresh()
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <NFTWriteContext.Provider
      value={{ connectedWallet, error, connect, loading, create, createOffer, finishOffer, buy }}
    >
      {loading ? <Loading /> : children}
    </NFTWriteContext.Provider>
  )
}