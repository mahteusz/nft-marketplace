type NFTData = {
  token: string,
  uri: string,
  owner: string
}

type NFTMarketplaceContextData = {
  nfts: NFTData[],
  loading: boolean,
}

type NFTMarketplaceProviderData = {
  children: React.ReactNode
}

export { type NFTData, type NFTMarketplaceContextData, type NFTMarketplaceProviderData }