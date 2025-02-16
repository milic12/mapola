import React, { useEffect } from "react";
import Product from "../Product";
import { Products } from "@/types";

interface AllProductsProps {
  activeTab: any;
  products: Products[];
}

const AllProducts = ({ activeTab, products }: AllProductsProps) => {
  return (
    <>
      {products &&
        products?.map((product) => (
          <div key={product._id}>
            {product.type === activeTab && (
              <Product key={product._id} products={product} />
            )}
          </div>
        ))}
    </>
  );
};

export default AllProducts;
