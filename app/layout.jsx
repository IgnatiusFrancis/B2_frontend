// //app/layout.jsx
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import ToastNotificationContainer from "@/components/ToastNotificationComponent";
import ProgressBar from "@/components/ProgressBar";
import QueryProvider from "@/providers/QueryProvider";
import { Suspense } from "react";
import LoadingAnimation from "@/components/PageLoad";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
  title: "B2xclusive",
  description: "Your No. 1 Place for non stop entertainment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Suspense fallback={<LoadingAnimation />}>
          <ProgressBar />
        </Suspense>
        <QueryProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <section className="w-full mx-auto">
                <ToastNotificationContainer />
                {children}
              </section>
            </ThemeProvider>
          </ThemeContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
