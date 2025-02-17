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


export default {getAll,create,remove}