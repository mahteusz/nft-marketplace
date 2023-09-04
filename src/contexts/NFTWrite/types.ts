type NFTWriteContextData = {
  connectedWallet: string,
  error: string,
  connect(): Promise<void>,
  create(uri: string): Promise<void>
}

type NFTWriteProviderData = {
  children: React.ReactNode
}

export { type NFTWriteContextData, type NFTWriteProviderData }