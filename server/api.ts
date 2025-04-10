import axios from "axios";
const listUrl = {
    apiUrl: 'https://jsonplaceholder.typicode.com/',
}
const api = axios.create({
    baseURL: `${listUrl.apiUrl}`,
});

export default api