import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost/api'
})

export default instance