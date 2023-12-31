import React from 'react';
import css from './Modal.module.css'

const Modal = ({modalData, handleCloseLargeImg}) => {
  return (
    <div className={css.overlay} onClick={() => handleCloseLargeImg()}>
        <div className={css.modal}>
        <img src={modalData.largeImageURL} alt={modalData.tags} />
        </div>
    </div>
  );
};

export { Modal };
