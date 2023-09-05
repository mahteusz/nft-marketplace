import './styles.scss'
import { minifyWalletAddress } from '../utils'
import { MdOutlineDescription, MdOutlineStarOutline, MdHistory } from 'react-icons/md'

const NFTData = () => {
  return (
    <main className='nft-data'>
      <div className='nft-data__card'>
        <img
          className='nft-data__image'
          src="https://static.vecteezy.com/system/resources/previews/005/728/775/original/astronaut-carrying-bitcoin-cryptocurrency-coin-cute-cartoon-icon-illustration-vector.jpg"
        />

        <span className='nft-data__owner'>
          Dono: {minifyWalletAddress("0x6C75Cb9336A48cfc4c6Ae4D0013a77e3559A99C0")}
        </span>

        <h1 className='nft-data__name'>
          Cool Characters #3
        </h1>

        <h2 className='nft-data__price'>
          1 ETH
        </h2>

        <button className='nft-data__buy'>
          Comprar
        </button>
      </div>

      <div className='nft-data__container'>
        <div className='nft-data__container-title-container'>
          <MdOutlineDescription className='nft-data__container-icon' />
          <h1 className='nft-data__container-title'>
            Descrição
          </h1>
        </div>
        <div className='divider'></div>
        <span className='nft-data__container-content'>
          Esta é a "Cool Characters" - Uma coleção única de NFTs que dá vida a vários personagens
          com características diferentes e legais! Prepare-se para embarcar em uma jornada colorida
          e mágica, onde personagens cativantes ganham vida através da arte digital.
        </span>
      </div>

      <div className='nft-data__container'>
        <div className='nft-data__container-title-container'>
          <MdOutlineStarOutline className='nft-data__container-icon' />
          <h1 className='nft-data__container-title'>
            Atributos
          </h1>
        </div>
        <div className='divider'></div>
        <div className='nft-data__container-content-container'>
          <span className='nft-data__container-content'>
            character: astronaut
          </span>
          <span className='nft-data__container-content'>
            background: pink
          </span>
          <span className='nft-data__container-content'>
            item: bitcoin
          </span>
        </div>
      </div>

      <div className='nft-data__container'>
        <div className='nft-data__container-title-container'>
          <MdHistory className='nft-data__container-icon' />
          <h1 className='nft-data__container-title'>
            Histórico
          </h1>
        </div>
        <div className='divider'></div>
        <div className='nft-data__container-content-container'>
          <span className='nft-data__container-content'>
            Criado por 0x6C7...99C0
          </span>
          <span className='nft-data__container-content'>
            Vendido para 0x7B3...51A2 por 0.5 ETH
          </span>
        </div>
      </div>
    </main>
  )
}

export default NFTData