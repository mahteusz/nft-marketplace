import { NFTBuyCard } from '..';
import { useNFTData } from '../../contexts/NFTData/useNFTData';
import getDataByCID, { IPFSData, getImageByCID } from '../../util/getDataByCID';
import './styles.scss';
import { useState, useEffect } from 'react'

const Offers = () => {
  const [data, setData] = useState<Omit<IPFSData, "image">[]>([])
  const [images, setImages] = useState<string[]>([])
  const { nfts } = useNFTData()

  useEffect(() => {
    fetchIPFSData()
  }, [nfts])

  const fetchIPFSData = async () => {
    const promises: Promise<IPFSData>[] = []
    nfts.forEach(nft => {
      promises.push(getDataByCID(nft.uri))
    })

    const responses = await Promise.all(promises)
    const nftsData: Omit<IPFSData, "image">[] = []
    const imagesCIDs: string[] = []
    responses.forEach(response => {
      nftsData.push({
        attributes: response.attributes,
        description: response.description,
        name: response.name
      })
      imagesCIDs.push(response.image['/'])
    })

    setData(nftsData)
    fetchImages(imagesCIDs)
  }

  const fetchImages = async (imagesCIDs: string[]) => {
    const promises: Promise<string>[] = []
    imagesCIDs.forEach(imgCID => {
      promises.push(getImageByCID(imgCID))
    })

    const responses = await Promise.all(promises)
    setImages(responses)
  }

  return (
    <main className='offers'>
      {
        data.map((nft, index) => {
          return ( 
            <NFTBuyCard img={images[index]} name={nft.name} owner={nfts[index].owner} price='50' />
          )
        })
      }
    </main>
  )
}

export default Offers