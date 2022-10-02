import React, { useState, useEffect } from 'react';
// import { useMountedState } from 'react-use';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Global } from '@emotion/react';
import { GlobalStyles } from './GlobalStyles.styled';
import { AppBox } from './App.styled';
import fetchData from '../../services/api';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

Notify.init({
  width: '300px',
  position: 'center-top',
  distance: '100px',
  clickToClose: true,
  cssAnimationStyle: 'zoom',
  cssAnimationDuration: 1000,
});
const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }
    const findImages = async () => {
      try {
        setIsLoading(true);
        const photos = await fetchData(value, page);
        photos.hits.length === 0
          ? Notify.failure(
              'Sorry! There is no photo with this name. Try something else!'
            )
          : setImages(images => [...images, ...photos.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    findImages();
  }, [value, page]);

  const addValue = ({ inputValue }) => {
    if (inputValue !== value) {
      setValue(inputValue);
      setImages([]);
      setPage(1);
    } else {
      setValue(inputValue);
    }
  };

  const loadMore = () => {
    setPage(() => page + 1);
  };

  return (
    <AppBox>
      <Global styles={GlobalStyles} />
      <Searchbar onSubmit={addValue} />
      {isLoading && images.length === 0 ? (
        <Loader />
      ) : (
        <ImageGallery items={images} />
      )}
      {images.length % 12 === 0 && images.length !== 0 ? (
        <Button onClick={loadMore} />
      ) : (
        ''
      )}
    </AppBox>
  );
};

export default App;
