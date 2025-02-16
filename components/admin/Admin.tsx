import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStateContex } from "@/context/StateContext";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "@/lib/firebase/firebase-config";
import Image from "next/image";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import ReactPaginate from "react-paginate";

const Admin = ({ props }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const { user, userId } = useStateContex();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //get data from database
  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setData([]);
      const data = snapshot.val();
      if (data !== null) {
        try {
          const dataArray = Object.keys(data).map((key) => {
            const value = data[key];
            return {
              id: key,
              date: value.date,
              formData: value.formData,
              lat: value.lat,
              lng: value.lng,
              pinLocationLat: value.pinLocationLat,
              pinLocationLng: value.pinLocationLng,
              zoomLevel: value.zoomLevel,
              image: value.image,
            };
          });

          const userData = dataArray;
          setData(userData);
        } catch (error) {
          console.log("error", error);
        }
      }
    });
  }, [userId]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 1 }}
    >
      <Box>
        <Box className={styles.adminBanner} />
        <Text as="h3" className="faq-title">
          Admin
        </Text>
        <Text as="h4" className="faq-title">
          {props.message}
        </Text>
        <Container>
          {!data.length ? (
            <Box className={styles.spinnerStyle}>
              <Spinner size="xl" />
            </Box>
          ) : (
            currentItems.map((item: any, index: number) => (
              <Accordion allowMultiple mb={"2px"} key={index}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {`${item?.formData?.userEmail} - ${item.date}`}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <span>
                      Ime i Prezime: <b>{item?.formData?.name}</b>
                    </span>
                    <br />
                    <span>
                      {" "}
                      Adresa: <b>{item?.formData?.address}</b>
                    </span>
                    <br />
                    Email: <b>{item?.formData?.userEmail}</b>
                    <br />
                    Okvir: <b>{item?.formData?.frame}</b>
                    <br />
                    Prednji Tekst: <b>{item?.formData?.frontSideText}</b>
                    <br />
                    Zadnji tekst: <b>{item?.formData?.backSideText}</b>
                    <br />
                    Dimenzije:<b>{item?.formData?.portraitDimensions}</b>
                    <br />
                    Slika:
                    {item?.image && (
                      <Image
                        src={item?.image}
                        width={300}
                        height={300}
                        alt="personal map image"
                      />
                    )}
                    <br />
                    Pozicija:
                    <b>{`/#${item?.zoomLevel}/${item?.lat}/${item?.lng}`}</b>
                    <br />
                    <br />
                    Lokacija pina:
                    <b>{`${item?.pinLocationLat} / ${item?.pinLocationLng}`}</b>
                    <br />
                    <br />
                    Poruka: <b>{item?.formData?.message}</b>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))
          )}
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(data.length / itemsPerPage)}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-number"}
            previousLinkClassName={"page-number"}
            nextLinkClassName={"page-number"}
            activeLinkClassName={"active"}
          />
        </Container>
      </Box>
    </motion.div>
  );
};

export default Admin;
