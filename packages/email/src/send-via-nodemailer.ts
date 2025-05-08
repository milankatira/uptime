import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { ReactElement } from "react";
import { CreateEmailOptions } from "resend";

// Send email using NodeMailer (Recommended for local development)
const VARIANT_TO_FROM_MAP = {
  primary: "Uptime <system@uptime.com>",
  notifications: "Uptime <notifications@mail.uptime.com>",
  marketing: "Uptime Team <team@uptime.com>",
};

export const sendViaNodeMailer = async ({
  email,
  subject,
  text,
  react,
  from,
  variant = "primary",
}: Pick<CreateEmailOptions, "subject" | "text" | "react"> & {
  email: string;
  from?: string;
  variant?: keyof typeof VARIANT_TO_FROM_MAP;
}) => {
  const transporter = nodemailer.createTransport({
    // @ts-ignore (Fix this)
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  return await transporter.sendMail({
    from: from || VARIANT_TO_FROM_MAP[variant],
    to: email,
    subject,
    text,
    html: render(react as ReactElement),
  });
};
