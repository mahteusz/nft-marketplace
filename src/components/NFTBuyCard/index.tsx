import './styles.scss'
//@ts-ignore
import Blockies from 'react-blockies'

const NFTBuyCard = () => {
  return (
    <article className='nft-buy-card'>
      <img
        className='nft-buy-card__image'
        src="https://i.seadn.io/gcs/files/7ee77495430fd7ebe432ac211d8c1634.jpg?auto=format&dpr=1&w=1000" />

      <div className='nft-buy-card__blockies-container'>
        <Blockies seed={'0x6c75cb9336a48cfc4c6ae4d0013a77e3559a99c0'} />
      </div>

      <h1 className='nft-buy-card__name'>Cool NFT's</h1>
      <h2 className='nft-buy-card__price'>0.35 ETH</h2>

      <button className='nft-buy-card__buy'>
        Comprar
      </button>

    </article>
  )
}

export default NFTBuyCard