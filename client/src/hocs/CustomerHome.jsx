import React from 'react';
import { useParams } from 'react-router-dom';


const CustomerHome = (Home) => {
  const CustomComponent = Home;
  return (props) => (
    <div>
      {/* Render the passed component (Home) as JSX */}
      <CustomComponent {...props} withCarousel={true}/>

      {/* Render nested routes using Outlet */}
      {/* <Outlet /> */}
    </div>
  );
};

export default CustomerHome;
