import { Contract } from 'web3-eth-contract'

type Web3ContextData = {
  contract: Contract,
  loadingContract: boolean,
}

type Web3ProviderData = {
  children: React.ReactNode
}

export { type Web3ContextData, type Web3ProviderData }