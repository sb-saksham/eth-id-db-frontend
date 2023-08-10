import React, { useContext, createContext } from "react";
import useEthName from "../hooks/useEthName";

const EthNameContext = createContext();
const useEthNameContext = () => useContext(EthNameContext);

const EthNameProvider = ({children}) => {
    const ethCont = useEthName();
    return (
        <EthNameContext.Provider value={ethCont}>
            {children}
        </EthNameContext.Provider>
    );
}

export { useEthNameContext, EthNameProvider };