import './styles.scss'
import { useState, useEffect } from 'react'
import { useNFTData } from '../../contexts/NFTData/useNFTData'
import { IPFSData } from '../../util/getDataByCID'
import { NFTData } from '../../contexts/NFTData/types'
import { MyNFTCard } from '..'

type NFT = IPFSData & NFTData

const MyNFTsList = () => {

  const [ownedNfts, setOwnedNfts] = useState<NFT[]>([])
  const { nfts } = useNFTData()

  useEffect(() => {
  }, [nfts])

  return (
    <main className='my-nfts'>
      <MyNFTCard />
      <MyNFTCard />
      <MyNFTCard />
      <MyNFTCard />
      <MyNFTCard />
    </main>
  )
}

export default MyNFTsList