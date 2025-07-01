// components/WhatsappPopup.jsx
import React from "react";

export default function WhatsappPopup({ waLink, onClose }) {
  return (
    <div className="absolute top-4 z-50 bg-white text-black px-4 py-3 rounded shadow-lg animate-slide-in">
      <p className="mb-2">An update was made on the timetable.</p>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold px-5 py-2 rounded-2xl border-2 border-black bg-green-600 text-white"
      >
        Notify Class Rep on WhatsApp
      </a>
      <button onClick={onClose} className="block text-sm text-red-500 font-bold mt-2 ">
        Close
      </button>
    </div>
  );
}
