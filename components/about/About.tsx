import React from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

import "react-vertical-timeline-component/style.min.css";
import AboutBanner from "../../public/images/about-banner.png";

import LaserSquare from "../../public/images/laser-square.png";
import AboutMapImage from "@/public/images/about-map.jpeg";
import styles from "./styles.module.css";
import Link from "next/link";

import { useRouter } from "next/router";
import useBlurData from "@/utils/blurHash";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";

import "swiper/css";

const About = () => {
  const router = useRouter();

  const handleScroll = () => {
    router.push(`/#products`, undefined, { scroll: true });
  };

  const [blurDataUrlWoodenMap, blurDataURLLaser] = useBlurData(
    "TFEU}f~p0hwHWAt600R4^i~U^jR*, TB7TF*oG9qR;WCn.0]s=?1r_W?Su"
  );

  return (
    <>
      <Box mt={"100px"} className={styles.containerAbout}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <Box className={styles.sectionOurStory}>
            <Box className={styles.containerOurStory}>
              <h1> O nama</h1>
              <Box className={styles.contentWrapperAbout}>
                <Box className={styles.imgWrapper}>
                  <Box className={styles.imgAbout}>
                    <Image
                      src={AboutBanner}
                      className={styles.imageOurStory}
                      alt="wooden map"
                      blurDataURL={blurDataUrlWoodenMap}
                      placeholder="blur"
                    />
                  </Box>
                </Box>
                <Box className={styles.textWrapper}>
                  <Text as={"p"} className="text-about">
                    Mapola je hrvatski brend u kojem se izrađuju umjetničke
                    karte. Osnovali su ga dvojica prijatelja, Mirko i Antun,
                    koji su svoje različitosti u strastima i talentima spojili
                    da bi kreirali jedinstvene drvene karte.
                  </Text>
                  <Text as={"p"} className="text-about">
                    Mirko svoju kreativnost pronalazi eksperimentirajući s
                    materijalima i bojama, dok je moderna tehnologija Antunova
                    strast.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Stack direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={6} w={"full"} maxW={"lg"}>
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  <Text
                    as={"span"}
                    position={"relative"}
                    color={"#686461"}
                    _after={{
                      content: "''",
                      width: "full",
                      height: useBreakpointValue({ base: "20%", md: "30%" }),
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "#cead6d",
                      zIndex: -1,
                    }}
                  >
                    Jedinstvene
                  </Text>
                  <br />
                  <Text color={"#cead6d"} as={"span"}>
                    drvene karte
                  </Text>
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
                  Mapola karte izrađene su kombinacijom moderne tehnologije i
                  ručne obrade. Moderna tehnologija podrazumijeva izradu
                  digitalnog dizajna karte i lasersko graviranje na drvu, a
                  ručna obrada uključuje bojanje, ljepljenje, premazivanje i
                  brušenje.
                </Text>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <Link href="/personal-map" className={styles.designButton}>
                    Dizajniraj sam
                  </Link>
                  <button onClick={handleScroll} className={styles.orderButton}>
                    Naručite kartu
                  </button>
                </Stack>
              </Stack>
            </Flex>

            <Box className={styles.swiperContainer}>
              <SwiperComponent
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image
                    alt={"laser image"}
                    className={styles.imageContent}
                    width={430}
                    src={LaserSquare}
                    blurDataURL={blurDataURLLaser}
                    placeholder="blur"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    alt={"carved map"}
                    className={styles.imageContent}
                    width={430}
                    src={AboutMapImage}
                    blurDataURL={blurDataURLLaser}
                    placeholder="blur"
                  />
                </SwiperSlide>
              </SwiperComponent>
            </Box>
          </Stack>
        </motion.div>
      </Box>
    </>
  );
};

export default About;
