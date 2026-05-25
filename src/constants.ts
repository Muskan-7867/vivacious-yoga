import z from "zod";

export const generateHtml = (
  name: string,
  email: string,
  phone: string,
  gender: string,
  tshirtSize: string,
  refNumber: string
) =>
  `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Registration - Vivacious Yoga</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f5f3;font-family:Arial,Helvetica,sans-serif;">
  
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.06);">
    
    <!-- Header -->
    <tr>
      <td style="background:#4F6F52;padding:25px 30px;color:#ffffff;">
        <h1 style="margin:0;font-size:22px;">New Event Registration</h1>
        <p style="margin:6px 0 0 0;font-size:13px;opacity:0.9;">
          International Women's Day Celebration 2026
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:35px 30px;color:#333;font-size:15px;line-height:1.6;">
        
        <p style="margin-top:0;">
          A new participant has registered for the yoga event.
        </p>

        <!-- Details Box -->
        <table width="100%" cellpadding="0" cellspacing="0" 
          style="background:#f7faf8;border-radius:8px;padding:20px;margin-top:20px;border:1px solid #e6ece9;">
          <tr>
            <td style="font-size:14px;color:#444;">
              <strong>Full Name:</strong> ${name} <br/><br/>
              <strong>Email Address:</strong> ${email} <br/><br/>
              <strong>Phone Number:</strong> ${phone} <br/><br/>
              <strong>Gender:</strong> ${gender} <br/><br/>
              <strong>T-Shirt Size:</strong> ${tshirtSize} <br/><br/>
              <strong>Reference Number:</strong> ${refNumber} <br/>
              <strong>Registration Time:</strong> ${new Date().toLocaleString()}
            </td>
          </tr>
        </table>

        <p style="margin-top:25px;font-size:13px;color:#666;">
          Please reach out to the participant if any further confirmation is required.
        </p>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background:#fafafa;padding:20px;font-size:12px;color:#999;">
        This is an automated notification from Vivacious Yoga website.
      </td>
    </tr>

  </table>

</td>
</tr>
</table>

</body>
  </html>`;

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number is too long")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number"),

  gender: z
    .string()
    .min(1, "Please select gender"),

  tshirtSize: z.enum([
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ]),
});
