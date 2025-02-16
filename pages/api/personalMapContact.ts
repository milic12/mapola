import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Create a transporter object using your email service provider's details.
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.zoho.eu",
    secure: true,
    auth: {
      user: process.env.ZOHO_AUTH_USER,
      pass: process.env.ZOHO_AUTH_PASS,
    },
  });
  // Email content
  const mailData = {
    from: process.env.ZOHO_AUTH_USER,
    to: process.env.ZOHO_AUTH_USER,
    subject: req.body.emailSubject,
    text: req.body.subject + " Sent from: " + req.body.email,
    html: `<div>Ime i prezime: ${req.body.name}<br>Adresa: ${req.body.address}<br><br>Okvir: ${req.body.selectFrame}<br><br>Prednji Tekst: ${req.body.frontSideText}<br><br>Zadnji Tekst: ${req.body.backSideText}<br><br>Dimenzije portreta: ${req.body.portraitDimensions}<br><br>Message: ${req.body.message}</div>`,
  };
  try {
    await transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("successful");
        console.log(info);
        res.status(200).end();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
