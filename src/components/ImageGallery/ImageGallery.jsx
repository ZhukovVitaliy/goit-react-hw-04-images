import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images, onShowModal, onLargeImage }) => {
  return (
    <>
      <List>
        {images.map(image => (
          <ImageGalleryItem
            onLargeImage={onLargeImage}
            key={image.id}
            image={image}
            onShowModal={onShowModal}
          />
        ))}
      </List>
    </>
  );
};