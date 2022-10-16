import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images, showImageHandler }) {
  return (
    <ul className="ImageGallery">
      {images.map((image, index) => {
        return (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            showImageHandle={showImageHandler(image.largeImageURL)}
            index={index}
          />
        );
      })}
    </ul>
  );
}
