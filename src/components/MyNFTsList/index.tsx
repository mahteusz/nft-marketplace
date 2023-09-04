import './styles.scss'
import { useNFTData } from '../../contexts/NFTData/useNFTData'
import { MyNFTCard } from '..'

const MyNFTsList = () => {

  const { nfts } = useNFTData()

  return (
    <main className='my-nfts'>
      {
        nfts.map(nft => {
          return (
            <MyNFTCard
              img={nft.metadata.image}
              name={nft.metadata.name}
              key={nft.data.token}
            />
          )
        })
      }
    </main>
  )
}

export default MyNFTsList