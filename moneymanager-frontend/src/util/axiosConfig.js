import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosconfig = axios.create({  
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

//list of endpoints that do not required authorization header
const excludeEndpoints=["/register","/login","/activate","/status","/health"];

//request interceptor
axiosconfig.interceptors.request.use((config)=>{
   const shouldSkipToken= excludeEndpoints.some((endpoint)=>{
       return config.url?.includes(endpoint)
    });
    if(!shouldSkipToken){
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
    }
    return config
},(error)=>{
    return Promise.reject(error);
})

//response interceptor
axiosconfig.interceptors.response.use((response)=>{
    return response;
},error=>{
    if(error.response && error.response.status===401){
        window.location.href="/login";
    }
    else if(error.response && error.response.status===500){
        console.error("Server error. Please try again later.")
    }
    else if(error.code==="ECONNABORTED"){
        console.error("Request timeout. Please try again.")
    }
    return Promise.reject(error);
})

export default axiosconfig