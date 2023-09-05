import './styles.scss'
import { useEffect } from 'react'
import { Props } from "./types"

const Modal = ({ open, children }: Props) => {

  useEffect(() => {
    if (open)
      disableBodyScroll()
    else
      enableBodyScroll()
  }, [open])

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const enableBodyScroll = () => {
    document.body.style.overflow = 'unset'
  }

  const renderContent = () => {
    return (
      <div className='modal'>
        <div className='modal__content'>
          {children}
        </div>
      </div>
    )
  }

  return (
    <>
      {
        open ? renderContent() : null
      }
    </>
  )
}

export default Modal