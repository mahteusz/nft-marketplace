import './styles.scss'
import { MdOutlineToken } from 'react-icons/md'
const Loading = () => {
  return (
    <div className='loading-page'>
      <div className='loading-page__content'>
        <MdOutlineToken className='loading-page__icon'/>
        <h1 className='loading-page__message'>
          Carregando NFTs
        </h1>
      </div>
    </div>
  )
}

export default Loading