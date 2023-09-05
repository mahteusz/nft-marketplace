import { Dispatch } from "react"

type Props = {
  outerSetPrice: Dispatch<React.SetStateAction<number>>,
  onSubmit(): void
}

export { type Props }