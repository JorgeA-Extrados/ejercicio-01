import axios from 'axios';

const apiRickandMorty = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiRickandMorty;