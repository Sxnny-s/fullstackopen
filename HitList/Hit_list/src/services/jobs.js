import axios from "axios";
const baseUrl = 'http://localhost:3000/Jobs'


const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl,newObject)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const toggleApplied = async (id) => {
    const job = await axios.get(`${baseUrl}/${id}`)
    return axios.put(`${baseUrl}/${id}`, {...job.data, applied : !job.data.applied})
}


export default {getAll,create,remove,toggleApplied}