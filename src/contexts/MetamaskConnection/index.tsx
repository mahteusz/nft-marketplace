import { useState, createContext, useEffect } from 'react'
import { MetamaskConnectionContextData, MetamaskConnectionProviderData } from './types'

export const MetamaskConnectionContext = createContext<MetamaskConnectionContextData>(
  {} as MetamaskConnectionContextData
)

export const MetamaskConnectionProvider = ({ children }: MetamaskConnectionProviderData) => {
  const [connectedWallet, setConnectedWallet] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!window.ethereum) return setError("Por favor, instale o Metamask")

    setWallet(window.ethereum._state.accounts)
    window.ethereum.on('accountsChanged', setWallet);

    return () => {
      window.ethereum.removeListener('accountsChanged', setWallet);
    }
  }, [])

  const connect = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  const setWallet = async (accounts: string[]) => {
    if (!accounts || !accounts.length) return clearWallet()

    setConnectedWallet(accounts[0])
  }

  const clearWallet = async () => {
    setConnectedWallet('')
  }

  return (
    <MetamaskConnectionContext.Provider value={{ connectedWallet, error, connect }}>
      {children}
    </MetamaskConnectionContext.Provider>
  )
}