import { useState } from 'react';
// import PropTypes from 'prop-types';

import styles from './SearchForm.module.css';

function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    name === 'query' && setQuery(value.trim());
  };

  const handleSubmit = e => {
    const pageNumber = 1;
    e.preventDefault();
    if (query.trim() === '') {
      alert('Enter query before submit');
      return;
    }
    onSubmit(query, pageNumber);
    setQuery('');
  };

  return (
   <div className={styles.SearchBar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormBtn}>
          <span className={styles.SearchFormBtnLabel}>Search</span>
        </button>
        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          value={query}
          name="query"
          onChange={handleChange}
        />
      </form>
      </div>
  );
}

// SearchForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default SearchForm;
