"use client";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

function AuthComponent() {
  const { theme, setUser, setUserId, setadminUser } = useContext(ThemeContext);
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false); // Tab state: true = login, false = signup

  // State for login and signup forms
  const [signInUser, setsignInUser] = useState({
    email: "",
    password: "",
  });

  const [signUpUser, setsignUpUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signinloading, setsigninLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Handle sign-in request

  const handleSignin = async (e) => {
    e.preventDefault();
    setsigninLoading(true);
    try {
      const response = await axios.post(
        "https://b2xclusive.onrender.com/api/v1/auth/user/signin",
        signInUser,
      );

      const userData = response?.data;
      setUser(userData?.data?.token);
      setUserId(userData?.data?.id);
      toast.success(userData.message, {
        position: "top-center",
      });

      if (userData?.data?.role === "admin") {
        setadminUser(userData?.data?.token);
        Cookies.set("b2xclusiveadmin", userData?.data?.token, { expires: 7 });

        setIsLogin(false);
        router.push("/admin");
      } else {
        setIsLogin(false);
        router.push("/");
      }
    } catch (error) {
      console.log("unable to sign in", error.message);
      toast.error(error?.response?.data?.message || "Failed to sign in", {
        position: "top-center",
      });
    } finally {
      setsigninLoading(false);
    }
  };

  // Handle sign-up request
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      const response = await axios.post(
        "https://b2xclusive.onrender.com/api/v1/auth/user/signup",
        signUpUser,
      );

      const userData = response?.data;
      console.log(userData);
      toast.success("Signup successful!", {
        position: "top-center",
      });
      setTimeout(() => {
        setIsLogin(false);
      }, 3000);
    } catch (error) {
      console.log("unable to sign up", error.message);
      toast.error(error?.response?.data?.message || "Failed to sign up", {
        position: "top-center",
      });
    } finally {
      setSignupLoading(false);
    }
  };

  useEffect(() => {
    if (signInUser.email.length > 0 && signInUser.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [signInUser]);

  return (
    <>
      <div className="md:flex md:w-5/6 w-full transition-all duration-500 rounded-xl md:p-4 mx-auto my-auto relative bg-white">
        <div className={`${theme}-bg ${theme}-text p-10 w-full`}>
          <div className="py-4 flex justify-between">
            {/* Tab buttons */}
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

          {/* Login Form */}
          {isLogin && (
            <form
              className={`${theme}-text flex flex-col gap-8 transition-opacity duration-300 `}
            >
              <div>
                <p>Welcome back to b2xclusive</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-md">Email Address</label>
                <input
                  value={signInUser.email}
                  onChange={(e) =>
                    setsignInUser({ ...signInUser, email: e.target.value })
                  }
                  type="email"
                  placeholder="email address"
                  className="p-4 rounded-full bg-transparent outline-none border"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-md">Password</label>
                <input
                  value={signInUser.password}
                  onChange={(e) =>
                    setsignInUser({ ...signInUser, password: e.target.value })
                  }
                  type="password"
                  placeholder="password"
                  className="p-4 rounded-full bg-transparent outline-none border"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  <p className={`${theme}-text`}>Remember Me</p>
                </div>
                <Link href={"/forgotpassword"}>Forgot Password</Link>
              </div>

              <button
                onClick={handleSignin}
                disabled={buttonDisabled}
                className={`${
                  signinloading ? "bg-orange-100" : "bg-primarycolor"
                } text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
              >
                {signinloading ? (
                  <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {!isLogin && (
            <form
              className={`${theme}-text flex flex-col gap-8 transition-opacity duration-300`}
            >
              <div>
                <p>Create your b2xclusive account</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-md">Username</label>
                  <input
                    value={signUpUser.userName}
                    onChange={(e) =>
                      setsignUpUser({ ...signUpUser, userName: e.target.value })
                    }
                    type="text"
                    placeholder="username"
                    className="p-4 rounded-full bg-transparent outline-none border"
                  />
                </div>

                <label className="font-bold text-md">Email Address</label>
                <input
                  value={signUpUser.email}
                  onChange={(e) =>
                    setsignUpUser({ ...signUpUser, email: e.target.value })
                  }
                  type="email"
                  placeholder="email address"
                  className="p-4 rounded-full bg-transparent outline-none border"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-md">Password</label>
                <input
                  value={signUpUser.password}
                  onChange={(e) =>
                    setsignUpUser({ ...signUpUser, password: e.target.value })
                  }
                  type="password"
                  placeholder="password"
                  className="p-4 rounded-full bg-transparent outline-none border"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-md">Confirm Password</label>
                <input
                  value={signUpUser.confirmPassword}
                  onChange={(e) =>
                    setsignUpUser({
                      ...signUpUser,
                      confirmPassword: e.target.value,
                    })
                  }
                  type="password"
                  placeholder="confirm password"
                  className="p-4 rounded-full bg-transparent outline-none border"
                />
              </div>

              <button
                onClick={handleSignup}
                className={`${
                  signupLoading ? "bg-orange-100" : "bg-primarycolor"
                } text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
              >
                {signupLoading ? (
                  <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthComponent;
