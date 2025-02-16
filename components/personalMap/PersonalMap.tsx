import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, FC, useEffect, useRef, useCallback, Ref } from "react";
import PersonalMapForm from "../personalMapForm/PersonalMapForm";
import {
  Box,
  Button,
  Text,
  Spinner,
  RadioGroup,
  Stack,
  Radio,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import BannerImage from "../../public/images/personalised-map.png";
import YellowFrame from "../../public/images/frames/yellow-wood.jpg";
import MahagonijFrame from "../../public/images/frames/mahagonij.jpg";
import DraggableMarker from "../DraggableMarker";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { AiOutlineHeart, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { MdDisabledVisible } from "react-icons/md";
import styles from "./styles.module.css";
import { getWindowSize } from "@/utils/helpers";
import { motion } from "framer-motion";
import useBlurData from "@/utils/blurHash";

interface CameraProps {
  ready: boolean;
}

const PersonalMap = () => {
  const mapRef = useRef<L.Map>(null);

  const [selectFrame, setSelectFrame] = useState<string>("");
  const [frontSide, setFrontSide] = useState<boolean>(true);
  const [frontSideText, setFrontSideText] = useState<string>("");
  const [backSideText, setBackSideText] = useState<string>("");

  const [landScapeMode, setLandScapeMode] = useState<boolean>(false);
  const [portraitDimensions, setPortraitDimensions] = useState<string>("");

  const [loadedScreenShot, setLoadedScreenShot] = useState<boolean>(false);
  const [screenShotImage, setScreenShotImage] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [disableChanges, setDisableChanges] = useState<boolean>(false);

  const [mapPin, setMapPin] = useState<string>("default");
  const [mapInfo, setMapInfo] = useState<L.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(6);

  const [position, setPosition] = useState<L.LatLng | null>(
    mapInfo && mapInfo.getCenter()
  );
  const [windowSize, setWindowSize] = useState<{
    innerHeight: number;
    innerWidth: number;
  }>(getWindowSize());

  const Camera: FC<CameraProps> = ({ ready }) => {
    const map = useMap();

    if (ready && disableChanges) {
      const simpleMapScreenshoter = new SimpleMapScreenshoter({
        hidden: true, // hide screen btn on map
      }).addTo(map);

      simpleMapScreenshoter
        .takeScreen("image")
        .then((image: any) => {
          setScreenShotImage(image);
          setLoadedScreenShot(false);
          setLoadingImage(false);
        })
        .catch((e) => {
          console.log("error in simpleMapScreenshoter", e.toString());
          setLoadedScreenShot(false);
          setLoadingImage(false);
        });
    }
    // }
    return null;
  };

  // const dowloadImage = () => {
  //   var a = document.createElement("a");
  //   a.href = screenShotImage;
  //   a.download = "Mapola.png";
  //   a.click();
  // };

  const handleSelectFrame = (frameName: string) => {
    if (frameName === "Rustikal") {
      setSelectFrame("Rustikal");
    } else if (frameName === "Svijetli hrast") {
      setSelectFrame("Svijetli hrast");
    }
  };

  const handleFrontTextChange = (e: any) => {
    e.preventDefault();
    setFrontSideText(e.target.value);
  };

  const handleBackTextChange = (e: any) => {
    e.preventDefault();
    setBackSideText(e.target.value);
  };

  const handleScreenShot = () => {
    setLoadedScreenShot(true);
    setLoadingImage(true);
  };

  const handleSelectDimensions = (event: any) => {
    setPortraitDimensions(event?.target?.value);

    if (
      event?.target?.value === "22x17 cm" ||
      event?.target?.value === "27x22 cm" ||
      event?.target?.value === "40x30 cm"
    ) {
      setLandScapeMode(true);
    } else {
      setLandScapeMode(false);
    }
  };

  const lockChanges = () => {
    setDisableChanges(true);
    setLoadedScreenShot(true);
    setLoadingImage(true);
    setFrontSide(true);
  };
  const unLockChanges = () => {
    setDisableChanges(false);
    setLoadedScreenShot(false);
    setLoadingImage(false);
    setScreenShotImage("");
    removeCameraDiv();
  };

  const removeCameraDiv = () => {
    const elements = document.getElementsByClassName(
      "leaflet-control-simpleMapScreenshoter leaflet-control"
    );

    if (elements.length > 1) {
      // Start from the second element and remove them
      for (let i = 1; i < elements.length; i++) {
        elements[i].parentNode?.removeChild(elements[i]);
      }
    }
  };

  const DisplayPosition = ({ map }: any) => {
    const onMove = useCallback(() => {
      setPosition(map.getCenter());
      setZoomLevel(map.getZoom());
    }, [map]);

    useEffect(() => {
      map.on("move", onMove);
      return () => {
        map.off("move", onMove);
      };
    }, [map, onMove]);

    return null;
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [blurDataUrlBanner] = useBlurData("LAD0JyObrC~A=wx^={$%8^-Qo}W?");

  const selectMapDesign =
    selectFrame === "Rustikal"
      ? process.env.NEXT_PUBLIC_REACT_LEAFLET_RUSTIKAL
      : process.env.NEXT_PUBLIC_REACT_LEAFLET_HRAST;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Box>
          <Box className="peronal-map-banner-container">
            <Box className="personal-map-text">
              <Text as="h1">Izradi svoju kartu</Text>
              <Box className="second-banner-text">
                <Text as="h2" style={{ color: "#FFF" }}>
                  Odaberi lokaciju 📍,
                </Text>
                <Text as="h2" style={{ color: "#FFF" }}>
                  napiši tekst na prednjoj strani i poleđini karte
                </Text>
              </Box>
            </Box>

            <Box className="peronal-map-banner-image">
              <Image
                src={BannerImage}
                width="0"
                height="0"
                sizes="100vw"
                alt="header image"
                blurDataURL={blurDataUrlBanner}
                placeholder="blur"
              />
            </Box>
          </Box>
          <Box className="hero-banner-image"></Box>
          <Box /* className="personal-card-container" */ id="map">
            <Box
              className={`${
                disableChanges
                  ? styles.lockChanges
                  : styles.personalCardContainer
              }`}
            >
              <Text as="p" className={styles.productMapText}>
                Odaberi Stranu
              </Text>
              <Box className={styles.frontBackButtons}>
                <Button
                  onClick={() => setFrontSide(true)}
                  className="front-button"
                >
                  Prednja strana
                </Button>
                <Button onClick={() => setFrontSide(false)}>
                  Zadnja strana
                </Button>
              </Box>
              <Text as="p" className={styles.productMapText}>
                Odaberi željeni model/dimenzije
              </Text>
              <Select
                placeholder="Odaberite dimenzije"
                onChange={() => handleSelectDimensions(event)}
                value={portraitDimensions}
              >
                <option value="22x17 cm">22x17 cm</option>
                <option value="27x22 cm">27x22 cm</option>
                <option value="30x30 cm">30x30 cm</option>
                <option value="40x30 cm">40x30 cm</option>
                <option value="40x40 cm">40x40 cm</option>
              </Select>
              <Text as="p" className={styles.productMapText}>
                Odaberi svoj željeni pin
              </Text>
              <RadioGroup
                onChange={setMapPin}
                value={mapPin}
                className="select-pin"
              >
                <Stack direction="row">
                  <Radio value="default">
                    <MdDisabledVisible size={25} />
                  </Radio>
                  <Radio value="love">
                    <AiOutlineHeart size={25} />
                  </Radio>
                  <Radio value="pin">
                    <IoLocationOutline size={25} />
                  </Radio>
                </Stack>
              </RadioGroup>

              <Box className="front-back-frames">
                {frontSide ? (
                  <Box
                    className={
                      selectFrame === "Rustikal"
                        ? landScapeMode
                          ? styles.mapContainerDarkLandscape
                          : styles.mapContainerDark
                        : landScapeMode
                        ? styles.mapContainerYellowLandscape
                        : styles.mapContainerYellow
                    }
                  >
                    <MapContainer
                      zoomControl={false}
                      scrollWheelZoom={!disableChanges}
                      doubleClickZoom={!disableChanges}
                      touchZoom={!disableChanges}
                      boxZoom={!disableChanges}
                      style={{ height: "100%" }}
                      center={
                        position
                          ? [position.lat, position.lng]
                          : [43.509, 16.44]
                      }
                      zoom={zoomLevel ? zoomLevel : 6}
                      ref={setMapInfo}
                    >
                      {!disableChanges && <ZoomControl />}
                      <TileLayer
                        attribution="&copy; Mapola Design"
                        url={selectMapDesign || ""}
                      />
                      {mapInfo ? <DisplayPosition map={mapInfo} /> : null}
                      {mapPin !== "default" && zoomLevel > 6 && (
                        <DraggableMarker
                          mapPin={mapPin}
                          screenWidth={windowSize.innerWidth}
                        />
                      )}
                      <Camera ready={loadedScreenShot} />
                    </MapContainer>
                    <Box
                      className={
                        landScapeMode
                          ? "front-text-map-landscape"
                          : "front-text-map"
                      }
                    >
                      <input
                        placeholder="Dodaj text"
                        onChange={(e) => handleFrontTextChange(e)}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className={
                      selectFrame === "Rustikal"
                        ? landScapeMode
                          ? styles.mapContainerDarkBackLandscape
                          : styles.mapContainerDarkBack
                        : landScapeMode
                        ? styles.mapContainerYellowBackLandscape
                        : styles.mapContainerYellowBack
                    }
                  >
                    <Box
                      className={
                        landScapeMode
                          ? "back-text-map-landscape"
                          : "back-text-map"
                      }
                    >
                      <input
                        placeholder="Dodaj text"
                        onChange={(e) => handleBackTextChange(e)}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
              <Text as="p" className={styles.productMapText}>
                Izaberite okvir:
              </Text>
              <Box className="frame-button">
                <button
                  onClick={() => handleSelectFrame("Rustikal")}
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
                  onClick={() => handleSelectFrame("Svijetli hrast")}
                  className="choose-frame-button"
                >
                  <Image
                    src={YellowFrame}
                    width="100"
                    height="100"
                    alt="frame-edge"
                  />
                </button>
              </Box>
            </Box>
            <Box className={styles.formAndButtons}>
              {loadingImage ? (
                <Spinner className={styles.spinnerLockLoading} />
              ) : (
                <Box className={styles.lockChangesButtons}>
                  {!disableChanges && (
                    <Box className="front-back-buttons">
                      <Button onClick={lockChanges}>
                        Spremi promjene
                        <AiFillLock size={20} className={styles.lockIcons} />
                      </Button>
                    </Box>
                  )}
                  {disableChanges && (
                    <Box className="front-back-buttons">
                      <Button onClick={unLockChanges}>
                        Dodaj promjene
                        <AiFillUnlock size={20} className={styles.lockIcons} />
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
              <Box className="personal-map-form">
                <PersonalMapForm
                  selectFrame={selectFrame}
                  setSelectFrame={setSelectFrame}
                  frontSideText={frontSideText}
                  setFrontSideText={setFrontSideText}
                  backSideText={backSideText}
                  setBackSideText={setBackSideText}
                  portraitDimensions={portraitDimensions}
                  setPortraitDimensions={setPortraitDimensions}
                  screenShotImage={screenShotImage}
                  position={position}
                  zoomLevel={zoomLevel}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

export default PersonalMap;
