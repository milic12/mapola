import React from "react";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanityClient";
import { Products } from "@/types";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { Box, Text } from "@chakra-ui/react";

interface ProductProps {
  products: Products;
}

const Product = ({ products }: ProductProps) => {
  const { image, metaImage, name, slug, price, priceRange } = products;
  const images = { ...(image && image[0]) };
  const imageProps = useNextSanityImage(client, images);

  return (
    <Box>
      <Link href={`/product/${slug.current}`}>
        <Box className="product-card">
          <Image
            // @ts-ignore
            {...imageProps}
            style={{ width: "350px", height: "250px", objectFit: "contain" }}
            sizes="(max-width: 800px) 100vw, 800px"
            alt="product images"
            placeholder="blur"
            blurDataURL={metaImage?.metadata.lqip}
          />
          <Box className="product-desc">
            <Text as="p" className="product-name">
              {name}
            </Text>
            <Text as="p" className="product-price">
              {priceRange || price} €
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Product;
