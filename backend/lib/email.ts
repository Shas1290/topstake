import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ThankYouEmailProps {
  to: string;
  name: string;
  subject: string;
  message: string;
}

function buildThankYouHTML({ name, subject, message }: Omit<ThankYouEmailProps, "to">) {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You - TopStake</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#ffffff;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.6);">

          <!-- Hero Section with Gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 40%,#a855f7 70%,#c084fc 100%);padding:60px 40px 50px;text-align:center;">

              <!-- Logo / Brand -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:30px;">
                    <div style="display:inline-block;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border-radius:16px;padding:14px 28px;border:1px solid rgba(255,255,255,0.2);">
                      <span style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:1px;">Top<span style="color:#c4b5fd;">Stake</span></span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Checkmark Icon -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.3);display:inline-block;line-height:72px;text-align:center;">
                      <span style="font-size:36px;color:#ffffff;">✓</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 style="margin:0 0 12px;font-size:32px;font-weight:800;color:#ffffff;line-height:1.2;">
                Thank you for<br/>contacting us.
              </h1>
              <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.85);line-height:1.5;">
                We will contact you shortly.
              </p>

            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td style="background-color:#111118;padding:40px;">

              <!-- Greeting -->
              <p style="margin:0 0 24px;font-size:16px;color:#d1d5db;line-height:1.7;">
                Hi <strong style="color:#ffffff;">${name}</strong>,
              </p>
              <p style="margin:0 0 30px;font-size:15px;color:#9ca3af;line-height:1.7;">
                We've received your message and our team is already on it. You can expect a response from us within <strong style="color:#c4b5fd;">24 hours</strong>. In the meantime, here's a summary of what you sent us:
              </p>

              <!-- Summary Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg,#1a1a2e,#16162a);border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

                <!-- Subject Row -->
                <tr>
                  <td style="padding:20px 24px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06);">
                          <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#6366f1;font-weight:700;">Subject</p>
                          <p style="margin:0;font-size:15px;color:#e5e7eb;font-weight:500;">${subject}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Row -->
                <tr>
                  <td style="padding:16px 24px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#6366f1;font-weight:700;">Your Message</p>
                    <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;background:rgba(99,102,241,0.06);border-radius:10px;padding:14px 16px;border-left:3px solid #6366f1;">${message}</p>
                  </td>
                </tr>

              </table>

              <!-- CTA Section -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding-top:32px;">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 20px;font-size:14px;color:#9ca3af;">
                      While you wait, explore what TopStake has to offer:
                    </p>
                    <a href="https://topstake.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:600;letter-spacing:0.5px;box-shadow:0 4px 20px rgba(99,102,241,0.4);">
                      Visit TopStake →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="background-color:#111118;padding:0 40px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,rgba(99,102,241,0.3),transparent);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#111118;padding:30px 40px 40px;text-align:center;">

              <!-- Social Links -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="#" style="display:inline-block;width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);text-align:center;line-height:36px;color:#9ca3af;text-decoration:none;font-size:14px;">𝕏</a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="#" style="display:inline-block;width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);text-align:center;line-height:36px;color:#9ca3af;text-decoration:none;font-size:14px;">in</a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="#" style="display:inline-block;width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);text-align:center;line-height:36px;color:#9ca3af;text-decoration:none;font-size:14px;">ig</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
                © ${currentYear} TopStake. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;color:#4b5563;">
                You received this email because you contacted us through our website.
              </p>
            </td>
          </tr>

        </table>

        <!-- Bottom Tagline -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding:24px 0;">
              <p style="margin:0;font-size:12px;color:#374151;">
                Sent with ❤️ from <span style="color:#8b5cf6;">TopStake</span>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function sendThankYouEmail({ to, name, subject, message }: ThankYouEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "TopStake <onboarding@resend.dev>",
      to: [to],
      subject: `Thanks for reaching out, ${name}! — TopStake`,
      html: buildThankYouHTML({ name, subject, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    console.log("Thank-you email sent:", data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send thank-you email:", err);
    return { success: false, error: err };
  }
}
