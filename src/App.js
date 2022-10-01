import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Component } from 'react';

import fetchImages from './services/api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    searchItem: '',
    page: 1,
    isLoading: false,
    openModal: false,
    error: '',
  };

  maxPages = 0;
  largeImgURL = '';
  newElementHight = 0;

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.searchItem !== this.state.searchItem &&
        this.state.searchItem !== '') ||
      prevState.page !== this.state.page
    ) {
      this.searchImagesHandler();
    }
  }

  closeModal = () => {
    this.largeImgURL = '';
    this.setState({ openModal: false });
  };

  showImageHandler = imageUrl => () => {
    this.largeImgURL = imageUrl;
    this.setState({ openModal: true });
  };


  scrollToHandler = () => {
    const top = document.documentElement.scrollHeight - 150;
    window.scrollTo({
        top,
        behavior: 'smooth',
      });


  };

  searchImagesHandler = async () => {
    const { searchItem, page } = this.state;
    this.setState({ isLoading: true, error: '' });
    try {
      const result = await fetchImages(searchItem, page);

      if (result.total !== 0) {
        this.maxPages = Math.ceil(result.totalHits / 12);

        this.setState(({ images }) => ({
          images: [...images, ...result.hits],
        }));
      } else {
        toast.info(`Nothing found for ${searchItem}!`);
        this.setState(() => ({
          images: [],
        }));
      }
    } catch (error) {
      console.error(error);
      this.setState(() => ({ error: error.toString() }));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreHandler = () => {
    this.scrollToHandler();
    this.setState(() => ({
      page: Math.min(this.maxPages, this.state.page + 1),
    }));
  };

  onSubmitHandler = searchString => {
    this.maxPages = 0;

    this.setState(() => ({
      images: [],
      searchItem: searchString,
      page: 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitHandler} />
        {this.state.error ? (
          <p className="ErrorText">{this.state.error}</p>
        ) : (
          <ImageGallery
            images={this.state.images}
            showImageHandler={this.showImageHandler}
            scrollToHandler={this.scrollToHandler}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.page < this.maxPages && (
          <Button loadMoreHandler={this.loadMoreHandler} />
        )}
        {this.state.openModal && (
          <Modal
            largeImgURL={this.largeImgURL}
            onClose={this.closeModal}
          ></Modal>
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
