type NFTData = {
  token: string,
  uri: string,
  owner: string
}

type NFTContextData = {
  nfts: NFTData[]
}

type NFTProviderData = {
  children: React.ReactNode
}

export { type NFTData, type NFTContextData, type NFTProviderData }