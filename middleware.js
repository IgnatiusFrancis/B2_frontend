// import { NextResponse } from "next/server";



// export async function middleware(req) {
  
//   const {  nextUrl } = req;

//   // Extract the path and check if it's an admin route
//   const path = nextUrl.pathname;
//   const isAdminRoute = path.startsWith("/admin");

//   // Define the backend base URL
//   const baseUrl =
//     process.env.B2XCLUSIVE_APP_BASE_URL || "https://xclusive.onrender.com/api/v1";

//   try {
 
//     const url =`${baseUrl}/auth/user/me`

//   const responses =  fetch(url, {
//       method: 'Get',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
  
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });

   
//     if (responses.ok) {
//       // Token is valid, proceed with the request
//       return NextResponse.next();
//     } else {
    
//       console.error("Invalid token, redirecting...");
//     }
//   } catch (error) {
//     console.error("Token verification failed:", error);
//   }

//   // Redirect to home if token is invalid or expired
//   if (isAdminRoute) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// // Define paths to protect in the config
// export const config = {
//   matcher: ["/admin/:path*", "/profile/:path*"],
// };





import { NextResponse } from "next/server";

export async function middleware(req) {
  const { nextUrl, headers } = req;
  const path = nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");

  // Backend API base URL
  const baseUrl =
    process.env.B2XCLUSIVE_APP_BASE_URL || "https://xclusive.onrender.com/api/v1";

  try {
    // Call the "me" endpoint and forward cookies
    const response = await fetch(`${baseUrl}/auth/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: headers.get("cookie"), // Forward cookies from the request
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Token is valid, allow request to proceed
      return NextResponse.next();
    } else {
      console.error("Invalid token, redirecting...", data);
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }

  // Redirect to home if token is invalid or expired
  if (isAdminRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Define paths to protect in the config
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
