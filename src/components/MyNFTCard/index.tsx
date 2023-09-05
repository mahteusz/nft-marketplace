import './styles.scss'
import { useState } from 'react'
import { useNFTWrite } from '../../contexts/NFTWrite/useNFTWrite'
import { Props } from './types'
import { Modal } from '..'
import { useNFTData } from '../../contexts/NFTData/useNFTData'

const MyNFTCard = ({ token, img, name, selling, price }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const nftData = useNFTData()
  const nftWrite = useNFTWrite()

  const handleFinishOffer = async (token: number) => {
    setOpenModal(true)
    await nftWrite.finishOffer(token)
    await nftData.refresh()
    setOpenModal(false)
  }

  return (
    <article className='my-nft-card'>
      <Modal open={openModal}>
        <h1 className='step-text'>
          Aguardando a transação se completar. Utilize o Metamask e aguarde alguns segundos...
        </h1>
      </Modal>
      <img
        className='my-nft-card__image'
        src={img}
      />

      <h1 className='my-nft-card__name'>{name}</h1>
      {
        selling && <h2 className='my-nft-card__price'>{price} ETH</h2>
      }

      {
        selling ?
          <button className='my-nft-card__cancel-offer' onClick={() => handleFinishOffer(token)}>
            Cancelar venda
          </button>
          :
          <button className='my-nft-card__sell' onClick={() => nftWrite.createOffer(token, 0.5)}>
            Colocar à venda
          </button>

      }
    </article>
  )
}

export default MyNFTCard