import Modal from 'react-modal';
import { createPortal } from "react-dom";
import { ImgModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#modal-root');

export const GalleryModal = ({isOpen, onRequestClose, largeImageURL, tags}) => {

    return (
        createPortal(        
        <div>
            <ImgModal
              isOpen={isOpen}
              onRequestClose={onRequestClose}
              style={customStyles}

            >
    <img src={largeImageURL} alt={tags} />
            </ImgModal>
          </div>, modalRoot)

      );
}