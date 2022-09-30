import React, { useState } from 'react';
import { ImageGalleryImgStyles } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const togglenModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageGalleryImgStyles
        src={webformatURL}
        alt={tags}
        onClick={togglenModal}
      />
      {showModal && (
        <Modal image={largeImageURL} tags={tags} onClose={togglenModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
