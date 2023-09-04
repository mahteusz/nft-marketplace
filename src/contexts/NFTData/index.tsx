import { useState, createContext, useEffect } from 'react'
import { NFTData, NFTContextData, NFTProviderData } from './types'
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils';
import NFTMarketplace from '../../contracts/ABI/NFTMarketplace.json'
import { CONTRACT_ADDRESS } from '../../util/contracts';

const CONTRACT_ABI = NFTMarketplace as unknown as AbiItem

export const NFTContext = createContext<NFTContextData>(
  {} as NFTContextData
)

export const NFTProvider = ({ children }: NFTProviderData) => {
  const [nfts, setNfts] = useState<NFTData[]>([])
  const [contract, setContract] = useState<Contract>({} as Contract)

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    getAllNfts()
  }, [contract])

  const init = () => {
    const newWeb3 = new Web3(`https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`)
    const newContract = new newWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    setContract(newContract)
  }

  const getTokens = async () => {    
    const tokens: string[] = []
    const transfers = await contract?.getPastEvents("Transfer", {
      filter: {
        from: "0x0000000000000000000000000000000000000000"
      },
      fromBlock: 0
    })

    transfers.forEach(transfer => {
      tokens.push(transfer.returnValues.tokenId)
    })

    return tokens
  }

  const getTokensOwners = async (tokens: string[]) => {
    const promises: Promise<string>[] = []
    tokens.forEach(token => {
      promises.push(contract.methods.ownerOf(token).call())
    })

    const owners = await Promise.all(promises)
    return owners
  }

  const getTokensUri = async (tokens: string[]) => {
    const promises: Promise<string>[] = []
    tokens.forEach(token => {
      promises.push(contract.methods.tokenURI(token).call())
    })

    const uris = await Promise.all(promises)
    return uris
  }

  const getAllNfts = async () => {
    if(!contract) return

    const tokens = await getTokens()
    const uris = await getTokensUri(tokens)
    const owners = await getTokensOwners(tokens)
    const nfts: NFTData[] = []
    tokens.forEach((token, index) => {
      nfts.push({
        token,
        uri: uris[index],
        owner: owners[index]
      })
    })

    setNfts(nfts)
  }

  return (
    <NFTContext.Provider value={{ nfts }}>
      {children}
    </NFTContext.Provider>
  )


}
