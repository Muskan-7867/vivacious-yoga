import { Leaf, Calendar, MapPin } from "lucide-react";

const InternationalWomensDayYoga = () => {
  return (
    <div className="min-h-screen bg-[#F7F4F1] flex items-center justify-center px-4 py-10 md:py-16 font-sans">
      <div className="max-w-5xl w-full flex flex-col gap-6">
        {/* Branding Header */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl md:text-4xl font-serif text-[#4F6F52] tracking-tight">
            Vivacious Yoga
          </h2>
          <div className="h-1 w-12 bg-[#86A789] mx-auto rounded-full"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-100 min-h-150">
          {/* Left Side: Image Section */}
          <div className="relative w-full md:w-1/2 h-72 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
              alt="Yoga Practice"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Soft Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

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

          {/* Right Side: Content & Form */}
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
            <header className="mb-10 text-center ">
              <span className="text-[#86A789] font-bold tracking-[0.2em] text-[11px] uppercase block mb-3">
                Exclusive Invitation
              </span>

              <h1 className="text-2xl md:text-3xl font-serif text-stone-800 leading-snug mb-6">
                International Women's Day Celebration
              </h1>

              <div className="space-y-3 inline-block text-left">
                <div className="flex items-center gap-3 text-stone-500 text-sm">
                  <div className="p-2 bg-[#F9FAF7] rounded-full">
                    <Calendar size={16} className="text-[#86A789]" />
                  </div>
                  <span>8th March, 2026 | Mayor World School</span>
                </div>

                <div className="flex items-center justify-center gap-3 text-stone-500 text-sm">
                  <div className="p-2 bg-[#F9FAF7] rounded-full">
                    <MapPin size={16} className="text-[#86A789]" />
                  </div>
                  <span>Urban Estate Phase-1, Jalandhar</span>
                </div>
              </div>
            </header>

            {/* Registration Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="group">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 transition-colors group-focus-within:text-[#86A789]">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                />
              </div>

              <div className="group">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 transition-colors group-focus-within:text-[#86A789]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="sarah@example.com"
                  className="w-full bg-transparent border-b border-stone-200 py-2 outline-none focus:border-[#86A789] transition-all placeholder:text-stone-300 text-stone-700"
                />
              </div>

              <button className="w-full bg-[#4F6F52] hover:bg-[#3A533E] text-white py-4 rounded-2xl font-semibold tracking-wide shadow-xl shadow-[#4f6f52]/20 transition-all hover:shadow-none active:scale-[0.97] mt-4">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalWomensDayYoga;
