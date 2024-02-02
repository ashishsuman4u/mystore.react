import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCategories } from '../../store';

function Categories({ category, setCategory }) {
  const data = useSelector(selectAllCategories);

  return (
    <select
      id="category"
      name="category"
      onChange={(e) => {
        setCategory(e.target.value);
      }}
      value={category}
      className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
    >
      <option value="">Select</option>
      {data.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

export default Categories;
