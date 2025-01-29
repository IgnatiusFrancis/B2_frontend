//"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getBreakingNews } from "@/lib/api";

async function Layout({ children }) {
  const [breakingNews] = await Promise.all([getBreakingNews()]);
  return (
    <>
      <Header breakingNews={breakingNews} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
