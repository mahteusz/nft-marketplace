type NFTMetadata = {
  attributes: { [key: string]: string }[],
  description: string,
  name: string,
  image: string
}

type NFTData = {
  token: string,
  uri: string,
  owner: string
}

type NFT = {
  data: NFTData,
  metadata: NFTMetadata
}

type NFTContextData = {
  nfts: NFT[],
  getSelling(): Promise<NFT[]>
  getNftsOf(owner: string): Promise<NFT[]>
  refresh(): Promise<void>
}

type NFTProviderData = {
  children: React.ReactNode
}

type Offer = {
  price: number,
  creator: string,
  finished: boolean
}

export { type NFTContextData, type NFTProviderData, type NFTData, type NFTMetadata, type NFT, type Offer }