import { sendEmail } from "./email-service";
import { WelcomeTemplate } from "./email-templates";

/**
 * Send a welcome email to a new user
 * @param name User's name
 * @param email User's email address
 */
export async function sendWelcomeEmail(name: string, email: string) {
  const loginLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`;

  await sendEmail({
    to: email,
    subject: "Welcome to Bus Scheduling System",
    template: new WelcomeTemplate(),
    context: {
      name,
      loginLink,
    },
  });
}

