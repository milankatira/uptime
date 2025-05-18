import { resend, sendEmailViaResend } from "./resend";
import { ResendEmailOptions } from "./resend/types";

export const sendEmail = async (opts: ResendEmailOptions) => {
  if (resend) {
    return await sendEmailViaResend(opts);
  }

  console.info(
    "Email sending failed: Neither SMTP nor Resend is configured. Please set up at least one email service to send emails.",
  );
};
