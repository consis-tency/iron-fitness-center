import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import { useEffect } from "react";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('error tracking in the interceptors', error.response)
                if (error.response.status === 401 || error.response.status === 403)
                    await logOut()
                navigate('/login')
            }
        )
    }, [logOut, navigate])
    return axiosSecure;
}



export default useAxiosSecure;