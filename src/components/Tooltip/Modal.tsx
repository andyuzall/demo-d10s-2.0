'use client';

import Link from 'next/link';
import React from 'react';

interface ModalDashboardProps {
  title: string;
  message: string;
  onClose: () => void;
}

const ModalDashboard: React.FC<ModalDashboardProps> = ({
  title,
  message,
  onClose
}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-3xl font-bold mb-4 text-blackColor">{title}</h2>
        <p className="text-gray-600">
          {message}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2">
            Cerrar
          </button>
          <Link
            href="/aplication/subscription-plans"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md">
            Ver campañas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalDashboard;
