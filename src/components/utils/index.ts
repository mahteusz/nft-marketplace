export const minifyWalletAddress = (originalAddress: string) => {
  return `${originalAddress.slice(0, 5)}...${originalAddress.slice(-4)}`
}