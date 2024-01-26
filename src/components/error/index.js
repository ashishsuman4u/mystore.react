import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';

function ReactErrorBoundary(props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        // log the error
        console.log('Error caught!');
        console.error(error);
        console.error(errorInfo);

        // record the error in an APM tool...
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}

export default ReactErrorBoundary;
