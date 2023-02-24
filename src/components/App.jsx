import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getFetch } from './services/pixabay-servise';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus('pending');

    getFetch(searchQuery, page)
      .then(({ hits }) => {
        setImages(images => [...images, ...hits]);
        setStatus('resolved');
      })
      .catch(setStatus('rejected'));
  }, [page, searchQuery]);

  const addSearchQuery = searchQuery => {
    setImages([]);
    setPage(1);
    setSearchQuery(searchQuery);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMore = () => {
    setPage(page => page + 1);
    scroll();
  };

  const showLoadMore = images.length > 0;
  const pending = status === 'pending';

  return (
    <>
      <Container>
        <Searchbar onSubmit={addSearchQuery} />

        <ImageGallery
          images={images}
          onShowModal={toggleModal}
          onLargeImage={setLargeImage}
        />

        {showModal && (
          <Modal onClose={toggleModal} largeImage={largeImage}></Modal>
        )}

        {pending && <Loader />}

        {showLoadMore && <Button onLoadMore={loadMore} />}
      </Container>
    </>
  );
};
