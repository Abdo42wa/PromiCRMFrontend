import axios from 'axios';

// https://promicrm20220221134904.azurewebsites.net
// https://localhost:44324
const promiAPI = axios.create({
    baseURL: 'https://promicrm20220221134904.azurewebsites.net',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default promiAPI;