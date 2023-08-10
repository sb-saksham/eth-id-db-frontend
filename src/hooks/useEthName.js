import useLocalStorage from "./useLocalStorage";
import { useAccount, useContractRead } from "wagmi";

import IdDb from "../artifacts/contracts/idDb.sol/IdDb.json";

const ContractDetails = {
    address: "0xB433adA68B8A8EE6B18753Fe4D98Bd1C7017C589",
    abi: IdDb.abi,
}

const useEthName = () => {
    const [ethName, setEthName] = useLocalStorage("ethName", null);
    
    const { address: walletAddress } = useAccount();
    
    const { data: domainOwner, error: domainFetchError } = useContractRead({
        ...ContractDetails,
        functionName: "domain",
        args: [ethName],
    })
    useEffect(() => {
        if (domainOwner) {
            if (domainOwner !== walletAddress) {
                setEthName(null);
            }
        }
     }, [domainOwner]);
  return { ethName, verifyEthName };
};

export default useEthName;