import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modalRoot');

function Modal({ largeImgURL, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
  });

  useEffect(() => {
    window.removeEventListener('keydown', keyDownHandler);
  });

  const keyDownHandler = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const overlayClickHandler = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={overlayClickHandler}>
      <div className="Modal">
        <img src={largeImgURL} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
