import { Dispatch, SetStateAction } from 'react'

type NFTAttributeProps = {
  outerSetAttributes: Dispatch<SetStateAction<string[]>>,
  outerSetValues: Dispatch<SetStateAction<string[]>>,
}

export { type NFTAttributeProps }