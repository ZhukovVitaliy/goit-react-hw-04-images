import { Component } from 'react';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getFetch } from './services/pixabay-servise';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    status: 'idle',
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ page: 1, images: [] });

      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ status: 'pending' });

    getFetch(searchQuery, page)
      .then(({ hits }) => {
        this.setState(({ images, page }) => ({
          images: [...images, ...hits],
          status: 'resolved',
          page: page + 1,
        }));

        this.scroll();
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  loadMore = () => {
    this.fetchImages();
    this.scroll();
  };

  addSearchQuery = searchQuery => {
    this.setState({ searchQuery });
  };

  largeImage = largeImage => {
    this.setState({ largeImage });
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, showModal, largeImage } = this.state;
    const showLoadMore = images.length > 0;
    const pending = status === 'pending';

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.addSearchQuery} />

          <ImageGallery
            images={images}
            onShowModal={this.toggleModal}
            onLargeImage={this.largeImage}
          />

          {showModal && (
            <Modal onClose={this.toggleModal} largeImage={largeImage}></Modal>
          )}

          {pending && <Loader />}

          {showLoadMore && <Button onLoadMore={this.loadMore} />}
        </Container>
      </>
    );
  }
}
