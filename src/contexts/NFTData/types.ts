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
  loading: boolean,
  getNftsOf(owner: string): Promise<NFT[]>,
  refresh(): Promise<void>,
  isForSale(nft: NFT): boolean
  getSelling(): NFT[],
  getHistory(token: number): Promise<HistoryData>
}

type NFTProviderData = {
  children: React.ReactNode
}

type SalesData = {
  from: string,
  to: string,
  price: number,
}

type HistoryData = {
  creator: string,
  sales: SalesData[]
}

type Offer = {
  price: number,
  creator: string,
  finished: boolean
}

export {
  type NFTContextData, type NFTProviderData, type NFTData,
  type NFTMetadata, type NFT, type Offer, type SalesData, type HistoryData
}