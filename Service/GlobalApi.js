import axios from "axios"
////
const API_KEY=import.meta.env.VITE_STRAPY_SERVER_API_KEY
const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        "Authorization":`Bearer ${API_KEY}`
    }
})

const createNewResume=(data)=>axiosClient.post('/user-resumes',data)
const GetUserResumes=(userEmail)=>{
    return axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);
}
const UpdateResumeDetails=(id,data)=>{
return axiosClient.put(`/user-resumes/${id}`,data)
}

const SeeResume=(id)=>{
return axiosClient.get(`/user-resumes/${id}`)
}
export default{
    createNewResume,
    GetUserResumes, 
    UpdateResumeDetails,
    SeeResume
}