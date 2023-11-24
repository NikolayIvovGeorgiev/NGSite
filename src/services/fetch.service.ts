import axios, { AxiosResponse, AxiosInstance } from "axios";
import { useAuth } from "../AuthContext";



export const setAuthTokenBrowser = (token: string) => {
    localStorage.setItem('authorization', token);
    setAxiosAuthToken(token);
 }

 export const setAxiosAuthToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
}
 export const getAuthToken = () => {
    return localStorage.getItem("authorization") || null;   
 }
export const deleteAuthToken = () => {
    localStorage.removeItem("authorization");
    setAxiosAuthToken(null);
 }
export const axiosInstance: AxiosInstance =  axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'Content-Type': 'application/json'
        },
    })

interface loginData {
    username: string,
    password: string
}
interface registerData{
    username: string,
    password: string,
    confirmPassword: string
}
interface cvData{
    id?: null | number;
    name: string;
    birthDate?: Date | string;
    summary?: null | string;
    image?: null | string;
}

export const loginUser = (payload: loginData) => {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.post('/Identity', JSON.stringify(payload))
            .then((response) => {                
                setAuthTokenBrowser(response.data);
                resolve(response);
            }).catch((error) => {
                console.error(error.response.data);
                reject(error);
            })
    })
}

export const registerUser = (payload: registerData) => {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.post('/Users', JSON.stringify(payload))
        .then((response) => {
            resolve(response);
        }).catch((error) => {
                console.error(error.response.data);
                reject(error);
            })
    })
}


 export const createCV = (name: string) => {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.post('/CVs', { name })
        .then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
                console.error(error.response.data);
                reject(error);
            })
    })
 }

 export const getCVs = () => {
    return new Promise<AxiosResponse<any>>((resolve,reject) => {
        axiosInstance.get(`/CVs`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })    
    })
 }