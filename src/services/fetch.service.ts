import axios, { AxiosResponse } from "axios";

const axiosInstance =  axios.create({
    baseURL: 'http://localhost:5000',
    headers: {'Content-Type': 'application/json'}
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

export const loginUser = (payload: loginData) => {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.post('/Identity', JSON.stringify(payload))
            .then((response) => {
                setAuthToken(response.data);
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
            console.log(response);
            resolve(response);
        }).catch((error) => {
                console.error(error.response.data);
                reject(error);
            })
    })
}

export const setAuthToken = (token: string) => {
    localStorage.setItem('authorization', token);
    window.dispatchEvent(new Event('storageUpdate'));
 }
 export const getAuthToken = () => {
    return localStorage.getItem("authorization");
 }
export const deleteAuthToken = () => {
    localStorage.removeItem("authorization");
    window.dispatchEvent(new Event('storageUpdate'));
 }