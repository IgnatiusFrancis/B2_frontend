"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function AuthComponent() {
  const { theme, setUser } = useContext(ThemeContext);
  const router = useRouter();
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  const [signInUser, setsignInUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Enable button only when all login fields are filled
  useEffect(() => {
    setButtonDisabled(!(signInUser.email && signInUser.password));
  }, [signInUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/auth/user/signin`,
        signInUser,
        { withCredentials: true }
      );

      const userData = response?.data;
      const user = userData.data.user;
      const token = userData.data.token;
      localStorage.setItem("token", token);

      toast.success(userData.message, { position: "top-center" });

      const { role } = user || {};

      role === "admin" ? router.push("/admin") : router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to sign in", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex md:w-[60%] w-[90%] transition-all duration-500 rounded-xl md:p-4 mx-auto relative bg-white">
      <div className={`${theme}-bg ${theme}-text p-10 w-full`}>
        <p className="py-4 text-center text-2xl font-bold">
          Welcome Back to B2Trendz
        </p>
        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className={`${theme}-text flex flex-col gap-8 transition-opacity duration-300`}
        >
          <input
            value={signInUser.email}
            onChange={(e) =>
              setsignInUser({ ...signInUser, email: e.target.value })
            }
            type="email"
            placeholder="Email Address"
            className="p-4 rounded-full bg-transparent outline-none border"
          />
          <input
            value={signInUser.password}
            onChange={(e) =>
              setsignInUser({ ...signInUser, password: e.target.value })
            }
            type="password"
            placeholder="Password"
            className="p-4 rounded-full bg-transparent outline-none border"
          />
          <button
            type="submit"
            disabled={buttonDisabled}
            className={`${
              loading ? "bg-orange-100" : "bg-primarycolor"
            } text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthComponent;
