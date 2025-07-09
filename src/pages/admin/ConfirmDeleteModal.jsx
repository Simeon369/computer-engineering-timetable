import React from 'react';

export default function ConfirmDeleteModal({ id, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className=" flex items-center justify-center w-full absolute top-4 z-50 text-black px-4 py-3 rounded animate-slide-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={()=> onClose()}
            className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(id);
              onClose();
            }}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
