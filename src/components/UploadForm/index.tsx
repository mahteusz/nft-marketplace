import './styles.scss'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { NFTStorage } from 'nft.storage'
import { NFTAttributeProps } from './types'
import { useNFTWrite } from '../../contexts/NFTWrite/useNFTWrite'
import { Modal } from '..'

enum STEPS {
  UPLOADING_IPFS,
  WAITING_TX,
  SUCCESS,
  NONE
}

const UploadForm = () => {
  const [file, setFile] = useState<File>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [attributes, setAttributes] = useState<string[]>([])
  const [values, setValues] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [step, setStep] = useState<STEPS>(STEPS.NONE)

  const nftWrite = useNFTWrite()

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
    if (!isValid()) {
      return setError("Um erro ocorreu. Por favor, preencha os campos corretamente")
    }
    setStep(STEPS.UPLOADING_IPFS)
    const token = await uploadNft()
    setStep(STEPS.WAITING_TX)
    await nftWrite.create(token.ipnft)
    setStep(STEPS.SUCCESS)
    setAttributes([])
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

  const renderModalContent = () => {
    let text = ""
    switch (step) {
      case STEPS.UPLOADING_IPFS:
        text = "Enviando dados para o NFT Storage e salvando utilizando IPFS..."
        break

      case STEPS.WAITING_TX:
        text = "Aguardando a transação se completar. Utilize o Metamask e aguarde alguns segundos..."
        break

      case STEPS.SUCCESS:
        text = "NFT criado com sucesso! Parabéns"
        break
    }

    return text
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

  return (
    <div className='upload-form'>
      <Modal
        children={<h1 className='step-text'>{renderModalContent()}</h1>}
        open={step !== STEPS.NONE}
        onClose={() => setStep(STEPS.NONE)}
      />
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
      >
        Criar NFT
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