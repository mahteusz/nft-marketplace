import './styles.scss'
import { MdOutlineExplore, MdOutlineUpload, MdOutlineToken, MdLogin } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useMetamaskConnection } from '../../contexts/MetamaskConnection/useMetamaskConnection'
//@ts-ignore
import Blockies from 'react-blockies'
import { minifyWalletAddress } from '../utils'

const Header = () => {

  const metamaskConnection = useMetamaskConnection()
  const navigate = useNavigate()

  const renderBaseNavigationItems = () => {
    return (
      <>
        <div
          className='header__navigation-item'
          onClick={() => navigate("/")}
        >
          <MdOutlineExplore className='header__navigation-item-icon' />
          <span className='header__navigation-item-name'>
            Explorar
          </span>
        </div>
      </>
    )
  }

  const renderDisconnectedUserNavigationItems = () => {
    return (
      <>
        <div
          className='header__navigation-item'
          onClick={() => metamaskConnection.connect()}
        >
          <MdLogin className='header__navigation-item-icon' />
          <span className='header__navigation-item-name'>
            Conectar
          </span>
        </div>
      </>
    )
  }

  const renderConnectedUserNavigationItems = () => {
    return (
      <>
        <div
          className='header__navigation-item'
          onClick={() => navigate("/create")}
        >
          <MdOutlineUpload className='header__navigation-item-icon' />
          <span className='header__navigation-item-name'>
            Criar
          </span>
        </div>
        <div
          className='header__navigation-item'
          onClick={() => navigate("my-nfts")}
        >
          <MdOutlineToken className='header__navigation-item-icon' />
          <span className='header__navigation-item-name'>
            Meus NFTs
          </span>
        </div>
        {renderWalletBlockie()}
      </>
    )
  }

  const renderWalletBlockie = () => {
    return (
      <>
        <div
          className='header__navigation-item'
        >
          <Blockies seed={metamaskConnection.connectedWallet} />
          <span className='header__navigation-item-name'>
            {minifyWalletAddress(metamaskConnection.connectedWallet)}
          </span>
        </div>
      </>
    )
  }

  return (
    <header className='header'>
      <nav className='header__navigation'>
        {renderBaseNavigationItems()}
        {metamaskConnection.connectedWallet ? renderConnectedUserNavigationItems() : renderDisconnectedUserNavigationItems()}
      </nav>
    </header>
  )
}

export default Header