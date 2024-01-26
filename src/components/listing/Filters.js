import React, { useState } from 'react';
import classname from 'classnames';
import { FaSearch, FaCaretDown, FaCaretLeft } from 'react-icons/fa';
import Categories from './Categories';

function Filters({ searchParams, setSearchParams }) {
  const [showFilter, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const className = classname('m-5', { hidden: !showFilter });

  React.useEffect(() => {
    if (searchParams.get('title')) {
      setSearchText(searchParams.get('title'));
    } else {
      setSearchText('');
    }
    if (searchParams.get('categoryId')) {
      setCategory(searchParams.get('categoryId'));
    } else {
      setCategory('');
    }
    if (searchParams.get('price_min')) {
      setMinPrice(searchParams.get('price_min'));
    } else {
      setMinPrice('');
    }
    if (searchParams.get('price_max')) {
      setMaxPrice(searchParams.get('price_max'));
    } else {
      setMaxPrice('');
    }
  }, [searchParams]);

  const handleReset = (event) => {
    event.preventDefault();
    setSearchParams({ page: '1' });
    setSearchText('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let searchParamArray = { page: '1' };
    if (searchText !== '') {
      searchParamArray = { ...searchParamArray, title: searchText };
    }
    if (category !== '') {
      searchParamArray = { ...searchParamArray, categoryId: category };
    }
    if (minPrice !== '') {
      searchParamArray = { ...searchParamArray, price_min: minPrice };
    }
    if (maxPrice !== '') {
      searchParamArray = { ...searchParamArray, price_max: maxPrice };
    }
    setSearchParams(searchParamArray);
  };

  return (
    <aside>
      <div
        className="flex justify-between border rounded p-2 md:p-4 cursor-pointer"
        onClick={() => setShowFilter(!showFilter)}
      >
        <h3 className="font-semibold">Filters</h3>
        {showFilter ? <FaCaretDown /> : <FaCaretLeft />}
      </div>
      <form className={className}>
        <div className="flex flex-col w-full">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg ">
            <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
              <FaSearch className="absolute left-2 block h-5 w-5 text-gray-400" />
              <input
                type="name"
                name="search"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                value={searchText}
                className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                placeholder="Search by name"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium text-stone-600">
                  Category
                </label>
                <Categories category={category} setCategory={setCategory} />
              </div>

              <div className="flex flex-col">
                <label htmlFor="minPrice" className="text-sm font-medium text-stone-600">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                  value={minPrice}
                  placeholder="0"
                  className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="maxPrice" className="text-sm font-medium text-stone-600">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                  value={maxPrice}
                  placeholder="99999"
                  className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex flex-row gap-4 items-end justify-between md:justify-start">
                <button
                  onClick={handleReset}
                  className="rounded-lg h-10 bg-gray-200 px-7 md:px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring"
                >
                  Reset
                </button>
                <button
                  onClick={handleSearch}
                  className="rounded-lg h-10 bg-black px-7 md:px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
}

export default Filters;
