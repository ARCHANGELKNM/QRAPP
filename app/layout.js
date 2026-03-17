

import "./globals.css";
import AuthProvider from "./AuthProvider";
import { Toaster } from "@components/ui/toaster";


export const metadata = {
  title: "QRA",
  description: " A fast and secure Qr-code generator and scanner ",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {/* <ToastProvider> */}
      <html lang="en">
        <body>
          <div>
           {children}
          </div>
          <Toaster/>
        </body>
      </html>
      {/* </ToastProvider> */}
    </AuthProvider>
  );
}
