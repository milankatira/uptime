import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import React from "react";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  template: React.ComponentType<any>,
  props: any,
) {
  try {
    const emailHtml = await render(React.createElement(template, props));

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject,
      html: emailHtml,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject "${subject}"`);
    return result;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
}
