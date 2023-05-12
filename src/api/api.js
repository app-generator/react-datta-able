import axios from 'axios';
import { API_SERVER } from '../config/constant';

const apiInstance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true,
    
});

export default apiInstance;