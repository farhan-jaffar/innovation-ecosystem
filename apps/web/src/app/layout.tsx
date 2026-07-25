import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import AiFloatingWidget from '@/components/AiFloatingWidget';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'AI-Powered Innovation Ecosystem Platform 🇵🇰',
  description: 'Central Innovation Operating System connecting Government, Universities, Companies, and Talent in Pakistan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <AiFloatingWidget />
          <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p>© 2026 InnovatePK — National Innovation Ecosystem Operating System</p>
              <div className="flex gap-4 text-green-700 font-medium">
                <span>Connecting Pakistan's Innovation Ecosystem</span>
                <span>•</span>
                <span>White & Green Design System</span>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
