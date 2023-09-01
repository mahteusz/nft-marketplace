import './styles.scss'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { NFTStorage } from 'nft.storage'
import { NFTAttributeProps } from './types'

const UploadForm = () => {
  const [file, setFile] = useState<File>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [attributes, setAttributes] = useState<string[]>([])
  const [values, setValues] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = (files: File[]) => {
    setFile(files[0])
  }

  const uploadNft = async () => {
    const nftStorage = new NFTStorage({
      token: import.meta.env.VITE_NFTSTORAGE_KEY
    })

    const formattedAttributes = formatAttributes()
    const storage = await nftStorage.store({
      image: file!,
      name,
      description,
      attributes: formattedAttributes
    })

    return storage
  }

  const handleSubmit = async () => {
    setError("")
    setLoading(true)
    if (!isValid()) {
      setLoading(false)
      return setError("Um erro ocorreu. Por favor, preencha os campos corretamente")
    }

    const metadata = await uploadNft()
    setLoading(false)
    console.log(metadata)
  }

  const isValid = () => {
    return name &&
      description &&
      areAttributesValid() &&
      file
  }

  const areAttributesValid = () => {
    if (attributes.length != values.length) return false
    if (attributes.filter(attr => attr === "").length) return false
    if (values.filter(value => value === "").length) return false

    return true
  }

  const formatAttributes = () => {
    const formatted: { [key: string]: string }[] = []
    attributes.forEach((_, index) => {
      formatted.push({
        trait_type: attributes[index],
        value: values[index]
      })
    })

    return formatted
  }

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/jpeg': ['.jpeg', '.jpg']
    }
  })

  const renderLoader = () => {
    return (
      <div className='loader'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  return (
    <div className='upload-form'>
      <div className='upload-form__dropzone' {...getRootProps()}>
        <input {...getInputProps()} readOnly />
        {
          acceptedFiles.length ?
            <h2 className='upload-form__drop-filename'>{acceptedFiles[0].name}</h2>
            :
            <h2 className='upload-form__drop-filename'>Clique aqui ou arraste uma imagem</h2>
        }
      </div>
      {
        error && <h1 className='error'>{error}</h1>
      }
      <input
        className='upload-form__input'
        type='text'
        placeholder='Nome'
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <textarea
        className='upload-form__input'
        placeholder='Descrição'
        rows={8}
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      />
      <NFTAttribute outerSetAttributes={setAttributes} outerSetValues={setValues} />
      <button
        className='upload-form__button'
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Criando NFT" : "Criar NFT"}
        {loading && renderLoader()}
      </button>
    </div>
  )
}

const NFTAttribute = ({ outerSetAttributes, outerSetValues }: NFTAttributeProps) => {
  const [attributes, setAttributes] = useState<string[]>([])
  const [values, setValues] = useState<string[]>([])
  const [numberOfAttributes, setNumberOfAttributes] = useState<number>(0)

  const handleAddAttribute = () => {
    setNumberOfAttributes(numberOfAttributes + 1)
    const newAttributes = [...attributes]
    newAttributes.push("")
    const newValues = [...values]
    newValues.push("")

    setAttributes(newAttributes)
    setValues(newValues)
  }

  const handleAttributesUpdate = (newValue: string) => {
    const newAttributes = [...attributes]
    newAttributes[newAttributes.length - 1] = newValue

    setAttributes(newAttributes)
    outerSetAttributes(newAttributes)
  }

  const handleValuesUpdate = (newValue: string) => {
    const newValues = [...values]
    newValues[newValues.length - 1] = newValue

    setValues(newValues)
    outerSetValues(newValues)
  }

  return (
    <div className='attributes'>
      {
        Array(numberOfAttributes).fill(0).map((_, index) => {
          return (
            <div className='attributes__fields' key={index}>
              <input
                className='attributes__input'
                placeholder='Atributo'
                value={attributes[index]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAttributesUpdate(e.target.value)}
              />
              <input
                className='attributes__input'
                placeholder='Valor'
                value={values[index]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValuesUpdate(e.target.value)}
              />
            </div>
          )
        })
      }
      <button
        className='attributes__button'
        onClick={handleAddAttribute}
      >
        Adicionar atributo
      </button>
    </div>
  )
}

export default UploadForm