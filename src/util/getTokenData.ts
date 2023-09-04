type IPFSData = {
  attributes: { [key: string]: string }[],
  description: string,
  image: { "/": string }
  name: string,
}

type IPFSImageData = {
  Links: [
    {
      Hash: {'/': string},
      Name: string
      Tsize: number
    }
  ]
}

const getDataByCID = async (cid: string) => {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}/?format=dag-json`)
  const toJson: IPFSData = await response.json()
  return toJson
}

const getImageByCID = async (cid: string) => {
  const response = await fetch(`https://ipfs.io/ipfs/${cid}/?format=dag-json`)
  const toJson: IPFSImageData = await response.json()
  const imageFileName = toJson.Links[0].Name

  const imgResponse = await fetch(`https://ipfs.io/ipfs/${cid}/${imageFileName}`)
  const imgBlob = await imgResponse.blob()
  return URL.createObjectURL(imgBlob)
}

export { getDataByCID as default, getImageByCID, type IPFSData }