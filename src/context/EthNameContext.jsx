import React, { createContext, useContext } from "react";
import useEthName from "../hooks/useEthName";


const EthNameContext = createContext();
const useEthNameContext = () => useContext(EthNameContext);
const EthNameProvider = ({ children }) => {
    const ethNameCon = useEthName()
    return <EthNameContext.Provider value={ethNameCon}>{children}</EthNameContext.Provider>;
}

export {EthNameProvider, useEthNameContext}
