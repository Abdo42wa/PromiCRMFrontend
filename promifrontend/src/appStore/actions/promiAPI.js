import axios from 'axios';

// https://promicrm20220225174254.azurewebsites.net
// https://localhost:44324
const promiAPI = axios.create({
    baseURL: 'https://localhost:44324',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default promiAPI;