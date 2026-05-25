import { Leaf, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { registrationSchema } from "./constants";
import { useState } from "react";
import { generateRefNumber, saveToSheet, sendEmail } from "./utill";
import RefNumberViewer from "./RefNumberViewer";

type RegistrationForm = z.infer<typeof registrationSchema>;

const InternationalWomensDayYoga = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [showRefContainer, setShowRefContainer] = useState(false);
  console.log(refNumber);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      tshirtSize: "M"
    } as RegistrationForm,

    validators: {
      onBlur: registrationSchema,
      onSubmit: registrationSchema
    },

onSubmit: async ({ value }) => {
  setIsSubmitting(true);

  const refNumber = generateRefNumber();
  setRefNumber(refNumber);

  const data = {
    name: value.name.trim(),
    email: value.email.trim(),
    phone: value.phone.trim(),
    gender: value.gender,
    tshirtSize: value.tshirtSize,
    refNumber
  };

  try {
    // VALIDATE
    registrationSchema.parse(data);

    // TRY GOOGLE SHEET
    const sheetResponse = await saveToSheet(data);

    // SHEET SUCCESS
    if (sheetResponse.ok) {
      setShowRefContainer(true);

      toast.success("Registration Successful!", {
        description: "Your registration has been submitted.",
        duration: 4000
      });

      return;
    }

    // FALLBACK EMAIL
    console.log("Sheet failed, trying email fallback...");

    const emailResponse = await sendEmail(data);

    if (emailResponse) {
      setShowRefContainer(true);

      toast.success("Registration Saved via Email!", {
        description:
          "Sheet service was unavailable, but your registration was received.",
        duration: 5000
      });
    } else {
      throw new Error("Both sheet and email failed");
    }
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      toast.error(error?.message || "Validation failed");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
    form.reset();
  }
}
  });

  return (
    <div className="min-h-screen bg-[#F7F4F1] flex items-center justify-center px-4 py-6 md:py-14 font-sans">
      {showRefContainer && <RefNumberViewer referenceNumber={refNumber} />}
      <Toaster position="top-center" richColors closeButton />

      <div className="max-w-5xl w-full flex flex-col gap-4">
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl md:text-4xl font-serif text-[#4F6F52] tracking-tight">
            Vivacious Yoga
          </h2>

          <div className="h-1 w-12 bg-[#86A789] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-100 min-h-150">
          {/* LEFT IMAGE */}
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

          {/* FORM */}
          <div className="w-full md:w-1/2 p-4 md:p-14 flex flex-col justify-center bg-white">
            <header className="mb-4 text-center">
              <span className="text-[#86A789] font-bold tracking-[0.2em] text-[11px] uppercase block mb-3">
                Exclusive Invitation
              </span>

              <h1 className="text-2xl md:text-3xl font-serif text-stone-800 leading-snug mb-4">
                International Yoga Day
              </h1>

              {/* <div className="space-y-1 inline-block text-left">
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

              </div> */}
            </header>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* NAME */}
              <form.Field
                name="name"
                validators={{
                  onChange: registrationSchema.shape.name
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* EMAIL */}
              <form.Field
                name="email"
                validators={{
                  onChange: registrationSchema.shape.email
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="sarah@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* PHONE */}
              <form.Field
                name="phone"
                validators={{
                  onChange: registrationSchema.shape.phone
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* GENDER */}
              <form.Field
                name="gender"
                validators={{
                  onChange: registrationSchema.shape.gender
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">
                      Gender
                    </label>

                    <select
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all text-stone-700"
                    >
                      <option value="">Select Gender</option>

                      <option value="Female">Female</option>

                      <option value="Male">Male</option>

                      <option value="Other">Other</option>
                    </select>

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* TSHIRT SIZE */}
              <form.Field
                name="tshirtSize"
                validators={{
                  onChange: registrationSchema.shape.tshirtSize
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">
                      T-Shirt Size
                    </label>

                    <select
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as "S" | "M" | "L" | "XL" | "XXL"
                        )
                      }
                      className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all text-stone-700"
                    >
                      <option value="">Select Size</option>

                      <option value="S">S</option>

                      <option value="M">M</option>

                      <option value="L">L</option>

                      <option value="XL">XL</option>

                      <option value="XXL">XXL</option>
                    </select>

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* BUTTON */}
              <button
                type="submit"
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
