import { client, urlFor } from "@/lib/sanityClient";
import { useState, useEffect } from "react";
import { Products } from "@/types";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  Box,
  Checkbox,
  Heading,
  Select,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Product } from "@/components";
import ImageModal from "@/components/imageModal/ImageModal";
import { useStateContex } from "@/context/StateContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import YellowFrame from "../../public/images/frames/yellow-wood.jpg";
import MahagonijFrame from "../../public/images/frames/mahagonij.jpg";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
interface ProductDetailsProps {
  products: Products[];
  product: Products;
}

interface getStaticProps {
  params: {
    slug: {
      current: string;
      _type: string;
    };
  };
}

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

var settingsForMultiple = {
  dots: true,
  infinite: false,
  arrows: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProductDetails = ({ product, products }: ProductDetailsProps) => {
  const {
    image,
    metaImage,
    name,
    details,
    price,
    priceRange,
    type,
    description,
    dimensions,
  } = product;
  const [index, setIndex] = useState(0);
  const [frameName, setframeName] = useState<string>("");
  const [productUpdated, setProductUpdated] = useState(product);
  const [priceFrameUpdate, setPriceFrameUpdate] = useState<number>(0);
  const [dimensionsName, setDimensionsName] = useState<string>("");
  const [dimensionsValue, setDimensionsValue] = useState<string>("");
  const [checkedGift, setCheckedGift] = useState<boolean>(false);
  const [priceGiftUpdate, setPriceGiftUpdate] = useState<number>(0);
  const [giftName, setGiftName] = useState<string>("");
  const router = useRouter();

  const imageProps = Object.assign(
    {},
    useNextSanityImage(client, image && image[index])
  );
  const starArray = [...Array.from(Array(5).keys())].map((i) => i + 1);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { decreaseQuantity, increaseQuantity, quantity, onAdd, setShowCart } =
    useStateContex();

  const handleSelectFrame = (frameName: string) => {
    if (frameName === "mahagonij") {
      setframeName(" -Mahagonij");

      setProductUpdated((previousProduct) => ({
        ...previousProduct,
        name: name.concat("- Mahagonij" + dimensionsName),
      }));
    }
    if (frameName === "yellow") {
      setframeName("- Paulonija");

      setProductUpdated((previousProduct) => ({
        ...previousProduct,
        name: name.concat("- Paulonija" + dimensionsName),
      }));
    } else if (frameName === "default") {
      setProductUpdated((previousProduct) => ({
        ...previousProduct,
        name: name.concat(""),
      }));
    }
  };

  useEffect(() => {
    // setframeName(name);
    setProductUpdated(product);
  }, [name, product]);

  const handleBuy = (e: any) => {
    e.preventDefault();
    onAdd(productUpdated, quantity);
    setShowCart(true);
  };

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    onAdd(productUpdated, quantity);
  };

  const [slider, setSlider] = useState<Slider | any>(null);

  const handleDimensionsPrice = (e: any, checkedGiftState: boolean) => {
    const value = e;
    const isGiftSelected = checkedGiftState ? 10 : 0;
    const isGiftNameSelected = checkedGiftState ? "- poklon pakiranje" : "";

    switch (value) {
      case "22x17":
        setDimensionsName("-22x17cm");
        setGiftName(isGiftNameSelected);

        setPriceGiftUpdate(isGiftSelected);
        setPriceFrameUpdate(0);
        setProductUpdated((previousProduct) => ({
          ...previousProduct,
          price: price + isGiftSelected,
          name: name.concat(frameName + "- 22x17 cm" + isGiftNameSelected),
        }));
        break;
      case "27x22":
        setDimensionsName("-27x22cm");
        setGiftName(isGiftNameSelected);

        setPriceGiftUpdate(isGiftSelected);
        setPriceFrameUpdate(25);
        setProductUpdated((previousProduct) => ({
          ...previousProduct,
          price: price + 25 + isGiftSelected,
          name: name.concat(frameName + "- 27x22 cm" + isGiftNameSelected),
        }));
        break;
      case "30x30":
        setDimensionsName("-30x30 cm");
        setPriceGiftUpdate(isGiftSelected);
        setPriceFrameUpdate(55);
        setProductUpdated((previousProduct) => ({
          ...previousProduct,
          price: price + 55,
          name: name.concat(frameName + "- 30x30 cm"),
        }));
        break;
      case "40x30":
        setDimensionsName("-40x30 cm");
        setPriceGiftUpdate(isGiftSelected);
        setPriceFrameUpdate(85);
        setProductUpdated((previousProduct) => ({
          ...previousProduct,
          price: price + 85,
          name: name.concat(frameName + "-40x30 cm"),
        }));
        break;
      case "40x40":
        setDimensionsName("-40x40 cm");
        setPriceGiftUpdate(isGiftSelected);
        setPriceFrameUpdate(115);
        setProductUpdated((previousProduct) => ({
          ...previousProduct,
          price: price + 115,
          name: name.concat(frameName + "-40x40 cm"),
        }));
        break;
      default:
    }
  };
  // set default value in select dimensions dropdown
  // if there is change in slug/product
  useEffect(() => {
    setDimensionsValue("");
  }, [router.query.slug]);

  //check if seleced option has addtional gift bag
  const isGiftDimension =
    dimensionsValue.includes("27x22") || dimensionsValue.includes("22x17");

  //turn off checked gift box on dimension change
  useEffect(() => {
    setCheckedGift(false);
  }, [dimensionsValue]);

  return (
    <Box>
      {/* <ToastContainer /> */}

      <Box className="product-detail-container">
        <Box className="product-image-section">
          <Box className="image-container" onClick={() => onOpen()}>
            <Image
              // @ts-ignore
              {...imageProps}
              className="product-detail-image"
              alt="product image"
              placeholder="blur"
              blurDataURL={metaImage?.metadata.lqip}
            />
          </Box>
          <ImageModal
            isOpen={isOpen}
            onClose={onClose}
            name={name}
            image={image}
          />
          <Box className="small-images-container">
            {image?.map((item: string, i: number) => (
              <Image
                key={i}
                src={urlFor(item).url()}
                width="100"
                height="100"
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt="product image"
              />
            ))}
          </Box>
        </Box>

        <Box className={styles.productDetailDesc}>
          <Text as="h1">{name + frameName + dimensionsName + giftName}</Text>
          <Box className="reviews"></Box>
          <Text as="h4">Opis: </Text>
          <Text as="p">{details}</Text>
          {description &&
            description.map((item: any, i: number) => (
              <Box key={i} className={styles.boxDescriptionText}>
                <Box
                  className={` ${
                    item.children[0]?.marks.includes("strong", "underline")
                      ? "underline-product-text bold-product-text"
                      : ""
                  }
                      ${
                        item.children[0]?.marks.includes("strong")
                          ? "bold-product-text"
                          : ""
                      }
                      ${
                        item.children[0]?.marks.includes("underline")
                          ? "underline-product-text"
                          : ""
                      }`}
                >
                  {item.style === "normal" ? (
                    <>
                      {item.listItem === "bullet" ? (
                        <ul>
                          <li>{item.children[0].text}</li>
                        </ul>
                      ) : (
                        <p>{item.children[0].text}</p>
                      )}
                    </>
                  ) : (
                    <Heading as={item.style}>{item.children[0].text}</Heading>
                  )}
                </Box>
                <span
                  className={
                    item.children[1]?.marks[0] === "underline"
                      ? "underline-product-text"
                      : ""
                  }
                >
                  {item.children[1]?.text}
                </span>
                <span
                  className={
                    item.children[2]?.marks[0] === "strong"
                      ? "bold-product-text"
                      : ""
                  }
                >
                  {item.children[2]?.text}
                </span>
              </Box>
            ))}
          <Text>
            Tip: <span className="product-name">{type}</span>
          </Text>
          <Select
            className="select-dimensions-slug"
            value={dimensionsValue}
            onChange={(event: any) => {
              setDimensionsValue(event?.target.value);
              handleDimensionsPrice(event?.target.value, false);
            }}
          >
            <option hidden value="">
              Odaberite dimenzije
            </option>
            <option value="22x17" disabled={!dimensions?.first}>
              22x17 cm
            </option>
            <option value="27x22" disabled={!dimensions?.second}>
              27x22 cm
            </option>
            <option value="30x30" disabled={!dimensions?.third}>
              30x30 cm
            </option>
            <option value="40x30" disabled={!dimensions?.forth}>
              40x30 cm
            </option>
            <option value="40x40" disabled={!dimensions?.fifth}>
              40x40 cm
            </option>
          </Select>
          {isGiftDimension ? (
            <Box className={styles.giftCheckBox}>
              <Checkbox
                isChecked={checkedGift}
                onChange={(event) => {
                  setCheckedGift(event.target.checked);
                  handleDimensionsPrice(dimensionsValue, event.target.checked);
                }}
              >
                Želim poklon pakiranje +10€
              </Checkbox>
            </Box>
          ) : (
            <></>
          )}
          <Box>
            <Text as="p" className="product-name">
              Izaberte okvir:
            </Text>
            <Box className="frame-button">
              <button
                onClick={() => handleSelectFrame("mahagonij")}
                className="choose-frame-button"
              >
                <Image
                  src={MahagonijFrame}
                  width="100"
                  height="100"
                  alt="frame-edge"
                />
              </button>
              <button
                onClick={() => handleSelectFrame("yellow")}
                className="choose-frame-button"
              >
                <Image
                  src={YellowFrame}
                  width="100"
                  height="100"
                  alt="frame-edge"
                />
              </button>
              <button
                onClick={() => handleSelectFrame("default")}
                className="choose-frame-button"
              ></button>
            </Box>
          </Box>
          <Text as="p" className={styles.price}>
            €{price + priceFrameUpdate + priceGiftUpdate}
          </Text>
          <Box className={styles.quantity}>
            <Text as="h3">Količina:</Text>
            <Text as="p" className={styles.quantityDesc}>
              <Text
                as="span"
                className={styles.minus}
                onClick={decreaseQuantity}
              >
                <AiOutlineMinus />
              </Text>
              <Text as="span" className={styles.num}>
                {quantity}
              </Text>
              <Text
                as="span"
                className={styles.plus}
                onClick={increaseQuantity}
              >
                <AiOutlinePlus />
              </Text>
            </Text>
          </Box>
          <Box className={styles.buttons}>
            <button
              type="button"
              className={styles.addToCart}
              onClick={handleAddToCart}
            >
              Dodaj u košaricu
            </button>
            <button type="button" className={styles.buyNow} onClick={handleBuy}>
              Naruči
            </button>
          </Box>
        </Box>
      </Box>
      <Box className="maylike-products-wrapper">
        <Text as="h2">Možda će vam se također svidjeti:</Text>
        <Box className="marquee2">
          <Box>
            <Slider ref={slider} {...settingsForMultiple}>
              {products.map((item) => (
                <div
                  key={item._id}
                  style={{
                    height: "450px",
                  }}
                >
                  <Product key={item._id} products={item} />
                </div>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type =="product"]{
    slug{
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product: Products) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }: getStaticProps) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{_id, image, name, slug, price, type, details, description, reviews, stars, dimensions, "metaImage":metaImage.asset->{url,metadata {blurhash, lqip}}}`;
  const productsQuery =
    '*[_type =="product"]{_id, image, name, slug, price, priceRange, details, description, dimensions, "metaImage":metaImage.asset->{url,metadata {blurhash, lqip}}}';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
