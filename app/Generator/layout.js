
import Nav from "@components/Navigation Bar/nav";
import "../globals.css";

export const metadata = {
  title: "QRAPP",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <div>
            <Nav />
          </div>

          {children}

          {/*
         <div className="relative w-16 h-16 bg-green-300 top-0 sm:bg-violet-900 md:bg-blue-500  lg:bg-teal-700 xl:bg-yellow-600 2xl:bg-orange-300">
        </div> 
        */}
        </div>
      </body>
    </html>
  );
}
