import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return ReactDOM.createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
      <div className="fixed inset-10 md:inset-28 lg:inset-44 xl:inset-80 h-fit bg-white">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </div>
    </>,
    document.querySelector('#modal')
  );
}

export default Modal;
