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
  nfts: NFT[]
}

type NFTProviderData = {
  children: React.ReactNode
}

export { type NFTContextData, type NFTProviderData, type NFTData, type NFTMetadata, type NFT }