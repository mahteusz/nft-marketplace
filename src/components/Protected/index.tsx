import { Navigate } from "react-router-dom";
import { useNFTWrite } from "../../contexts/NFTWrite/useNFTWrite";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { connectedWallet, loading } = useNFTWrite()

  if (!connectedWallet && !loading) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;