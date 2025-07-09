import React from "react";

export default function WhatsappPopup({ waLink, onClose }) {
  return (
    <div className="fixed top-6 right-6 z-50 max-w-xs w-full bg-white text-black px-6 py-4 rounded-lg shadow-lg border border-gray-200 animate-slide-in transition-all">
      <p className="mb-4 font-medium text-sm">An update was made on the timetable.</p>
      
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center font-semibold px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
      >
        Notify Class Rep on WhatsApp
      </a>
      
      <button
        onClick={onClose}
        className="mt-3 text-center text-red-500 hover:underline text-sm font-semibold block mx-auto"
      >
        Close
      </button>
    </div>
  );
}
