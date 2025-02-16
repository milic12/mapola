import useBlurData from "@/utils/blurHash";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import QuestionHand from "../public/images/question-mark-sign6.png";
import Image from "next/image";
const Faq = () => {
  const [blurDataUrlBanner] = useBlurData("LAIEb2~81,#j_Nm*-:xVGG%0#6El");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Box mt={"100px"}>
          <Image
            alt="cover image"
            className="faq-banner"
            src={QuestionHand}
            style={{ objectFit: "contain" }}
            blurDataURL={blurDataUrlBanner}
            placeholder="blur"
          />
          <Text as="h3" className="faq-title">
            Frequently asked questions
          </Text>
          <Container>
            <Accordion defaultIndex={[0]} allowMultiple mb={"150px"}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Kolika je cijena karata i koje su dimenzije karte?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Cijene naših karata po dimenzijama su 55 € (22x17 cc), 80 €
                  (27x22 cm), 110 € (30x30 cm), 140 € (40x30 cm) i 170 € (40x40
                  cm).
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Koliko je vrijeme izrade?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Tipično vrijeme izrade karte nakon definiranja dizajna je 3-5
                  radna dana. Karta je tada spremna za slanje, a očekivano
                  vrijeme dostave je 1-2 unutar RH. Dostavu vršimo preko
                  kurirske službe GLS-a. U slučaju žurne dostave, u napomeni
                  prilikom Vaše narudžbe naglasite rok kako bi karta stigla u
                  željeno vrijeme. Žurna narudžba ne utječe na promjenu cijene.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Kolika je cijena dostave?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Trošak dostave uključen je u cijenu za narudžbe unutar RH.
                  Trošak dostave izvan RH je prema cjeniku GLS-a:{" "}
                  <ul>
                    <ul>
                      <b>1. zona </b>(Slovenija, Mađarska, Slovačka, Austrija,
                      Češka): 18,45 €
                    </ul>
                    <ul>
                      <b>2. zona</b> (Poljska, Njemačka, Belgija, Nizozemska,
                      Luksemburg): 19,78 €
                    </ul>
                    <ul>
                      <b>3. zona</b> (Rumunjska, Italija, Bugarska, Danska,
                      Irska): 31,72 €
                    </ul>
                    <ul>
                      <b>4. zona</b> (Litva, Latvija, Estonija, Švedska, Grčka,
                      Finska, Francuska): 39,68 € 5. zona (Španjolska, Portugal,
                      Malta, Cipar - EU dio): 47,65 €
                    </ul>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Koje boje okvira imate u ponudi?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  U ponudi trenutno imamo dvije boje okvira: svijetli hrast
                  (svijetlo smeđa) rustikal (tamno smeđa)
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Koje materijale koristite?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Karta je napravljena od slojeva šperploče i postavljena u
                  drveni okvir s akrilnim staklom. Vodene površine bojane su
                  akrilnim bojama i premazane zaštitnim premazom za akrilne
                  boje. Ovisno o tipu karte, drvene površine premazane su
                  lazurom za drvo na bazi ulja. Svi korišteni materijali su
                  visoke kvalitete i dugotrajnosti.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Koje gradove imate u ponudi?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Možemo izraditi kartu bilo kojeg mjesta sukladno vašim
                  željama. Neke od naših izrađenih karata možete pronaći na
                  naslovnoj stranici.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Što podrazumijeva poklon pakiranje?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Poklon uključuje crnu luksuznu kutiju s magnetnim otvaranjem i
                  crnu ukrasnu vrećicu. Poklon pakiranje je trenutno dostupno za
                  dimenzije 22x17 cm i 27x22 cm, uz nadoplatu od 10 €.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Prodajete li digitalni dizajn karata?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Trenutno ne prodajemo digitalne verzije dizajna.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Prihvaćate li plaćanje pouzećem?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Plaćanje je moguće vršiti putem internet
                  bankarstva ili po pouzeću.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Container>
        </Box>
      </motion.div>
    </>
  );
};

export default Faq;
