import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '11753469-fae5ae7c0c549b8c5c7373ba2';
const fetchImages = async (searchItem, page) => {
    const response = await axios.get(`${BASE_URL}?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}
export default fetchImages;

