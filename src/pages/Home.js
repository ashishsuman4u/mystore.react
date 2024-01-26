import React from 'react';
import Filters from '../components/listing/Filters';
import ProductList from '../components/listing/ProductList';
import { useFetchProductsQuery } from '../store';
import Pagination from '../components/listing/Pagination';
import { useSearchParams, useLocation } from 'react-router-dom';
import Landing from '../components/skeleton/Landing';
import ErrorPage from '../components/error/ErrorPage';

function Home() {
  let pageNumber = 1;
  let [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  if (!isNaN(parseInt(searchParams.get('page')))) {
    pageNumber = parseInt(searchParams.get('page'));
  }
  const location = useLocation();
  console.log(location.search.replace(`?page=${pageNumber}`, ''));
  const { data, error, isFetching } = useFetchProductsQuery({
    page: pageNumber,
    filter: location.search.replace(`?page=${pageNumber}`, ''),
  });

  if (isFetching) {
    return <Landing />;
  } else if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <>
      <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
      <main>
        <ProductList products={data} />
        <Pagination count={data.length} pageNumber={pageNumber} />
      </main>
    </>
  );
}

export default Home;
