import './styles.scss'
import { useState, useEffect } from 'react'
import { minifyWalletAddress } from '../utils'
import { MdOutlineDescription, MdOutlineStarOutline, MdHistory } from 'react-icons/md'
import { Props } from './types'
import { useNFTData } from '../../contexts/NFTData/useNFTData'
import { useNFTWrite } from '../../contexts/NFTWrite/useNFTWrite'
import { areAddressesEqual } from '../../util/compareAddress'
import { HistoryData } from '../../contexts/NFTData/types'
import { fromWeiToEther } from '../../util/ether'

const NFTData = ({ nft }: Props) => {
  const [history, setHistory] = useState<HistoryData>()

  const nftData = useNFTData()
  const nftWrite = useNFTWrite()

  useEffect(() => {
    getHistory()
  }, [nftData.nfts])

  const getHistory = async () => {
    const tokenHistory = await nftData.getHistory(nft.data.token)
    setHistory(tokenHistory)
  }

  return (
    <main className='nft-data'>
      <div className='nft-data__card'>
        <img
          className='nft-data__image'
          src={nft.metadata.image}
        />

        <span className='nft-data__owner'>
          Dono: {minifyWalletAddress(nft.data.owner)}
        </span>

        <h1 className='nft-data__name'>
          {nft.metadata.name}
        </h1>

        <h2 className='nft-data__price'>
          {nft.offer.price}
        </h2>

        {
          !areAddressesEqual(nftWrite.connectedWallet, nft.data.owner) &&
          <button
            className='nft-data__buy'
            onClick={() => nftWrite.buy(nft.data.token, nft.offer.price)}
          >
            Comprar
          </button>
        }
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
          {nft.metadata.description}
        </span>
      </div>

      {
        nft.metadata.attributes.length &&
        <div className='nft-data__container'>
          <div className='nft-data__container-title-container'>
            <MdOutlineStarOutline className='nft-data__container-icon' />
            <h1 className='nft-data__container-title'>
              Atributos
            </h1>
          </div>
          <div className='divider'></div>
          <div className='nft-data__container-content-container'>
            {
              nft.metadata.attributes.map(attribute => {
                return (
                  <span className='nft-data__container-content'>
                    {`${attribute['trait_type']}: ${attribute['value']}`}
                  </span>
                )
              })
            }
          </div>
        </div>
      }

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
            {`Criado por ${minifyWalletAddress(history?.creator ?? "")}`}
          </span>
          {
            history?.sales.map(sale => {
              return (
                <span className='nft-data__container-content'>
                  {
                    `Vendido de ${minifyWalletAddress(sale.from)}
                     para ${minifyWalletAddress(sale.to)} por ${fromWeiToEther(sale.price)} ETH`
                  }
                </span>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

export default NFTData