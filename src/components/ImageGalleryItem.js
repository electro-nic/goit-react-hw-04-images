import PropTypes from 'prop-types';

export default function ImageGalleryItem({ webformatURL, showImageHandle }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={showImageHandle}
      />
    </li>
  );
}

ImageGalleryItem.propType = {
  img: PropTypes.string.isRequired,
  showImageHandle: PropTypes.func.isRequired,
};
