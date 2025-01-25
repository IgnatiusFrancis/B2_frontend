// lib/auth.ts
import axios from "axios";

export async function checkUserAuthentication() {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  try {
    // Call the /me endpoint
    const response = await axios.get(`${baseUrl}/auth/user/me`, {
      withCredentials: true,
    });
    //
    console.log("response user1:", response);

    // Check for a successful response
    if (response.status === 200 && response.data.success) {
      const user = response.data.data; // Assuming user data is in response.data.data
      //console.log("user auth:", user)
      // Check if the user is an admin
      if (user?.role === "admin") {
        return user; // Return the user object if they are an admin
      }

      console.error("User is not an admin");
      return null; // Return null if the user is not an admin
    }

    // Return null for any non-successful response
    return null;
  } catch (error) {
    console.error("Authentication check failed:", error.response.status);
    return null; // Return null if an error occurs
  }
}
