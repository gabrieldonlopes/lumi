import axios from  'axios'

// cria uma instância de axios com a URL base
const api = axios.create({
    baseURL: ' http://localhost:8080'
})


export default api;