import { generateHtml } from "./constants";

type FormData = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  tshirtSize: string;
  refNumber: string;
};
export const generateRefNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `REF-${timestamp}-${randomPart}`;
};

export const sendEmail = async (data: FormData) => {
  try {
    const emailResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: "deepak2603om@gmail.com",
          text: "Yoga Registration",
          subject: "New Registration for Vivacious Yoga",
          html: generateHtml(
            data.name,
            data.email,
            data.phone,
            data.gender,
            data.tshirtSize,
            data.refNumber
          )
        })
      }
    );
  if(emailResponse.ok) {
    console.log("Email sent successfully");
    return true
  } else {
    return false
  }
  } catch (error) {
    console.error("Email sending failed", error);
    return false;
  }
};

export const saveToSheet = async (data: FormData) => {
  try {
    const response = await fetch(import.meta.env.VITE_APPS_SCRIPT, {
      method: "POST",
 
      body: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.error("Sheet save failed", error);

    return {
      ok: false
    } as Response;
  }
};
