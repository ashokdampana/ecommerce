
// import React from 'react'
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import ProductsList from "./ProductsList";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { user } = useContext(AuthContext); 
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      {user ? <p>Welcome, {user.name}</p> : <p>Please login</p>}
      <ProductsList filter={category}/>
    </div>
  )
}

export default HomePage
