import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// DEBUG: check env values loaded or not
// console.log("SMTP DEBUG →", {
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   user: process.env.SMTP_USER,
//   pass: process.env.SMTP_PASS ? "LOADED" : "MISSING"
// });

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // port 587 = TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
