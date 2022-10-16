import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const myAPIkey = '11753469-fae5ae7c0c549b8c5c7373ba2';

const fetchRequest = async (searchName, page) => {
    const response = await axios.get(`${BASE_URL}?q=${searchName}&page=${page}&key=${myAPIkey}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}

export default fetchRequest;

