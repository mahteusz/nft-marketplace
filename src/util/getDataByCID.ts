const getDataByCID = async (cid: string) => {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}/?format=dag-json`)
  const toJson = await response.json()
  return toJson
}

export default getDataByCID