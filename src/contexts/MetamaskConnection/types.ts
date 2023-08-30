type NFTData = {
  token: string,
  uri: string,
  owner: string
}

type MetamaskConnectionContextData = {
  connectedWallet: string,
  error: string,
  connect(): Promise<void>
}

type MetamaskConnectionProviderData = {
  children: React.ReactNode
}

export { type NFTData, type MetamaskConnectionContextData, type MetamaskConnectionProviderData }