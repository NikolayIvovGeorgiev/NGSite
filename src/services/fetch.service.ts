import axios, { AxiosResponse, AxiosInstance } from "axios";
import { CVInterface, PersonalDataInfo, iPersonalInfoFields } from "../entities/cvInterfaces_old";

 export const getAuthToken = () => {
    return localStorage.getItem("authorization") || null;   
 }
export const deleteAuthToken = () => {
    localStorage.removeItem("authorization");
 }
export const axiosInstance: AxiosInstance =  axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'Content-Type': 'application/json', 
        },
    })


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authorization');

    if (token) {
        config.headers.Authorization =`Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
    });

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
interface personalInfo {
    id: string,
    name?: "string",
    birthDate?: Date,
    summary?: string,
    image?: string     
}
interface personalInfoFields{
    id: string,
    icon:string,
    type: string,
    value: string
}
// interface settings{
//     colors: string
// }

export const loginUser = (payload: loginData) => {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.post('/Identity', JSON.stringify(payload))
            .then((response) => {                
                localStorage.setItem('authorization', response.data);
                resolve(response);
            }).catch((error) => {
               if(error.response && error.response.data){
                reject(new Error(error.response.data));
               }
               reject(new Error(error.message));
            });
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
 export const deleteCVService = (id: number) => {
    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.delete(`/CVs/${ id }`)
        .then((response) => {
            console.log(response);
            resolve(response);
        }).catch((error) => {
                console.error(error.response.data);
                reject(error);
            })
    })
 }

 export const getCVService = (id: any) => {
    return new Promise<AxiosResponse<CVInterface>>((resolve,reject) => {
        axiosInstance.get(`/CVs/${id}`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            console.log(error);
            reject(error)
        })    
    })
 }

 export const getCVsService = () => {
    return new Promise<AxiosResponse<any>>((resolve,reject) => {
        axiosInstance.get(`/CVs`)
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            console.log(error);
            reject(error)
        })    
    })
 }

//  export const postCVSettings = (payload: settings) => {
//     return new Promise<AxiosResponse<CVInterface>>((resolve,reject) => {
//         axiosInstance.post(`/CVs/${id}/settings, JSON.stringify(payload)`)
//         .then((response) => {
//             resolve(response)
//         }).catch((error) => {
//             console.log(error);
//             reject(error)
//         })    
//     })
//  }
 export const postCVPersonalInfo = (payload: personalInfo) => {
    return new Promise<AxiosResponse<PersonalDataInfo>>((resolve,reject) => {
        axiosInstance.post('/CVs', JSON.stringify(payload))
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            console.log(error);
            reject(error)
        })    
    })
 }
 export const postCVPersonalInfoFields = (payload: personalInfoFields) => {
    return new Promise<AxiosResponse<iPersonalInfoFields>>((resolve,reject) => {
        axiosInstance.post(`/CVs/${payload.id}/personalInfoFields`, JSON.stringify(payload))
        .then((response) => {
            resolve(response)
        }).catch((error) => {
            console.log(error);
            reject(error)
        })    
    })
 }

