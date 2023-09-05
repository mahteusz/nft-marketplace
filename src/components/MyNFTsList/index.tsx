import './styles.scss'
import { useNFTData } from '../../contexts/NFTData/useNFTData'
import { MyNFTCard } from '..'
import { useState, useEffect } from 'react'
import { NFT } from '../../contexts/NFTData/types'
import { useNFTWrite } from '../../contexts/NFTWrite/useNFTWrite'

const MyNFTsList = () => {
  const [nfts, setNfts] = useState<NFT[]>([])

  const nftsData = useNFTData()
  const nftsWrite = useNFTWrite()

  useEffect(() => {
    getMyNfts()
  }, [nftsData.nfts])

  const getMyNfts = async () => {
    const mine = await nftsData.getNftsOf(nftsWrite.connectedWallet)
    setNfts(mine)
  }

  return (
    <main className='my-nfts'>
      {
        nfts.length ?
          nfts.map(nft => {
            return (
              <MyNFTCard
                token={nft.data.token}
                img={nft.metadata.image}
                name={nft.metadata.name}
                key={nft.data.token}
                selling={nft.offer.price > 0 && !nft.offer.finished}
              />
            )
          })
          :
          <h1 className='my-nfts__mesage'>Você ainda não possui nenhum NFT.</h1>
      }
    </main>
  )
}

export default MyNFTsList