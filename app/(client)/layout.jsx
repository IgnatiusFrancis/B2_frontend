//"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getBreakingNews } from "@/lib/api";

async function Layout({ children }) {
  const [breakingNews] = await Promise.all([getBreakingNews()]);
  return (
    <>
      <Header breakingNews={breakingNews} />
      <div className="pt-40 md:pt-48">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
