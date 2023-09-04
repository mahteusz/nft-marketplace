import './styles.scss'
import { Props } from './types'
//@ts-ignore
import Blockies from 'react-blockies'

const NFTBuyCard = ({img, name, price, owner}: Props) => {
  return (
    <article className='nft-buy-card'>
      <img
        className='nft-buy-card__image'
        src={img} />

      <div className='nft-buy-card__blockies-container'>
        <Blockies seed={owner} />
      </div>

      <h1 className='nft-buy-card__name'>{name}</h1>
      <h2 className='nft-buy-card__price'>{price} ETH</h2>

      <button className='nft-buy-card__buy'>
        Comprar
      </button>

    </article>
  )
}

export default NFTBuyCard