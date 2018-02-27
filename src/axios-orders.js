import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-dailuong.firebaseio.com/'
});

export default instance;