import { NFTMarketplaceProvider } from './contexts/NFTMarketplace'
import { Web3Provider } from './contexts/web3'


const App = () => {

  return (
    <Web3Provider>
      <NFTMarketplaceProvider>
        <h1>NFT Marketplace</h1>
      </NFTMarketplaceProvider>
    </Web3Provider>
  )
}

export default App
