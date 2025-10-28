import nodemailer from "nodemailer";
import User from "../models/userModels";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId + Date.now().toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
    }

    // Transporter setup - Mailtrap (Email Testing)
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
      port: Number(process.env.MAILTRAP_PORT) || 2525,
      auth: {
        user: process.env.MAILTRAP_USER as string,
        pass: process.env.MAILTRAP_PASS as string,
      },
    });

    // Verify SMTP connection for clearer diagnostics
    try {
      await transporter.verify();
      console.log("SMTP verified: Mailtrap connection OK");
    } catch (smtpErr) {
      console.error("SMTP verify failed:", smtpErr);
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const mailOptions = {
      from: process.env.MAIL_FROM || "no-reply@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        emailType === "VERIFY"
          ? `${baseUrl}/verify-email?token=${hashedToken}`
          : `${baseUrl}/reset-password?token=${hashedToken}`
      }">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    console.log("🔍 Preview URL:", nodemailer.getTestMessageUrl(info));

    return info;
  } catch (error) {
    console.log("Email sending error:", error);
    throw error;
  }
};
