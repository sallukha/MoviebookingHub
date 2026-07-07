import { transporter } from "../utils/mail.config.js";
export const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"Movie Booking App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html
  });
};
