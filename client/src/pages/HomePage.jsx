
// import React from 'react'
import ProductsList from "./ProductsList";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Home Page</h1>
      <ProductsList filter={category} key={category || 'all'}/>
    </div>
  )
}

export default HomePage
