import { Box, Spinner } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

const ContactForm = () => {
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

  const changeFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const initialFormData = { ...formData };
    initialFormData[field] = e.target.value;
    setFormData(initialFormData);
  };
  const formSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingSending(true);
    formData.recipient = "milic1289@gmail.com";
    formData.emailSubject = "Kontakt upit";

    fetch("/api/contactPageApi", {
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

          toast.success(
            "Hvala na poslanoj poruci, javit ćemo vam se u najkraćem mogućem roku.",
            {
              toastId: "contact-page-form",
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
        setLoadingSending(false);
        console.error(error);
        toast.error("Došlo je do greške, pokušajte ponovno!", {
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

  return (
    <Box bg="white" borderRadius="lg">
      <Box p={20} color="#0B0E3F">
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
          {/* Message */}
          <label htmlFor="message" className="flex flex-col font-bold text-lg">
            Vaša Poruka:
          </label>
          <textarea
            required
            id="message"
            name="Message"
            className={styles.textArea}
            value={formData.message}
            onChange={(e) => changeFormData(e, "message")}
          />

          <button
            id="personalised-submit"
            type="submit"
            className={styles.contactSubmitButton}
          >
            {loadingSending ? <Spinner /> : "Submit"}
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
