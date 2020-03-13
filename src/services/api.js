import axios from 'axios';

export default axios.create({
    baseURL: 'https://5e6767a91937020016fedba4.mockapi.io',
    headers: {'Content-type': 'application/json'}
});