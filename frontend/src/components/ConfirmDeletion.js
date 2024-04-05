// ConfirmationModal.js
import React from 'react';

const ConfirmDeletion = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative  top-1/3 mx-auto p-5 w-96 shadow-lg rounded-3xl bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-xl font-bold text-green-800">Confirm Deletion</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-md text-gray-500">
              Are you sure you want to remove this? This action cannot be undone.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="mx-2 px-4 py-2 bg-red-500 text-white rounded-lg w-24 hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="mx-2 px-4 py-2 bg-gray-500 text-white rounded-lg w-24 hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
