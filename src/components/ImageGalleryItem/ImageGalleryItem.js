import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL, tags, onClick }) => {
  return (
    <GalleryItem key={id} onClick={onClick}>
      <GalleryImg src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
