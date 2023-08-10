import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
    
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = async (data) => {
      try {
          let authresult = await axios.post('http://127.0.0.1:8000/accounts/login/', data);
          let userObj = {
            token: authresult.data?.token,
            ...authresult.data?.user  
          }
          setUser(userObj);
          navigate(location.state?.from || '/')
      } catch (err) {
          console.error(err);
          return err;
      }
  };

    const signUp = async (data) => {
      try {
        let authresult = await axios.post('http://127.0.0.1:8000/accounts/signup/', data);
        console.log(authresult.data);  
        let userObj = {
          ...authresult.data?.user  
        }
        setUser(userObj);
        console.log("")
        navigate('/auth/');
      } catch (err) {
        console.error(err);
        return err;
        // toasterror("An Error Occuered")
      }
  };

  const signOut = () => {
      setUser(null);
  };

  return { user, signIn, signUp, signOut };
};

export default useAuth;