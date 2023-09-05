import './styles.scss'
import { useEffect, MouseEvent } from 'react'
import { Props } from "./types"

const Modal = ({ open, children, onClose }: Props) => {

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

  const handleOuterClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  const renderContent = () => {
    return (
      <div className='modal' onClick={onClose}>
        <div className='modal__content' onClick={handleOuterClick}>
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