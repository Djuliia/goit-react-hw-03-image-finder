import { GalleryList } from "./ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";


export const ImageGallery = ({ images, openModal }) => {
    return (
      <GalleryList>
        {images.map(({ webformatURL, tags, id }) => {
          return (
            <ImageGalleryItem
           src={webformatURL}
            alt={tags}
           onClick={openModal}
            key={id}
          />
          )
        }
        )}
      </GalleryList>
    );
        }