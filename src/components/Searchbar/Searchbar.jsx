import React from 'react';
import css from './Searchbar.module.css'

const Searchbar = ({
        handleSubmit
  }) => {
  return (
    <header className={css.searchbar}>
          <form className={css.form} onSubmit={handleSubmit}>
              <button type="submit" className={css.button}>
                <span className="button-label">Search</span>
            </button>
            <input
                className={css.input}
                name='searchInput'
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
  );
};

export { Searchbar };
