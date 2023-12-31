import React from 'react';
import css from './Button.module.css'

export const Button = ({
  handleNextPage
  }) => {
  return (
    <div className={css.divButton}>
        <button className={css.button} onClick={handleNextPage} type='button'>Download more</button>
    </div>
  );
}
