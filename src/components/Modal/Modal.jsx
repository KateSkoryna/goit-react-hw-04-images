import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWondow, ModalImage } from './Modal.styled';

const Modal = ({ image, tags, onClose }) => {
  const handleClickByEscape = e => {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', handleClickByEscape);
    }
  };

  const handleClickOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
      window.removeEventListener('keydown', handleClickByEscape);
    }
  };

  window.addEventListener('keydown', handleClickByEscape);

  return (
    <Overlay onClick={handleClickOnBackdrop}>
      <ModalWondow>
        <ModalImage src={image} alt={tags} />
      </ModalWondow>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
