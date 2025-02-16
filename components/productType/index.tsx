import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductTabs from "./ProductTabs";
import AllProducts from "./AllProducts";
import { Products } from "@/types";
import { Box, Text } from "@chakra-ui/react";

interface ProductTypeProps {
  products: Products[];
}

const ProductType = ({ products }: ProductTypeProps) => {
  const [activeTab, setActiveTab] = useState<string>("3S");

  const handleTabClick = (index: string) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box className="prodcut-types-container">
        <motion.h2
          className="prodcut-types-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Text> Izabertie Tip</Text>
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        ></motion.h2>
        <motion.div
          className="product-tabs-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <ProductTabs activeTab={activeTab} handleTabClick={handleTabClick} />
        </motion.div>
      </Box>

      <AllProducts products={products} activeTab={activeTab} />
    </>
  );
};

export default ProductType;
