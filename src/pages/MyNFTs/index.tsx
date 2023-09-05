import './styles.scss'
import { Header, MyNFTsList } from '../../components'

const MyNFTs = () => {
  return (
    <div className='my-nfts-container'>
      <Header />
      <MyNFTsList />
    </div>
  )
}

export default MyNFTs