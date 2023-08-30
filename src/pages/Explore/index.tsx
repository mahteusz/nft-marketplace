import { Header } from '../../components'
import './styles.scss'
import { useMetamaskConnection } from '../../contexts/MetamaskConnection/useMetamaskConnection'
const Explore = () => {

  const metamaskConnection = useMetamaskConnection()

  return (
    <div><Header /></div>
  )
}

export default Explore