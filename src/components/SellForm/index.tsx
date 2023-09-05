import './styles.scss'
import { useState } from 'react'
import { Props } from './types'

const SellForm = ({ outerSetPrice, onSubmit }: Props) => {
  const [price, setPrice] = useState<number>(0)
  const [waitingForTransaction, setWaitingForTransaction] = useState<boolean>(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value))
    outerSetPrice(Number(e.target.value))
  }

  const handleSubmit = () => {
    setWaitingForTransaction(true)
    onSubmit()
  }

  return (
    <div className='sell-form'>
      <h1 className='sell-form__title'>Venda seu NFT agora mesmo!</h1>
      <input
        type='number'
        step={0.1}
        className='sell-form__input'
        placeholder='Preco em ETH'
        value={price}
        onChange={handleOnChange}
      />
      <button className='sell-form__button' onClick={handleSubmit}>
        Criar oferta
      </button>
      {
        waitingForTransaction &&
        <h2 className='sell-form__info'>
          Aguardando a transação se completar. Utilize o Metamask e aguarde alguns segundos...
        </h2>
      }
    </div>
  )
}

export default SellForm