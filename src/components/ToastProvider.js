// components/ToastProvider.js
'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        duration: 4000, // how long toast stays
        style: {
          fontSize: '16px',
          padding: '16px 24px',
          background: '#1a202c', // dark navy (you can use #0a0a0a or your theme)
          color: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        success: {
          icon: '✅',
          style: {
            background: '#2f855a', // green for success
            color: '#fff',
          },
        },
        error: {
          icon: '❌',
          style: {
            background: '#c53030', // red for error
            color: '#fff',
          },
        },
      }}
    />
  );
}
