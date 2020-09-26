import axios from 'axios';

const instance = axios.create({
    baseURL = 'https://burger-builder-3dd14.firebaseio.com'
});

export default instance;