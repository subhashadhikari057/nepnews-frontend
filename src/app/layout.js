import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastProvider from '../components/ToastProvider'; // ✅ Use wrapper

export const metadata = {
  title: 'NepNews',
  description: 'Stay updated with the latest news.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <ToastProvider /> {/* ✅ Now client-safe */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
