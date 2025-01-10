import React from "react";

function NoContentAvailable({ title, message }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg shadow-md">
      {/* Icon or Illustration */}
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 animate-pulse bg-blue-200 rounded-full"></div>
        <div className="absolute inset-1 bg-white rounded-full border-4 border-blue-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c.858 0 1.585-.537 1.861-1.29.277-.753.06-1.585-.543-2.189-.603-.604-1.435-.821-2.189-.544C10.537 4.415 10 5.142 10 6c0 1.105.895 2 2 2zM8 15v-3a4 4 0 018 0v3m-4 5c1.065 0 1.918-.571 2.414-1.232.496-.661.72-1.493.586-2.26a2 2 0 00-2-1.508h-1c-.934 0-1.75.68-2 1.508-.134.767.09 1.599.586 2.26C10.082 19.429 10.935 20 12 20z"
            />
          </svg>
        </div>
      </div>

      {/* Title and Message */}
      <h2 className="text-lg font-semibold text-gray-600 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm text-center max-w-sm">{message}</p>
    </div>
  );
}

export default NoContentAvailable;
