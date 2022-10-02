import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWondow, ModalImage } from './Modal.styled';

const Modal = ({ image, tags, onClose }) => {
  useEffect(() => {
    const handleClickByEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClickByEscape);
    return () => {
      window.removeEventListener('keydown', handleClickByEscape);
    };
  }, [onClose]);

  const handleClickOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

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
