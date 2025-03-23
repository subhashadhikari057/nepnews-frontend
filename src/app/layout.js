import "./globals.css";
import Navbar from "../components/Navbar"; // ✅ Navbar
import Footer from "../components/Footer"; // ✅ Footer

export const metadata = {
  title: "NepNews",
  description: "Stay updated with the latest news.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        <Navbar /> {/* ✅ Navbar at the top */}

        <main className="flex-grow">{children}</main> {/* Content in between */}

        <Footer /> {/* ✅ Footer at the bottom */}
      </body>
    </html>
  );
}
