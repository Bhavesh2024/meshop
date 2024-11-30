import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [count, setCount] = useState({
    user: 0,
    product: 0,
    smartphone: 0,
    smartTv: 0,
    headphone: 0,
  });

  // Fetch count data from a single API call
  const getCount = async (url, key) => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const value = response.data;
        return value.length;  // Return the length of the data
      }
    } catch (e) {
      console.error(e);
    }
    return 0;  // Return 0 if something goes wrong
  };

  const lengthRouteList = [
    { url: "http://localhost:5000/api/users", key: "user" },
    { url: "http://localhost:5000/api/products/category/smartphones", key: "smartphone" },
    { url: "http://localhost:5000/api/products/category/smartTvs", key: "smartTv" },
    { url: "http://localhost:5000/api/products/category/headphones", key: "headphone" },
  ];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch counts for each category (users, smartphones, smartTvs, headphones)
        const userCount = await getCount(lengthRouteList[0].url, "user");
        const smartphoneCount = await getCount(lengthRouteList[1].url, "smartphone");
        const smartTvCount = await getCount(lengthRouteList[2].url, "smartTv");
        const headphoneCount = await getCount(lengthRouteList[3].url, "headphone");

        // Calculate the total product count by summing the counts of each subcategory
        const productCount = smartphoneCount + smartTvCount + headphoneCount;

        // Update state with the counts
        setCount({
          user: userCount,
          product: productCount,
          smartphone: smartphoneCount,
          smartTv: smartTvCount,
          headphone: headphoneCount,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);  // Empty dependency array ensures this runs once on mount

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 place-items-center gap-7">
      {/* Product Count */}
      <div className="h-48 w-48 bg-indigo-700 text-gray-50 rounded-md flex flex-col gap-3 items-center justify-center">
        <span className="text-4xl">{count.product}</span>
        <span className="text-2xl">Product</span>
      </div>

      {/* User Count */}
      <div className="h-48 w-48 bg-indigo-700 text-gray-50 rounded-md flex flex-col gap-3 items-center justify-center">
        <span className="text-4xl">{count.user}</span>
        <span className="text-2xl">User</span>
      </div>

      {/* Smartphone Count */}
      <div className="h-48 w-48 bg-indigo-700 text-gray-50 rounded-md flex flex-col gap-3 items-center justify-center">
        <span className="text-4xl">{count.smartphone}</span>
        <span className="text-2xl">Smartphone</span>
      </div>

      {/* Smart TV Count */}
      <div className="h-48 w-48 bg-indigo-700 text-gray-50 rounded-md flex flex-col gap-3 items-center justify-center">
        <span className="text-4xl">{count.smartTv}</span>
        <span className="text-2xl">Smart TV</span>
      </div>

      {/* Headphone Count */}
      <div className="h-48 w-48 bg-indigo-700 text-gray-50 rounded-md flex flex-col gap-3 items-center justify-center">
        <span className="text-4xl">{count.headphone}</span>
        <span className="text-2xl">Headphone</span>
      </div>
    </div>
  );
};

export default Dashboard;
