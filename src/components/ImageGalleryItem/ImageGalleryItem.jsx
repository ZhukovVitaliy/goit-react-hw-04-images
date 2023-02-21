import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onShowModal, onLargeImage }) => (
  <Item>
    <Image
      src={image.webformatURL}
      alt={image.tags}
      onClick={() => {
        onShowModal();
        onLargeImage(image.largeImageURL);
      }}
    />
  </Item>
);
