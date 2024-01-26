import React from 'react';
import Card from './Card';

function Landing(props) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="animate-pulse">
        <div className="w-full h-10 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></div>

        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
