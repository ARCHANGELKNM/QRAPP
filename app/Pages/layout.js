import NavigationBar from "@components/Navigation Bar/NavBar";
import "../globals.css";

export const metadata = {
  title: "QRA",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <NavigationBar />

          {children}
        </div>
      </body>
    </html>
  );
}
