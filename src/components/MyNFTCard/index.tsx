import './styles.scss'
import { useState } from 'react'
import { useNFTWrite } from '../../contexts/NFTWrite/useNFTWrite'
import { Props } from './types'
import { Modal, SellForm } from '..'

const MyNFTCard = ({ token, img, name, selling, price }: Props) => {
  const [finishOfferModalOpen, setFinishOfferModalOpen] = useState<boolean>(false)
  const [createOfferModalOpen, setCreateOfferModalOpen] = useState<boolean>(false)
  const [createOfferPrice, setCreateOfferPrice] = useState<number>(0)
  const [selectedTokenToSell, setSelectedTokenToSell] = useState<number>()

  const nftWrite = useNFTWrite()

  const handleFinishOffer = async (token: number) => {
    setFinishOfferModalOpen(true)
    await nftWrite.finishOffer(token)
    setFinishOfferModalOpen(false)
  }

  const handleCreateOffer = async (token: number) => {
    setCreateOfferModalOpen(true)
    setSelectedTokenToSell(token)
  }

  const handleCreateOfferSubmit = async () => {
    await nftWrite.createOffer(selectedTokenToSell!, createOfferPrice)
    setCreateOfferModalOpen(false)
  }

  return (
    <article className='my-nft-card'>
      <Modal open={createOfferModalOpen} onClose={() => setCreateOfferModalOpen(false)}>
        <SellForm
          outerSetPrice={setCreateOfferPrice}
          onSubmit={handleCreateOfferSubmit}
        />
      </Modal>
      <Modal open={finishOfferModalOpen} onClose={() => setFinishOfferModalOpen(false)}>
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
          <button className='my-nft-card__sell' onClick={() => handleCreateOffer(token)}>
            Colocar à venda
          </button>

      }
    </article>
  )
}

export default MyNFTCard