import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

function Pagination({ total, pageNumber }) {
  const { search } = useLocation();
  const prevClassNames = classNames('inline-flex items-center justify-center w-24 h-8 py-0 border rounded-md shadow', {
    'pointer-events-none text-gray-300': pageNumber === 1,
  });
  const nextClassNames = classNames('inline-flex items-center justify-center w-24 h-8 py-0 border rounded-md shadow', {
    'pointer-events-none text-gray-300': total <= pageNumber * 8,
  });
  return (
    <div className="flex items-center justify-center gap-4 text-base py-8">
      <Link
        to={`/?page=${pageNumber - 1}${search.replace(`?page=${pageNumber}`, '')}`}
        title="previous"
        disabled={pageNumber === 1}
        className={prevClassNames}
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>{' '}
        Prev
      </Link>
      <span className="block">Page {pageNumber}</span>
      <Link
        to={`/?page=${pageNumber + 1}${search.replace(`?page=${pageNumber}`, '')}`}
        title="next"
        type="button"
        disabled={total <= pageNumber * 8}
        className={nextClassNames}
      >
        Next{' '}
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </Link>
    </div>
  );
}

export default Pagination;
