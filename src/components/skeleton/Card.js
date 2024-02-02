import React from 'react';

function Card() {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full lg:my-4">
      <div className="w-full h-72 bg-gray-300 rounded dark:bg-gray-600"></div>
      <div className="mt-4">
        <div className="flex justify-between h-14 gap-4">
          <div className="h-10 w-24 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="h-10 w-24 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
        <div className="h-10 mt-2 w-full bg-gray-200 rounded dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default Card;
