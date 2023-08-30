import { useContext } from "react";
import { MetamaskConnectionContext } from ".";

export const useMetamaskConnection = () => useContext(MetamaskConnectionContext)