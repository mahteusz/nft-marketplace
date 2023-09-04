import { NFTBuyCard } from '..';
import { useNFTData } from '../../contexts/NFTData/useNFTData';
import './styles.scss';

const Offers = () => {
  const { nfts } = useNFTData()
  return (
    <main className='offers'>
      {
        nfts.map(nft => {
          return ( 
            <NFTBuyCard
              img={nft.metadata.image}
              owner={nft.data.owner}
              name={nft.metadata.name}
              price='50'
              key={nft.data.token}
            />
          )
        })
      }
    </main>
  )
}

export default Offers