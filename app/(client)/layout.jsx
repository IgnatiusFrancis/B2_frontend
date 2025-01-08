
// "use client";
// import { Suspense } from 'react';
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// function Layout({ children }) {
//   return (
//     <>
//       <Header />
//       <Suspense fallback={<div>Loading...</div>}>
//         {children}
//       </Suspense>
//       <Footer />
//     </>
//   );
// }

// export default Layout;


"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
     
        {children}

      <Footer />
    </>
  );
}

export default Layout;