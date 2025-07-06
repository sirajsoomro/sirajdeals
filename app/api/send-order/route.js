
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, phone, city, address, cartItems, total } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemDetails = cartItems.map((item, i) => `
    <p>${i + 1}) ${item.name} - PKR ${item.price}</p>
  `).join("");

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "New Order Received - Siraj Deals",
    html: `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Address:</strong> ${address}</p>
      <h3>Order Items:</h3>
      ${itemDetails}
      <p><strong>Total Amount:</strong> PKR ${total}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send failed:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        full: JSON.stringify(error), // optional: full error object
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

