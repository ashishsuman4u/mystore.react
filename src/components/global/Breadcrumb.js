import React from 'react';
import { Link, useLocation, matchRoutes } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import router, { routeConfiguration } from '../../routes';

function Breadcrumb() {
  const location = useLocation();

  const renderPath = () => {
    if (location.pathname === '/') return;
    const matchedRoute = matchRoutes(router.routes, location.pathname);
    if (matchedRoute && matchedRoute.length > 0) {
      const routeConfig = routeConfiguration.filter((config) => config.path === matchedRoute[0].route.path);
      if (routeConfig && routeConfig.length > 0) {
        return (
          <>
            <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <FaChevronRight />
            </span>
            <Link to={location.pathname} className="hover:underline">
              {routeConfig[0].name}
            </Link>
          </>
        );
      }
    }
  };
  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <div className="container flex items-center py-4 mx-4 whitespace-nowrap">
        <Link to="/" className="text-gray-600 dark:text-gray-200">
          <FaHome />
        </Link>
        {renderPath()}
      </div>
    </div>
  );
}

export default Breadcrumb;
