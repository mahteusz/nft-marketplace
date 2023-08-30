import './styles.scss'
import { MdOutlineExplore, MdAvTimer, MdOutlineUpload, MdOutlineToken } from 'react-icons/md' 
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()
  
  return (
    <header className='header'>
      <nav className='header__navigation'>
        <div
          className='header__navigation-item'
          onClick={() => navigate("/")}
        >
          <MdOutlineExplore size={24}/>
          <span className='header__navigation-item-name'>
            Explorar
          </span>
        </div>

        <div
          className='header__navigation-item'
          onClick={() => navigate("/activity")}
        >
          <MdAvTimer size={24}/>
          <span className='header__navigation-item-name'>
            Atividade
          </span>
        </div>

        <div
          className='header__navigation-item'
          onClick={() => navigate("/create")}
        >
          <MdOutlineUpload size={24}/>
          <span className='header__navigation-item-name'>
            Criar
          </span>
        </div>

        <div
          className='header__navigation-item'
          onClick={() => navigate("my-nfts")}
        >
          <MdOutlineToken size={24}/>
          <span className='header__navigation-item-name'>
            Meus NFTs
          </span>
        </div>
      </nav>
    </header>
  )
}

export default Header