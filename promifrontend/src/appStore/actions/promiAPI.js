import axios from 'axios';

// https://promicrm20220130141603.azurewebsites.net
// https://localhost:44324
const promiAPI = axios.create({
    baseURL: 'https://localhost:44324',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default promiAPI;