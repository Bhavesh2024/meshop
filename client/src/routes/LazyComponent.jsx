import React, { lazy, Suspense } from 'react';

// Higher-Order Component for lazy loading with dynamic imports
const LazyComponent = (importFunc, fallback = <div>Loading...</div>) => {
  const Component = lazy(importFunc);
  return (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyComponent;
