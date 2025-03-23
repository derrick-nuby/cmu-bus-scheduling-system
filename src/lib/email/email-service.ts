import nodemailer from "nodemailer";
import type { EmailTemplate } from "./email-templates";

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Interface for email data
export interface EmailData {
  to: string;
  subject: string;
  template: EmailTemplate;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: Record<string, any>;
}

/**
 * Send an email using the configured transporter
 * @param emailData The email data including recipient, subject, template, and context
 * @returns Promise resolving to the send info
 */
export async function sendEmail(emailData: EmailData) {
  const { to, subject, template, context } = emailData;

  // Get the HTML content from the template
  const html = template.getHtml(context);

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_FROM || "No Reply <noreply@example.com>",
    to,
    subject,
    html,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

/**
 * Verify email configuration is working
 * @returns Promise resolving to true if verification is successful
 */
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log("Email configuration verified");
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    throw error;
  }
}

