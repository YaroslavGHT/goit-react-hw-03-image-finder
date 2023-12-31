import React from 'react';
import css from './Modal.module.css'

const Modal = () => {
  return (
    <div className={css.overlay}>
        <div className={css.modal}>
            <img src="" alt="" />
        </div>
    </div>
  );
};

export { Modal };
