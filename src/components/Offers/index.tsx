import { NFTBuyCard } from '..';
import { useNFTData } from '../../contexts/NFTData/useNFTData';
import './styles.scss';
import { useState, useEffect } from 'react'
import { NFT } from '../../contexts/NFTData/types'

const Offers = () => {
  const [nfts, setNfts] = useState<NFT[]>([])

  const nftsData = useNFTData()

  useEffect(() => {
    getSellingsNfts()
  }, [nftsData.nfts])

  const getSellingsNfts = async () => {
    const sellings = await nftsData.getSelling()
    setNfts(sellings)
  }

  return (
    <main className='offers'>
      {
        nfts.length ?
        nfts.map(nft => {
          return ( 
            <NFTBuyCard
              token={nft.data.token}
              img={nft.metadata.image}
              owner={nft.data.owner}
              name={nft.metadata.name}
              price={nft.offer.price}
              key={nft.data.token}
            />
          )
        })
        :
        <h1 className='offers__mesage'>Nenhum NFT à venda no momento.</h1>
      }
    </main>
  )
}

export default Offers