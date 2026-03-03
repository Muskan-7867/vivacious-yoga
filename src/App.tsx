import { Leaf, Calendar, MapPin, Loader2 } from "lucide-react"; // Added Loader2
import { useState } from "react";
import { toast, Toaster } from "sonner";

const InternationalWomensDayYoga = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateHtml = (name: string, email: string, phone: string) =>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: "deepak2603om@gmail.com",
            text: "yoga registration",
            subject: "New Registration for Vivacious Yoga",
            html: generateHtml(formData.name, formData.email, formData.phone),
          }),
        },
      );

      if (response.ok) {
        toast.success("Registration Successful!", {
          description: "Check your email for confirmation.",
          duration: 4000,
        });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4F1] flex items-center justify-center px-4 py-6 md:py-14 font-sans">
      {/* Added position and richColors to Toaster for better animation */}
      <Toaster position="top-center" richColors closeButton />

      <div className="max-w-5xl w-full flex flex-col gap-4">
        <div className="text-center space-y-1">
          <h2 className="text-3xl md:text-4xl font-serif text-[#4F6F52] tracking-tight">
            Vivacious Yoga
          </h2>
          <div className="h-1 w-12 bg-[#86A789] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-100 min-h-150">
          <div className="relative w-full md:w-1/2 h-58 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
              alt="Yoga Practice"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Leaf size={18} className="text-[#D1D8C5]" />
                <span className="uppercase tracking-[0.4em] text-[10px] font-medium opacity-90">
                  Wellness First
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight">
                Find Your <br /> Inner Balance
              </h2>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 md:p-14 flex flex-col justify-center bg-white">
            <header className="mb-4 text-center ">
              <span className="text-[#86A789] font-bold tracking-[0.2em] text-[11px] uppercase block mb-3">
                Exclusive Invitation
              </span>

              <h1 className="text-2xl md:text-3xl font-serif text-stone-800 leading-snug mb-4">
                International Women's Day Celebration
              </h1>

              <div className="space-y-1 inline-block text-left">
                <div className="flex items-center gap-3 text-stone-500 text-sm">
                  <div className="p-1 bg-[#F9FAF7] rounded-full">
                    <Calendar size={16} className="text-[#86A789]" />
                  </div>
                  <span>8th March, 2026 | Mayor World School</span>
                </div>

                <div className="flex items-center justify-center gap-3 text-stone-500 text-sm">
                  <div className="p-1 bg-[#F9FAF7] rounded-full">
                    <MapPin size={16} className="text-[#86A789]" />
                  </div>
                  <span>Urban Estate Phase-1, Jalandhar</span>
                </div>
              </div>
            </header>

            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="group">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 transition-colors group-focus-within:text-[#86A789]">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-transparent border-b border-stone-200 py-1 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 transition-colors group-focus-within:text-[#86A789]">
                  Email Address
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-1 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                />
              </div>

              <div className="group">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 transition-colors group-focus-within:text-[#86A789]">
                  Phone Number
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-1 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-[#4F6F52] hover:bg-[#3A533E] disabled:bg-stone-400 text-white py-4 rounded-2xl font-semibold tracking-wide shadow-xl shadow-[#4f6f52]/20 transition-all hover:shadow-none active:scale-[0.97] mt-4 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalWomensDayYoga;
