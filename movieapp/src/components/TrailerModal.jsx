// File: src/components/TrailerModal.jsx
import React from "react";

export default function TrailerModal({ isOpen, onClose, videoKey }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500 z-10">
          ×
        </button>
        <div className="aspect-video">
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoKey}`} title="Movie Trailer" allowFullScreen className="rounded-b-xl"></iframe>
        </div>
      </div>
    </div>
  );
}
