import { BannerData } from "@/types";
import { Box, Text } from "@chakra-ui/react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../lib/sanityClient";
import Carousel, { CarouselItem } from "../SimpleCarusel";
import Typewriter from "typewriter-effect";
import { useRef } from "react";
import { useStateContex } from "@/context/StateContext";
import style from "./styles.module.css";
import BackImage from "../../public/images/banner-background.png";
import BlurImage from "../../public/images/admin.png";
import useBlurData from "@/utils/blurHash";
interface BannerProps {
  heroHeader: BannerData;
}

const HeroHeader = ({ heroHeader }: BannerProps) => {
  const { image, metaImage, slug } = heroHeader;

  const imageProps = Object.assign(
    {},
    useNextSanityImage(client, image && image)
  );

  const { scrollHeroHeaderRef } = useStateContex();

  const handleScroll = () => {
    scrollHeroHeaderRef &&
      scrollHeroHeaderRef.scrollIntoView({ behavior: "smooth" });
  };

  const [blurDataUrl] = useBlurData(
    "eDF}Ag00?]Qm^%R5x]E1%1EO0-}:NHkCsRBX,mS%nNg4t6r=S$R+oJ"
  );

  return (
    <>
      <Carousel>
        <CarouselItem>
          {/* <Box className="clipped"> */}
          <Box className={style.firstCaruselHero}>
            <Image
              alt="cover image"
              src={BackImage}
              fill
              className={style.bannerImage}
              blurDataURL={blurDataUrl}
              placeholder="blur"
            />
            <Box className={style.heroBannerText}>
              <Text as="h2" style={{ fontWeight: "800", color: "white" }}>
                {/*  {heroHeader.midText} */}
                Mapola Design
              </Text>
              <Text as="h3" style={{ fontWeight: "800", color: "white" }}>
                Jedinstveni spoj
                <Typewriter
                  options={{
                    strings: ["prirode", "tradicije", "ljubavi"],
                    autoStart: true,
                    loop: true,
                  }}
                />
                i tehnologije kao trajna uspomena
              </Text>

              <Text>{heroHeader.largeText1}</Text>

              <button type="button" onClick={handleScroll}>
                {heroHeader.buttonText}
              </button>
            </Box>

            {/* <Box>
              <Box className="desc">
                <Text as="h5">Opis</Text>
                <Text as="p">{heroHeader.desc}</Text>
              </Box>
            </Box> */}
          </Box>
          {/* </Box> */}
        </CarouselItem>
        {/* <CarouselItem>
          <Box className="second-carusel-hero">
            <Box className="hero-banner-text">
              <Text className="first-text">{heroHeader?.smallText}</Text>
              <Text as="h3" style={{ fontWeight: "800", color: "#686461" }}>
                Nesto
              </Text>
              <Text>{heroHeader.largeText1}</Text>
              <Text as="h1" style={{ color: "#FFF" }}>
                Nesto
              </Text>
              <button type="button" onClick={handleScroll}>
                {heroHeader.buttonText}
              </button>
            </Box>
          </Box>
        </CarouselItem> */}
        {/* <CarouselItem>Nesto 3</CarouselItem> */}
      </Carousel>
    </>
  );
};

export default HeroHeader;
