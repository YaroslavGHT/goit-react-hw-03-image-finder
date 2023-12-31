import React from 'react';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem.jsx'

const ImageGallery = ({pictures, handleShowLargeImg}) => {
  return (
      <ul 
            style={{
            display: 'grid',
            maxWidth: 'calc(100vw - 48px)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gridGap: '16px',
            marginTop: '25px',
            marginBottom: 0,
            padding: 0,
            listStyle: 'none',
            marginLeft: 'auto',
            marginRight: 'auto' 
            }}>
                {pictures.map((picture) => (
                  <ImageGalleryItem
                    key={picture.id}
                    id={picture.id}
                    urlImeg={picture.webformatURL}
                    largeImageURL={picture.largeImageURL}
                    tag={picture.tags}
                    handleShowLargeImg={handleShowLargeImg}
                  />
                ))}
        </ul>
  );
};

export { ImageGallery };
