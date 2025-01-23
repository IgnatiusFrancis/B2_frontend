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
    process.env.B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  const [isLogin, setIsLogin] = useState(false);
  const [signInUser, setsignInUser] = useState({ email: "", password: "" });
  const [signUpUser, setsignUpUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Toggle button enablement based on form completeness
  useEffect(() => {
    const isFormComplete = isLogin
      ? signInUser.email && signInUser.password
      : signUpUser.userName &&
        signUpUser.email &&
        signUpUser.password &&
        signUpUser.confirmPassword;
    setButtonDisabled(!isFormComplete);
  }, [isLogin, signInUser, signUpUser]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${baseUrl}/auth/user/signin`
        : `${baseUrl}/auth/user/signup`;
      const payload = isLogin ? signInUser : signUpUser;

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      const userData = response?.data;
      const user = userData.data.user;

      toast.success(userData.message, { position: "top-center" });

      if (isLogin) {
        const { role, userName } = user || {};
        setUser(userName);
        role === "admin" ? router.push("/admin") : router.push("/");
      } else {
        setIsLogin(true); // Switch to login tab
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          `Failed to ${isLogin ? "sign in" : "sign up"}`,
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex md:w-5/6 w-full transition-all duration-500 rounded-xl md:p-4 mx-auto my-auto relative bg-white">
      <div className={`${theme}-bg ${theme}-text p-10 w-full`}>
        {/* Tab Buttons */}
        <div className="py-4 flex justify-between">
          <button
            className={`transition duration-300 w-1/2 flex justify-center p-4 font-bold text-2xl ${
              isLogin ? `${theme}-text border-b border-b-primarycolor` : ""
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`transition duration-300 w-1/2 flex justify-center p-4 font-bold text-2xl ${
              !isLogin ? `${theme}-text border-b border-b-primarycolor` : ""
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form
          onSubmit={handleAuth}
          className={`${theme}-text flex flex-col gap-8 transition-opacity duration-300`}
        >
          {isLogin ? (
            <>
              <p>Welcome back to b2xclusive</p>
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
            </>
          ) : (
            <>
              <p>Create your b2xclusive account</p>
              <input
                value={signUpUser.userName}
                onChange={(e) =>
                  setsignUpUser({ ...signUpUser, userName: e.target.value })
                }
                type="text"
                placeholder="Username"
                className="p-4 rounded-full bg-transparent outline-none border"
              />
              <input
                value={signUpUser.email}
                onChange={(e) =>
                  setsignUpUser({ ...signUpUser, email: e.target.value })
                }
                type="email"
                placeholder="Email Address"
                className="p-4 rounded-full bg-transparent outline-none border"
              />
              <input
                value={signUpUser.password}
                onChange={(e) =>
                  setsignUpUser({ ...signUpUser, password: e.target.value })
                }
                type="password"
                placeholder="Password"
                className="p-4 rounded-full bg-transparent outline-none border"
              />
              <input
                value={signUpUser.confirmPassword}
                onChange={(e) =>
                  setsignUpUser({
                    ...signUpUser,
                    confirmPassword: e.target.value,
                  })
                }
                type="password"
                placeholder="Confirm Password"
                className="p-4 rounded-full bg-transparent outline-none border"
              />
            </>
          )}
          <button
            type="submit"
            disabled={buttonDisabled}
            className={`${
              loading ? "bg-orange-100" : "bg-primarycolor"
            } text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthComponent;
