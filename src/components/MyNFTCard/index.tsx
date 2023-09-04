import './styles.scss'
import { Props } from './types'

const MyNFTCard = ({ img, name }: Props) => {
  return (
    <article className='my-nft-card'>
      <img
        className='my-nft-card__image'
        src={img}
      />

      <h1 className='my-nft-card__name'>{name}</h1>

      <button className='my-nft-card__sell'>
        Colocar à venda
      </button>
    </article>
  )
}

export default MyNFTCard