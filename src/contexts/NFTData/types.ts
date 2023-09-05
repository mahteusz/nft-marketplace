type NFTMetadata = {
  attributes: { [key: string]: string }[],
  description: string,
  name: string,
  image: string
}

type NFTData = {
  token: number,
  uri: string,
  owner: string
}

type NFT = {
  data: NFTData,
  metadata: NFTMetadata,
  offer: Offer
}

type NFTContextData = {
  nfts: NFT[],
  getNftsOf(owner: string): Promise<NFT[]>,
  refresh(): Promise<void>,
  isForSale(nft: NFT): boolean
  getSelling(): NFT[],
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