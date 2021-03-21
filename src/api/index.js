import axios from 'axios';

console.log()
export const  API = axios.create({ baseURL: `${process.env.REACT_APP_SERVER_URL}` });


