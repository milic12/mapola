import { client, urlFor } from "@/lib/sanityClient";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import styles from "./styles.module.css";
const ImageModal = ({ image, isOpen, onClose, name }: any) => {
  const [index, setIndex] = useState(0);
  const imageProps = Object.assign(
    {},
    useNextSanityImage(client, image && image[index])
  );
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              // @ts-ignore
              {...imageProps}
              className={styles.productDetailImageModal}
              alt="product image"
            />
            <Box className={styles.smallImagesContainer}>
              {image?.map((item: string, i: number) => (
                <Image
                  key={i}
                  src={urlFor(item).url()}
                  width="100"
                  height="100"
                  className={`
                    ${i === index} ? ${styles.selectedImage} : ${
                    styles.smallImage
                  }`}
                  onMouseEnter={() => setIndex(i)}
                  alt="product image"
                />
              ))}
            </Box>
          </ModalBody>

          <ModalFooter className={styles.buttons}>
            <Button className={styles.closeImageModal} mr={3} onClick={onClose}>
              Zatvori
            </Button>
            <Button type="button" className={styles.orderButton}>
              Naruči
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
