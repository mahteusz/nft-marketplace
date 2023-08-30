import { useState, createContext, useEffect } from 'react'
import { NFTData, NFTMarketplaceContextData, NFTMarketplaceProviderData } from './types'
import { useWeb3 } from '../web3/useWeb3'

export const NFTMarketplaceContext = createContext<NFTMarketplaceContextData>(
  {} as NFTMarketplaceContextData
)

export const NFTMarketplaceProvider = ({ children }: NFTMarketplaceProviderData) => {
  const [nfts, setNfts] = useState<NFTData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const web3 = useWeb3()

  useEffect(() => {
    getAllNfts()
  }, [])

  const getTokens = async () => {
    const tokens: string[] = []
    const transfers = await web3.contract.getPastEvents("Transfer", {
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
      promises.push(web3.contract.methods.ownerOf(token).call())
    })

    const owners = await Promise.all(promises)
    return owners
  }

  const getTokensUri = async (tokens: string[]) => {
    const promises: Promise<string>[] = []
    tokens.forEach(token => {
      promises.push(web3.contract.methods.tokenURI(token).call())
    })

    const uris = await Promise.all(promises)
    return uris
  }

  const getAllNfts = async () => {
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
    setLoading(false)
  }

  return (
    <NFTMarketplaceContext.Provider value={{ nfts, loading }}>
      {loading ? null : children}
    </NFTMarketplaceContext.Provider>
  )
}