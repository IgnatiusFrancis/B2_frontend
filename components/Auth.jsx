"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { document } from "postcss";

function Auth() {
  const { theme, authDisplay, setUser } = useContext(ThemeContext);
  const router = useRouter();
  const baseUrl = process.env.B2XCLUSIVE_APP_BASE_URL;

  const [newUser, setnewUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [signInUser, setsignInUser] = useState({
    email: "",
    password: "",
  });

  const [signinloading, setsigninLoading] = useState(false);
  const [signinSuccess, setsigninSuccess] = useState(false);
  const [signinerror, setsigninError] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setsigninLoading(true);
    try {
      setsigninLoading(true);
      const response = await axios.post(
        `${baseUrl}/auth/user/signin`,
        signInUser
      );

      const userData = response.data.data;
      setUser(userData.token);
      authDisplay();

      console.log("sign in Successfull", response.data);
      setsigninSuccess(true);
    } catch (error) {
      console.log("unable to sign in", error.message);
      setsigninError(true);
    } finally {
      setsigninLoading(false);
      router.push("/");
    }
  };

  const [signuploading, setsignupLoading] = useState(false);
  const [signupSuccess, setsignupSuccess] = useState(false);
  const [signuperror, setsignupError] = useState(false);

  const handlesignup = async (e) => {
    e.preventDefault();

    try {
      setsignupLoading(true);
      console.log(newUser);

      const response = await axios.post(`${baseUrl}/auth/user/signup`, newUser);

      console.log("User SignUp Successfull", response);
      setsignupSuccess(true);
    } catch (error) {
      console.log("Sign up Failed", error.message);
      setsignupError(true);
    } finally {
      setsignupLoading(false);
    }
  };

  return (
    <>
      <section className="absolute right-0 left-0 top-0 bottom-0 w-full h-full py-8 bg-[#000000d6] z-50 flex justify-center items-center">
        <div className=" absolute top-5 flex w-full justify-center p-8 z-30">
          {signinSuccess ? (
            <div className="bg-green-600 p-2 rounded-lg">
              <p className="md:text-sm text-[12px]">
                Account created Successfully
              </p>
            </div>
          ) : (
            ""
          )}

          {signinerror ? (
            <div className="bg-red-600 p-2 rounded-lg">
              <p className="md:text-sm text-[12px]">Account creation failed</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="md:flex h-full w-full md:w-4/6 relative">
          <div onClick={authDisplay} className=" z-50 absolute top-0 right-0">
            <FaWindowClose className={`text-primarycolor`} />
          </div>
          <div className={`${theme}-bgg ${theme}-text p-10 w-full md:w-2/4`}>
            <div className="py-10">
              <h1 className={`font-bold text-2xl ${theme}-text`}>
                {signinloading ? "Signing in, Please wait...." : "Sign In"}
              </h1>

              <p className={`${theme}-text`}>
                Welcome back! sign in to your account
              </p>
            </div>
            <form className={`${theme}-text flex flex-col gap-8`}>
              <div className="flex  flex-col gap-2">
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

              <div className="flex  flex-col gap-2">
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

              <Button title={"Sign In"} onclick={handleSignin} />
            </form>
          </div>

          <div
            className={`${theme}-bg relative ${theme}-text p-10 w-full md:w-2/4`}
          >
            <div className=" absolute top-5 flex w-full justify-center p-8 z-30">
              {signupSuccess ? (
                <div className="bg-green-600 p-2 rounded-lg">
                  <p className="md:text-sm text-[12px]">
                    Account created Successfully, Proceed to login...
                  </p>
                </div>
              ) : (
                ""
              )}

              {signuperror ? (
                <div className="bg-red-600 p-2 rounded-lg">
                  <p className="md:text-sm text-[12px]">
                    Account creation failed
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="py-10">
              <h1 className={`${theme}-text font-bold text-2xl`}>
                {signuploading
                  ? "Creating account please wait"
                  : "Create new Account"}
              </h1>

              <p className={`${theme}-text`}>
                Create your very own B2Exclusive account
              </p>
            </div>
            <form className={`${theme}-text flex flex-col gap-8`}>
              <div className="flex  flex-col gap-2">
                <label className="font-bold text-md">Create Username</label>
                <input
                  onChange={(e) =>
                    setnewUser({ ...newUser, userName: e.target.value })
                  }
                  value={newUser.userName}
                  type="text"
                  placeholder="username or email address"
                  className="p-4 rounded-full bg-transparent outline-none border border-gray-700"
                />
              </div>

              <div className="flex  flex-col gap-2">
                <label className="font-bold text-md">Email</label>
                <input
                  value={newUser.email}
                  onChange={(e) =>
                    setnewUser({ ...newUser, email: e.target.value })
                  }
                  type="email"
                  placeholder="username or email address"
                  className="p-4 rounded-full bg-transparent outline-none border border-gray-700"
                />
              </div>
              <div className="flex  flex-col gap-2">
                <label className="font-bold text-md">Password</label>
                <input
                  value={newUser.password}
                  onChange={(e) =>
                    setnewUser({ ...newUser, password: e.target.value })
                  }
                  type="password"
                  placeholder="password"
                  className="p-4 rounded-full bg-transparent outline-none border border-gray-700"
                />
              </div>

              <div className="flex  flex-col gap-2">
                <label className="font-bold text-md">Confirm Password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="p-4 rounded-full bg-transparent outline-none border border-gray-700"
                />
              </div>

              <Button title={"Create Account"} onclick={handlesignup} />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Auth;
