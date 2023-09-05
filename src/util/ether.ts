export const fromEtherToWei = (ether: number) => {
  const pow = Math.pow(10, 18)
  return ether * pow
}

export const fromWeiToEther = (wei: number) => {
  const pow = Math.pow(10, 18)
  return wei / pow
}