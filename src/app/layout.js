import "./globals.css";
import Navbar from "../components/Navbar"; // Import Navbar

export const metadata = {
  title: "NepNews",
  description: "Stay updated with the latest news.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Navbar Added Here */}
        <main>{children}</main>
      </body>
    </html>
  );
}
