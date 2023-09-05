import { Header, Offers } from '../../components'
import './styles.scss'

const Explore = () => {

  return (
    <div className='explore'>
      <Header />
      <div className='explore__content'>
        <h1 className='explore__title'>
          Explore os NFTs à venda e compre um agora mesmo!
        </h1>
        <Offers />
      </div>
    </div>
  )
}

export default Explore