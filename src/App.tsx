import { NFTWriteProvider } from './contexts/NFTWrite'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Activity, Create, Explore, MyNFTs } from './pages'
import { NFTProvider } from './contexts/NFTData'

const App = () => {

  return (
    <NFTProvider>
      <NFTWriteProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Explore />} />
            <Route path='/activity' element={<Activity />} />
            <Route path='/create' element={<Create />} />
            <Route path='/my-nfts' element={<MyNFTs />} />
            <Route path='*' element={<Explore />} />
          </Routes>
        </BrowserRouter>
      </NFTWriteProvider>
    </NFTProvider>
  )
}

export default App
