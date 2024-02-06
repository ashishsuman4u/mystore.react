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
    <div className="fixed z-10 inset-0 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">{children}</div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}

export default Modal;
