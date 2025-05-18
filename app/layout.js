

import "./globals.css";
import AuthProvider from "./AuthProvider";


export const metadata = {
  title: "QRAPP",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div>
           {children}

           
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
