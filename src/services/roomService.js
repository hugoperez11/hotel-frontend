import axios from 'axios';

const API_URL = 'http://localhost:8080/api/room';

export const getRooms = () => {
    return axios.get(API_URL);
};
