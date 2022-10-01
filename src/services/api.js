import axios from "axios";
const fetchImages = async (searchItem, page) => {
    const response = await axios.get(`https://pixabay.com/api/?q=${searchItem}&page=${page}&key=11753469-fae5ae7c0c549b8c5c7373ba2&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}
export default fetchImages;

