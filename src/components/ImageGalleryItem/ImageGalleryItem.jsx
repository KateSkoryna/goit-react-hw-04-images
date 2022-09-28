import React, { Component } from 'react';
import { ImageGalleryImgStyles } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  togglenModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <ImageGalleryImgStyles
          src={webformatURL}
          alt={tags}
          onClick={this.togglenModal}
        />
        {this.state.showModal && (
          <Modal
            image={largeImageURL}
            tags={tags}
            onClose={this.togglenModal}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
