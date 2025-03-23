// Base email template interface
export interface EmailTemplate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtml(context: Record<string, any>): string;
}

// Base template with header and footer
class BaseTemplate implements EmailTemplate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtml(context: Record<string, any>): string {
    const { content } = context;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${context.title || "Bus Scheduling System"}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4a6cf7;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #f9f9f9;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #666;
            }
            .button {
              display: inline-block;
              background-color: #4a6cf7;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${context.headerTitle || "Bus Scheduling System"}</h1>
            </div>
            <div class="content">
              ${content}
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Bus Scheduling System. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

// Password reset template
export class PasswordResetTemplate implements EmailTemplate {
  private baseTemplate = new BaseTemplate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtml(context: Record<string, any>): string {
    const { name, resetCode, resetLink } = context;

    const content = `
      <h2>Password Reset</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Use the code below to reset your password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="letter-spacing: 5px; font-size: 24px;">${resetCode}</h3>
      </div>
      <p>Alternatively, you can click the button below to reset your password:</p>
      <div style="text-align: center;">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      <p>This code will expire in 1 hour.</p>
    `;

    return this.baseTemplate.getHtml({
      ...context,
      headerTitle: "Password Reset",
      content,
    });
  }
}

// Welcome template
export class WelcomeTemplate implements EmailTemplate {
  private baseTemplate = new BaseTemplate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtml(context: Record<string, any>): string {
    const { name, loginLink } = context;

    const content = `
      <h2>Welcome to Bus Scheduling System!</h2>
      <p>Hello ${name},</p>
      <p>Thank you for joining Bus Scheduling System. We're excited to have you on board!</p>
      <p>With our platform, you can:</p>
      <ul>
        <li>Track buses in real-time</li>
        <li>Manage routes and schedules</li>
        <li>Improve passenger experience</li>
      </ul>
      <div style="text-align: center;">
        <a href="${loginLink}" class="button">Login to Your Account</a>
      </div>
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
    `;

    return this.baseTemplate.getHtml({
      ...context,
      headerTitle: "Welcome to Bus Scheduling System",
      content,
    });
  }
}

// Notification template
export class NotificationTemplate implements EmailTemplate {
  private baseTemplate = new BaseTemplate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtml(context: Record<string, any>): string {
    const { name, message, actionLink, actionText } = context;

    const content = `
      <h2>${context.title || "Notification"}</h2>
      <p>Hello ${name},</p>
      <p>${message}</p>
      ${actionLink && actionText
        ? `
        <div style="text-align: center;">
          <a href="${actionLink}" class="button">${actionText}</a>
        </div>
      `
        : ""
      }
    `;

    return this.baseTemplate.getHtml({
      ...context,
      content,
    });
  }
}

