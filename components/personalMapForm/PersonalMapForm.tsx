import { useStateContex } from "@/context/StateContext";
import { Box, Spinner } from "@chakra-ui/react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css";
import { push, ref } from "firebase/database";
import { database } from "../../lib/firebase/firebase-config";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { PersonalMapFormProps } from "@/types";

const PersonalMapForm = ({
  selectFrame,
  frontSideText,
  backSideText,
  portraitDimensions,
  setSelectFrame,
  setFrontSideText,
  setBackSideText,
  setPortraitDimensions,
  screenShotImage,
  position,
  zoomLevel,
}: PersonalMapFormProps) => {
  const FORM_DEFAULT: {
    [key: string]: string;
  } = {
    name: "",
    address: "",
    message: "",
    userEmail: "",
    selectFrame: "",
    frontSideText: "",
    backSideText: "",
    portraitDimensions: "",
  };

  const [formData, setFormData] = useState(FORM_DEFAULT);
  const [loadingSending, setLoadingSending] = useState<boolean>(false);
  const { mapPinLocation } = useStateContex();
  const defaultPinCenter = { lat: 43.509, lng: 16.44 };

  const changeFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const initialFormData = { ...formData };
    initialFormData[field] = e.target.value;
    initialFormData.selectFrame = selectFrame;
    initialFormData.frontSideText = frontSideText;
    initialFormData.backSideText = backSideText;
    initialFormData.portraitDimensions = portraitDimensions;
    setFormData(initialFormData);
  };
  const formSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingSending(true);
    formData.recipient = formData.userEmail;
    formData.emailSubject = "Upit za personaliziranu mapu";
    saveData();

    fetch("/api/personalMapContact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          setLoadingSending(false);
          setFormData(FORM_DEFAULT);
          setSelectFrame("");
          setFrontSideText("");
          setBackSideText("");
          setPortraitDimensions("");

          toast.success(
            "Hvala na poslanoj poruci, javit ćemo vam se u najkraćem mogućem roku.",
            {
              position: "bottom-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } else {
          setLoadingSending(false);
          toast.error("Došlo je do greške, pokušajte ponovno!", {
            toastId: "peronal-page-form",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingSending(false);
        toast.error("Došlo je do greške, pokušajte ponovno!", {
          toastId: "peronal-page-form",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const saveData = () => {
    const dateSaved = new Date(Date.now()).toDateString();
    const timeSaved = new Date().toLocaleTimeString();

    if (screenShotImage) {
      push(ref(database), {
        date: `${dateSaved} - ${timeSaved}`,
        image: screenShotImage,
        lat: position?.lat.toFixed(4) || 0,
        lng: position?.lng.toFixed(4) || 0,
        pinLocationLat: mapPinLocation?.lat.toFixed(4) || defaultPinCenter.lat,
        pinLocationLng: mapPinLocation?.lng.toFixed(4) || defaultPinCenter.lng,
        zoomLevel: zoomLevel,
        formData: formData,
      })
        // .then(() => {
        //   setLoadingImage(false);
        // })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error(
        "Došlo je do greške pri spremanju podatka, pokušajte ponovno!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <Box bg="white" borderRadius="lg">
      <Box className="personal-map-form-padding" color="#0B0E3F">
        <form
          className="container"
          method="post"
          onSubmit={formSubmit}
          id="js-subscription-form grid"
        >
          {/* Name */}
          <label htmlFor="firstName" className="label-contact">
            Ime i prezime:
          </label>
          <input
            required
            id="name"
            type="text"
            name="Name"
            value={formData.name}
            onChange={(e) => changeFormData(e, "name")}
            placeholder="Ime i Prezime"
          />
          {/* Email */}
          <label htmlFor="firstName" className="label-contact">
            Email:
          </label>
          <input
            required
            id="email"
            type="text"
            name="Email"
            value={formData.userEmail}
            onChange={(e) => changeFormData(e, "userEmail")}
            placeholder="email@gmail.com"
          />
          {/* Address */}
          <label htmlFor="lastName" className="label-contact">
            Adresa dostave:
          </label>
          <input
            required
            id="address"
            type="text"
            name="Address"
            className="border border-form-border text-lg font-bold px-2px py-1px"
            value={formData.address}
            onChange={(e) => changeFormData(e, "address")}
            placeholder="Misina 50, 21000 Split"
          />
          {/* Frame */}
          <label htmlFor="text" className="label-contact">
            Okvir
          </label>
          <input
            readOnly
            defaultValue={selectFrame}
            id="frame"
            type="text"
            name="Frame"
          />
          {/* Front Text */}
          <label htmlFor="text" className="label-contact">
            Prednji Tekst
          </label>
          <input
            readOnly
            defaultValue={frontSideText}
            id="frontSideText"
            type="text"
            name="FrontSideText"
            placeholder="Marija & Marin"
          />
          {/* Back Text */}
          <label htmlFor="text" className="label-contact">
            Zadnji Tekst
          </label>
          <input
            readOnly
            defaultValue={backSideText}
            id="backSideText"
            type="text"
            name="BackSideText"
            placeholder="Lijepo je što postojiš"
          />
          {/* Dimensions */}
          <label htmlFor="text" className="label-contact">
            Dimenzije
          </label>
          <input
            readOnly
            defaultValue={portraitDimensions}
            id="portraitDimensions"
            type="text"
            name="PortraitDimensions"
          />
          {/* Message */}
          <label htmlFor="message" className="flex flex-col font-bold text-lg">
            Vaša Poruka:
          </label>
          <textarea
            id="message"
            name="Message"
            className={styles.textArea}
            value={formData.message}
            onChange={(e) => changeFormData(e, "message")}
          />

          <button
            disabled={screenShotImage === ""}
            id="personalised-submit"
            type="submit"
            className={`${
              screenShotImage === ""
                ? styles.disabledSubmitButton
                : styles.contactSubmitButton
            }`}
          >
            {loadingSending ? <Spinner /> : "Submit"}
          </button>
          <p className={styles.disabledButtonMessage}>
            Morate spremiti vaše promjene prije slanja poruke!
          </p>
        </form>
      </Box>
    </Box>
  );
};

export default PersonalMapForm;
