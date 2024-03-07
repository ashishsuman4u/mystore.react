import React from 'react';
import DOMPurify from 'dompurify';
import data from '../dataset/static.json';
function Static({ type }) {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data[type].copy),
  });
  return (
    <main className="static h-screen py-12 sm:py-16 lg:py-20 px-6">
      <h1 className="text-xl font-bold pb-6">{data[type].heading}</h1>
      <div dangerouslySetInnerHTML={sanitizedData()}></div>
    </main>
  );
}

export default Static;
