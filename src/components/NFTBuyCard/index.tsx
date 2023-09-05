import { useNavigate } from 'react-router-dom'
import { useNFTWrite } from '../../contexts/NFTWrite/useNFTWrite'
import { areAddressesEqual } from '../../util/compareAddress'
import './styles.scss'
import { Props } from './types'
//@ts-ignore
import Blockies from 'react-blockies'

const NFTBuyCard = ({ img, token, name, price, owner }: Props) => {

  const nftWrite = useNFTWrite()
  const navigate = useNavigate()

  return (
    <article className='nft-buy-card'>
      <img
        className='nft-buy-card__image'
        src={img} />

      <div className='nft-buy-card__blockies-container'>
        <Blockies seed={owner.toLowerCase()} />
      </div>

      <h1 className='nft-buy-card__name'>{name}</h1>
      <h2 className='nft-buy-card__price'>{price} ETH</h2>

      <button 
        className='nft-buy-card__buy'
        disabled={areAddressesEqual(nftWrite.connectedWallet, owner)}
        onClick={() => navigate(`/nft/${token}`)}
      >
        {areAddressesEqual(nftWrite.connectedWallet, owner) ? 'Adquirido' : 'Comprar'}
      </button>

    </article>
  )
}

export default NFTBuyCard