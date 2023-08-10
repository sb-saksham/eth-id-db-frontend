import useLocalStorage from "./useLocalStorage";

const useEthName = () => {
  const [ethName, setEthName] = useLocalStorage("ethName", null);
  const saveEthName = (ETHName) => {
          setEthName(ETHName);
  };
  return { ethName, saveEthName };
};

export default useEthName;