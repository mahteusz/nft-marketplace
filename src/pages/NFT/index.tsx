import './styles.scss'
import { Header, NFTData } from '../../components'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useNFTData } from '../../contexts/NFTData/useNFTData'

const NFT = () => {
  const [nftToken, setNftToken] = useState<number>()

  const { id } = useParams()
  const navigate = useNavigate()
  const nftsData = useNFTData()

  useEffect(() => {
    if (!id) {
      return navigate("/")
    }

    const numberId = Number(id)
    if (numberId >= nftsData.nfts.length) {
      navigate("/")
    } else {
      nftsData.isForSale(nftsData.nfts[numberId]) ? setNftToken(numberId) : navigate("/")
    }

  }, [])

  return (
    <div className='nft'>
      <Header />
        { nftToken != undefined && <NFTData nft={nftsData.nfts[nftToken]} /> }
    </div>
  )
}

export default NFT