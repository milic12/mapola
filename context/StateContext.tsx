import { Products } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IMapLocation } from "@/types";
import {
  User,
  onAuthStateChanged,
  onIdTokenChanged,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-config";
import nookies from "nookies";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "next/router";

interface UserContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setMapPinLocation: React.Dispatch<React.SetStateAction<IMapLocation>>;
  setScrollHeroHeaderRef: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
  cartItems: Products[];
  totalPrice: number | null;
  totalQuantities: number | null;
  quantity: number | 1;
  mapPinLocation: IMapLocation;
  scrollHeroHeaderRef: HTMLDivElement | null;

  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  signOutUser: () => void;
  onAdd: (product: Products, quantityAdded: number) => any;
  toggleCartItemQuanitity: (id: number, value: string) => any;
  onRemove: (product: Products) => any;
  user: User | null;
  userId: string | undefined;
}
const iUserContextState = {
  showCart: false,
  setShowCart: () => {},
  setMapPinLocation: () => {},
  setScrollHeroHeaderRef: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  quantity: 0,
  mapPinLocation: { lat: 0, lng: 0 },
  scrollHeroHeaderRef: null,

  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  signOutUser: () => {},
  onAdd: () => {},
  toggleCartItemQuanitity: () => {},
  onRemove: () => {},
  user: null,
  userId: "",
};
const Context = createContext<UserContextType>(iUserContextState);

export const StateContex = ({ children }: any) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Products[] | any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [quantity, setQuantity] = useState<any>(1);
  const [mapPinLocation, setMapPinLocation] = useState<IMapLocation>({
    lat: 0,
    lng: 0,
  });
  const [scrollHeroHeaderRef, setScrollHeroHeaderRef] =
    useState<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof (window || undefined) !== "undefined") {
      const cartItemsFromStorage = JSON.parse(
        (typeof window !== "undefined" &&
          window.localStorage.getItem("cartItems")) ||
          "[]"
      );
      const totalPriceFromStorage = JSON?.parse(
        (typeof window !== "undefined" &&
          window.localStorage.getItem("totalPrice")) ||
          "0"
      );
      const totalQuantitiesFromStorage = JSON.parse(
        (typeof window !== "undefined" &&
          localStorage.getItem("totalQuantities")) ||
          "0"
      );
      const quantityFromStorage = JSON.parse(
        (typeof window !== "undefined" &&
          window.localStorage.getItem("quantity")) ||
          "0"
      );
      if (totalQuantitiesFromStorage) {
        setTotalQuantities(totalQuantitiesFromStorage || 0);
      }
      if (totalPriceFromStorage) {
        setTotalPrice(totalPriceFromStorage || 0);
      }
      if (cartItemsFromStorage) {
        setCartItems(cartItemsFromStorage || []);
      }

      if (quantityFromStorage) {
        setQuantity(quantityFromStorage || 1);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [totalQuantities, totalPrice]);

  //firebase auth user
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        setUserId(user.uid);
        nookies.set(undefined, "token", token, { path: "/" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // force refresh the token every 10 minutes
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     if (user) {
  //       const token = await user.getIdToken();
  //       nookies.set(undefined, "token", token, { path: "/" });
  //     } else {
  //       nookies.set(undefined, "token", "", { path: "/" });
  //     }
  //   }, 0.2 * 60 * 1000);

  //   return () => clearInterval(handle);
  // }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  let foundProduct: any;

  const onAdd = (product: Products, quantityAdded: number) => {
    const checkProductInCart = cartItems?.find(
      (item: any) => item?._id === product._id && item.name === product.name
    );

    setTotalPrice(
      (previousTotalPrice) => previousTotalPrice + product.price * quantityAdded
    );
    const onAddQuantities = (prevoiusTotalQuantities: number) =>
      prevoiusTotalQuantities + quantityAdded;

    setTotalQuantities(
      (prevoiusTotalQuantities) => prevoiusTotalQuantities + quantityAdded
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems?.map((cartProduct) => {
        console.log("cartProduct", cartProduct);
        if (
          cartProduct._id == product._id &&
          cartProduct.name == product.name
        ) {
          return {
            ...cartProduct,
            quantityAdded: cartProduct.quantityAdded + quantityAdded,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCartItems)
      );
    } else {
      product.quantityAdded = quantityAdded;

      setCartItems([...cartItems, { ...product }]);
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...product }])
      );
    }

    toast.success(`${quantityAdded} ${product.name} karta dodana u košaricu.`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onRemove = (product: Products) => {
    foundProduct = cartItems.find(
      (item) => item._id === product._id || item.name === product.name
    );
    const updatedData = cartItems.filter(
      (item) => item._id !== product._id || item.name !== product.name
    );

    typeof window !== "undefined" &&
      window.localStorage.setItem("totalPrice", JSON.stringify(0));

    setTotalPrice(
      (previousTotalPrice) =>
        previousTotalPrice - foundProduct.price * foundProduct.quantityAdded
    );

    setTotalQuantities(
      (previousTotalQuantities) =>
        previousTotalQuantities - foundProduct.quantityAdded
    );

    typeof window !== "undefined" &&
      window.localStorage.setItem("totalQuantities", JSON.stringify(0));

    setCartItems(updatedData);
    typeof window !== "undefined" &&
      window.localStorage.setItem("cartItems", JSON.stringify(updatedData));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity: number) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity: number) => {
      if (prevQuantity - 1 < 1) {
        return 1;
      } else return prevQuantity - 1;
    });
  };

  const toggleCartItemQuanitity = (id: number, value: string) => {
    foundProduct = cartItems.find((item) => item._id === id);

    if (value === "increment") {
      const updatedData = cartItems.map((item) =>
        item._id === id
          ? { ...item, quantityAdded: item.quantityAdded + 1 }
          : item
      );

      setCartItems(updatedData);

      typeof window !== "undefined" &&
        window.localStorage.setItem("cartItems", JSON.stringify(updatedData));

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "decrement") {
      if (foundProduct.quantityAdded > 1) {
        const updatedData = cartItems.map((item) =>
          item._id === id
            ? { ...item, quantityAdded: item.quantityAdded - 1 }
            : item
        );
        setCartItems(updatedData);
        typeof window !== "undefined" &&
          window.localStorage.setItem("cartItems", JSON.stringify(updatedData));

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setMapPinLocation,
        mapPinLocation,
        scrollHeroHeaderRef,
        setScrollHeroHeaderRef,
        user,
        userId,
        signOutUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContex = () => useContext(Context);
