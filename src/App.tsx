import { NFTMarketplaceProvider } from './contexts/NFTMarketplace'
import { Web3Provider } from './contexts/web3'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Activity, Create, Explore, MyNFTs } from './pages'

const App = () => {

  return (
    <Web3Provider>
      <NFTMarketplaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Explore />} />
            <Route path='/activity' element={<Activity />} />
            <Route path='/create' element={<Create />} />
            <Route path='/my-nfts' element={<MyNFTs />} />
            <Route path='*' element={<Explore />} />
          </Routes>
        </BrowserRouter>
      </NFTMarketplaceProvider>
    </Web3Provider>
  )
}

export default App
