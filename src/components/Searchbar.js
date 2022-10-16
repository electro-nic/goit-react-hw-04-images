import { toast } from 'react-toastify';
import { useState } from 'react';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const changeHandler = e => {
    setValue(e.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (value.trim() === '') {
      toast.error('Please enter search request!');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={submitHandler}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeHandler}
          value={value}
        />
      </form>
    </header>
  );
}

export default Searchbar;
