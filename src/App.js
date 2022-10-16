import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import fetchImages from './information/apiInfo';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';

let maxPages = 0;
let largeImgURL = '';

function App() {
  const [images, setImages] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    prevState => {
      if (searchItem === '') {
        return;
      } else if (
        (prevState !== searchItem && searchItem !== '') ||
        prevState !== page
      ) {
        searchImagesHandler();
      }
    },
    // eslint-disable-next-line
    [searchItem, page],
  );

  const closeModal = () => {
    largeImgURL = '';
    setOpenModal(false);
  };

  const showImageHandler = imageUrl => () => {
    largeImgURL = imageUrl;
    setOpenModal(true);
  };

  const scrollToHandler = () => {
    const top = document.documentElement.scrollHeight - 150;

    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 500);
  };

  const searchImagesHandler = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await fetchImages(searchItem, page);

      if (result.total !== 0) {
        maxPages = Math.ceil(result.totalHits / 12);

        setImages(prevState => [...prevState, ...result.hits]);
      } else {
        toast.info(`Nothing found for ${searchItem}!`);
        setImages([]);
      }
    } catch (error) {
      console.error(error);
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreHandler = () => {
    scrollToHandler();
    setPage(Math.min(maxPages, page + 1));
  };

  const onSubmitHandler = searchString => {
    maxPages = 0;
    setImages([]);
    setSearchItem(searchString);
    setPage(1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmitHandler} />
      {error ? (
        <p className="ErrorText">{error}</p>
      ) : (
        <ImageGallery
          images={images}
          showImageHandler={showImageHandler}
          scrollToHandler={scrollToHandler}
        />
      )}
      {isLoading && <Loader />}
      {images.length >= 11 && <Button loadMoreHandler={loadMoreHandler} />}
      {openModal && (
        <Modal largeImgURL={largeImgURL} onClose={closeModal}></Modal>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
