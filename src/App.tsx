import { NFTWriteProvider } from './contexts/NFTWrite'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Create, Explore, MyNFTs } from './pages'
import { Protected } from './components'
import { NFTProvider } from './contexts/NFTData'

const App = () => {

  return (
    <NFTProvider>
      <NFTWriteProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Explore />} />
            <Route path='/create' element={<Protected> <Create /> </Protected>} />
            <Route path='/my-nfts' element={<Protected> <MyNFTs /> </Protected>} />
            <Route path='*' element={<Explore />} />
          </Routes>
        </BrowserRouter>
      </NFTWriteProvider>
    </NFTProvider>
  )
}

export default App
