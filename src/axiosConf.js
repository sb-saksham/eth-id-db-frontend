import axios from "axios";
import useAuth from "./hooks/useAuth";

const auth = useAuth();
const idAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        Authorization: `Token ${auth.user?.token}`,
        "Content-Type": ''
    },
    Co
})