import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import ToastNotificationContainer from "@/components/ToastNotificationComponent";
import QueryProvider from "@/providers/QueryProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"], // Specify the weights you want to use
  subsets: ["latin"], // Optional, specify the subsets
});
export const metadata = {
  title: "B2xclusive",
  description: "Your No. 1 Place for non stop entertainment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryProvider>
          {" "}
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
