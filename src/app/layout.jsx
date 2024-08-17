import { Inter } from "next/font/google";
import "./globals.css";
import Container from "./components/container";
import { BottomNavbar } from "./components/bottomNavbar";
import { AuthProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({ children }) {
   return (
      <AuthProvider>
         <html lang="en">
            <body className={inter.className}>
               <Container>
                  <div className="main relative z-20 flex h-full w-full flex-col justify-between flex-1">
                     <div className="children-container w-full h-full flex-1 mb-[60px]">
                        {children}
                     </div>
                     <BottomNavbar />
                  </div>
               </Container>
            </body>
         </html>
      </AuthProvider>
   );
}
