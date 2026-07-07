 import { sendEmail } from "../utils/mailer.js";

export const sendBookingEmail = async (req, res) => {
  try {
    const { email, movie, seats } = req.body;

    // Validate fields
    if (!email || !movie || !seats || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Email, movie name and seats are required",
      });
    }

    // Convert seats array → A1, A2, A3
    const seatList = Array.isArray(seats) ? seats.join(", ") : seats;

    // Email content
    const htmlTemplate = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>🎬 Booking Confirmed!</h2>
        <p>Thank you for booking with us.</p>
        <p><b>Movie:</b> ${movie}</p>
        <p><b>Seats:</b> ${seatList}</p>
        <hr/>
        <p style="font-size:14px;color:#888;">This is an automated email. Please do not reply.</p>
      </div>
    `;

    // Send email
    await sendEmail({
      to: email,
      subject: "Your Movie Booking Confirmation 🎟️",
      html: htmlTemplate
    });

    return res.status(200).json({
      success: true,
      message: "Booking email sent successfully"
    });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message,
    });
  }
};
