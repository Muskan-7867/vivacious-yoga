import { useState } from "react";
import { Copy, Check, X } from "lucide-react";

type Props = {
  referenceNumber: string;
};

function RefNumberViewer({ referenceNumber }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="absolute inset-0 z-100  w-full  mx-auto bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200 p-6 flex flex-col items-center justify-center gap-5 ">
        <X size={24} className="absolute top-4 right-4 cursor-pointer text-stone-500 hover:text-stone-700 transition-colors" onClick={() => window.location.reload()} />
      <div className="size-11/12 md:size-8/12 text-center flex justify-center items-center flex-col gap-3 bg-white/70 border border-white shadow-sm backdrop-blur-lg rounded-2xl px-6 py-4">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 font-semibold mb-2">
          Reference Number
        </p>
        <div className="flex items-center justify-center  bg-[#4bff5d33] text-white px-3 py-3  rounded-md border border-[#4F6F52] border-dashed  transition-all active:scale-95 ">
          <p className="text-3xl md:text-5xl font-medium  text-[#4F6F52]  ">
            {referenceNumber}
          </p>
        </div>
         <p> Keep this reference number safe for future communication.</p>    
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-[#4F6F52] hover:bg-[#3d5740] text-white px-5 py-3 rounded-full mt-6 transition-all active:scale-95 shadow-lg"
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy Reference
            </>
          )}
        </button>
      </div>

    </div>
  );
}

export default RefNumberViewer;
