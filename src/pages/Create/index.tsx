import './styles.scss'
import { Header, UploadForm } from '../../components'

const Create = () => {
  return (
    <>
      <Header />
      <div className='create-content'>
        <h1 className='create-content__title'>Crie seu NFT facilmente!</h1>
        <UploadForm />
      </div>
    </>
  )
}

export default Create