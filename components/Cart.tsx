import { useStateContex } from "@/context/StateContext";
import getStripe from "@/lib/getStripe";
import { urlFor } from "@/lib/sanityClient";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContex();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    try {
      const response = axios.post("/api/stripe", cartItems, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      console.log("response", response);
      const data = (await response).data;
      toast.info("Preusmjeravanje na plaćanje", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("response:", data);
      stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="cart-wrapper" /* ref={cartRef} */>
      <Box className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <Text className="heading">Vaša košarica</Text>
          <Text className="cart-num-items">({totalQuantities} items)</Text>
        </button>
        {cartItems && cartItems.length < 1 && (
          <Box className="empty-cart">
            <Box className="cart-icon">
              <AiOutlineShoppingCart size={150} color="#686461" />
            </Box>
            <Text className="cart-empty-text">Vaša košarica je prazna</Text>

            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="empty-cart-button"
            >
              Nastavi kupovinu
            </button>
          </Box>
        )}
        <Box className="product-container">
          {cartItems &&
            cartItems.length >= 1 &&
            cartItems.map((item) => (
              <Box className="product" key={item?._id}>
                {item?.image[0] && (
                  <Image
                    src={urlFor(item?.image[0])?.url() || ""}
                    width="100"
                    height="100"
                    className="cart-product-image"
                    alt="cart images"
                  />
                )}
                <Box className="item-desc">
                  <Box className="flex top">
                    <Text as="h5">{item?.name}</Text>
                    <Text as="h4">€{item?.price}</Text>
                  </Box>
                  <Box className="flex bottom">
                    <Box>
                      <Text as="p" className="quantity-desc">
                        <Text
                          as="span"
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, "decrement")
                          }
                        >
                          <AiOutlineMinus />
                        </Text>
                        <Text as="span" className="num">
                          {item?.quantityAdded}
                        </Text>
                        <Text
                          as="span"
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, "increment")
                          }
                        >
                          <AiOutlinePlus />
                        </Text>
                      </Text>
                    </Box>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </Box>
                </Box>
              </Box>
            ))}
          {cartItems && cartItems.length >= 1 && (
            <Box className="cart-bottom">
              <Box className="total">
                <Text as="h3">Ukupno:</Text>
                <Text as="h3">€{totalPrice}</Text>
              </Box>
              <Box className="btn-container">
                <button
                  type="button"
                  className="empty-cart-button"
                  onClick={handleCheckout}
                >
                  Online plaćanje
                </button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
