import Head from "next/head";
import { HeroHeader, FooterBanner, AnimatedText } from "@/components";
import { useEffect, useRef } from "react";
import { client } from "../lib/sanityClient";
import { Products, BannerData, FooterData } from "@/types";
import { LoadingSpinner } from "@/components/Loader";
import dynamic from "next/dynamic";
import { Box, Container, Heading } from "@chakra-ui/react";
import ProductType from "@/components/productType";
import { useStateContex } from "@/context/StateContext";

interface ServerSideProps {
  products: Products[];
  bannerData: BannerData[];
  footerData: FooterData[];
}

const ThreeModel = dynamic(() => import("@/components/ThreeModel"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Home = ({ products, bannerData, footerData }: ServerSideProps) => {
  const ref = useRef(null);

  const { setScrollHeroHeaderRef } = useStateContex();

  useEffect(() => {
    setScrollHeroHeaderRef(ref.current);
  }, []);

  return (
    <>
      <Head>
        <title>Mapola Design</title>
        <meta name="title" content="Mapola Design" />
        <meta
          name="description"
          content="Mapola je hrvatski brend za izradu umjetničkih karata. Proizvodi Mapole predstavljaju savršen poklon za ukrašavanje bilo kojeg prostora ili kao iznenađenje za najmilije."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mapola.hr/" />
        <meta property="og:title" content="Mapola Design" />
        <meta
          property="og:description"
          content="Mapola je hrvatski brend za izradu umjetničkih karata. Proizvodi Mapole predstavljaju savršen poklon za ukrašavanje bilo kojeg prostora ili kao iznenađenje za najmilije."
        />
        <meta property="og:image" content="/images/mapola-logo.png" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mapola.hr/" />
        <meta property="twitter:title" content="Mapola Design" />
        <meta
          property="twitter:description"
          content="Mapola je hrvatski brend za izradu umjetničkih karata. Proizvodi Mapole predstavljaju savršen poklon za ukrašavanje bilo kojeg prostora ili kao iznenađenje za najmilije."
        />
        <meta property="twitter:image" content="/images/mapola-logo.png" />
      </Head>
      <main>
        <HeroHeader heroHeader={bannerData && bannerData[0]} />
        {/* <Box className="animated-text-index">
          <AnimatedText
            text={"Jedinstveni spoj prirode i tehnologije kao trajna uspomena"}
          />
        </Box> */}
        <Container maxW="1024px" maxH="1024px" pt={14} ref={ref}>
          <ThreeModel />
        </Container>
        <Box className="animated-text-index" ref={ref} id="products">
          <Box>
            <AnimatedText text={"Izdvajamo iz ponude"} />
          </Box>
        </Box>
        <Box className="products-container">
          <ProductType products={products} />
        </Box>
        <FooterBanner footerBanner={footerData && footerData[0]} />
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const query =
    '*[_type == "product" && !(_id in path("drafts.**"))]{_id, image, name, slug, price, priceRange, type, details, "metaImage":metaImage.asset->{url,metadata {blurhash, lqip}}}';
  const products = await client.fetch(query);

  const bannerQuery =
    '*[_type == "banner"]{_id, discount, largeText1, largeText2, saleTime, slug, smallText, midText, desc, image, product, buttonText, "metaImage":metaImage.asset->{url,metadata {blurhash, lqip}}}';
  const bannerData = await client.fetch(bannerQuery);

  const footerQuery =
    '*[_type == "footer"]{_id, discount, largeText1, largeText2, saleTime, smallText, midText, desc, image, product, buttonText, "metaImage":metaImage.asset->{url,metadata {blurhash, lqip}}}';
  const footerData = await client.fetch(footerQuery);

  return {
    props: { products, bannerData, footerData },
  };
};

export default Home;
