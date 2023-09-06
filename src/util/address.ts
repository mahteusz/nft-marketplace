export const areAddressesEqual = (addr: string, addr2: string) => {
  return addr.toLowerCase() === addr2.toLowerCase()
}

export const minifyWalletAddress = (originalAddress: string) => {
  return `${originalAddress.slice(0, 5)}...${originalAddress.slice(-4)}`
}