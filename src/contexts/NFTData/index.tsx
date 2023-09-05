import { useState, createContext, useEffect } from 'react'
import { NFTData, NFT, NFTContextData, NFTProviderData, Offer } from './types'
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils';
import NFTMarketplace from '../../contracts/ABI/NFTMarketplace.json'
import { CONTRACT_ADDRESS } from '../../util/contracts';
import getDataByCID, { IPFSData, getImageByCID } from '../../util/getTokenData';

const CONTRACT_ABI = NFTMarketplace as unknown as AbiItem
const ADDRESS_0 = "0x0000000000000000000000000000000000000000"

export const NFTContext = createContext<NFTContextData>(
  {} as NFTContextData
)

export const NFTProvider = ({ children }: NFTProviderData) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [contract, setContract] = useState<Contract>({} as Contract)

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    getAll()
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
        from: ADDRESS_0
      },
      fromBlock: 0
    })

    transfers.forEach(transfer => {
      tokens.push(transfer.returnValues.tokenId)
    })

    return tokens
  }

  const getOwners = async (tokens: string[]) => {
    const promises: Promise<string>[] = []
    tokens.forEach(token => {
      promises.push(contract.methods.ownerOf(token).call())
    })

    const owners = await Promise.all(promises)
    return owners
  }

  const getUris = async (tokens: string[]) => {
    const promises: Promise<string>[] = []
    tokens.forEach(token => {
      promises.push(contract.methods.tokenURI(token).call())
    })

    const uris = await Promise.all(promises)
    return uris
  }

  const getTokenMetadata = async (uri: string) => {
    const metadata = await getDataByCID(uri)
    const img = await getImageByCID(metadata.image['/'])
    return {
      metadata,
      img
    }
  }

  const getData = async (tokens: string[], uris: string[], owners: string[]) => {
    const nftsData: NFTData[] = []
    tokens.forEach((token, index) => {
      nftsData.push({
        token,
        uri: uris[index],
        owner: owners[index]
      })
    })

    return nftsData
  }

  const getMetadata = async (tokens: string[], uris: string[]) => {
    const promises: Promise<{ metadata: IPFSData, img: string }>[] = []
    tokens.forEach((_, index) => {
      promises.push(getTokenMetadata(uris[index]))
    })

    const metadata = await Promise.all(promises)
    return metadata
  }


  const getAll = async () => {
    if (!contract) return

    const tokens = await getTokens()
    const uris = await getUris(tokens)
    const owners = await getOwners(tokens)
    const nftsData = await getData(tokens, uris, owners)
    const nftsMetadata = await getMetadata(tokens, uris)
    const newNfts: NFT[] = []

    tokens.forEach((_, index) => {
      const metadata = nftsMetadata[index].metadata
      const img = nftsMetadata[index].img
      newNfts.push({
        data: nftsData[index],
        metadata: {
          attributes: metadata.attributes,
          description: metadata.description,
          name: metadata.name,
          image: img,
        }
      })
    })

    setNfts(newNfts)
  }

  const getSelling = async () => {
    const promises: Promise<Offer>[] = []
    nfts.forEach(nft => {
      promises.push(contract.methods.offers(nft.data.token).call())
    })

    const offers = await Promise.all(promises)
    const nftsInOffer: NFT[] = []
    offers.forEach((offer, index) => {
      if (!offer.finished && offer.creator != ADDRESS_0) {
        nftsInOffer.push(nfts[index])
      }
    })

    return nftsInOffer
  }

  const getNftsOf = async (owner: string) => {
    const owned = nfts.filter(nft => {
      nft.data.owner == owner
    })
    return owned
  }

  const refresh = async () => {
    await getAll()
  }


  return (
    <NFTContext.Provider value={{ nfts, getSelling, getNftsOf, refresh }}>
      {children}
    </NFTContext.Provider>
  )
}
