import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, urlImeg, largeImageURL, tag, handleShowLargeImg}) => {
    return (
        <li className={css.imageGalleryItem} key={id} onClick={() => handleShowLargeImg(largeImageURL)}>
            <img
                className={css.imageGalleryItemimage}
                src={urlImeg}
                alt={tag}
            />
        </li>
    );
};

export { ImageGalleryItem };