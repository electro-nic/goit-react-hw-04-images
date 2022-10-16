import PropTypes from 'prop-types';

export default function Button({ loadMoreHandler }) {
  return (
    <button type="button" className="Button" onClick={loadMoreHandler}>
      Load more
    </button>
  );
}

Button.propType = {
  loadMoreHandler: PropTypes.func.isRequired,
};
