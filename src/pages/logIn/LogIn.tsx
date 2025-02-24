import { FaFacebook, FaGoogle } from "react-icons/fa";
import Button from "../../Base/button/Button";
import Input from "../../Base/input/Input";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { Login } from "../../components/login/Login";

export default function LogIn() {
  const [signup, setSignUp] = useState<boolean>(false);
  const [signinError, setsigninError] = useState<boolean>(false);
  const [signinEmail, setSigninEmail] = useState<string>("");
  const [signinPassword, setSigninPassword] = useState<string>("");

  const signinHandler = async () => {
    if (signinEmail && signinPassword) {
      try {
        const result = await Login({
          email: signinEmail,
          password: signinPassword,
        });
        localStorage.setItem("accestoken", result.data.accessToken);
      } catch (error) {
        console.log("Login failed:", error);
      }
    } else {
      setsigninError(true);
    }
  };

  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      <div className="shadow-2xl bg-white rounded-3xl blur-2x min-w-[60%] min-h-[70%] flex items-center justify-around relative overflow-hidden">
        <div
          className={`${
            signup ? "clip-signin" : "clip-signup"
          } left_gradint w-full h-full absolute top-0 right-0 z-20 flex justify-end `}
        >
          <div
            className={`text-white z-30 absolute right-[10%] top-[200px] flex flex-col items-center gap-5 transition-transform transform delay-500 duration-1000 ${
              signup && "delay-500 translate-x-[500px]"
            }`}
          >
            <h1 className="text-[30px]">Dont have Account ?</h1>
            <Button
              onClick={() => {
                setSignUp(true);
              }}
              content="SIGN UP"
              className="text-[16px] font-semibold shadow-2xl w-[200px]"
            />
          </div>
        </div>
        <div
          className={`${
            signup ? "clip-signup-2" : "clip-signin-2"
          } right_gradint w-full h-full absolute top-0 right-0 z-20`}
        >
          <div
            className={`text-white z-30 absolute left-[-33%] top-[200px] flex flex-col items-center gap-5 transition-transform transform delay-500 duration-1000 ${
              signup && "delay-500 translate-x-[500px]"
            }`}
          >
            <h1 className="text-[30px]">Do You Have Account ?</h1>
            <Button
              onClick={() => {
                setSignUp(false);
              }}
              content="SIGN IN"
              className="text-[16px] font-semibold shadow-2xl w-[200px]"
            />
          </div>
        </div>
        <img
          src="src\assets\images\undraw_sign-up_qamz.svg"
          alt=""
          className={`w-[300px] z-30 absolute bottom-10 left-[200px] transition-transform transform duration-700  ${
            !signup && "delay-200 translate-y-[500px]"
          }`}
        />
        <img
          src="src\assets\images\undraw_season-change_ohe6.svg"
          alt=""
          className={`w-[300px] z-30 absolute bottom-10 right-[200px] transition-transform transform duration-700  ${
            signup && "delay-200 translate-y-[500px]"
          }`}
        />
        <section
          className={`flex flex-col gap-3 font-semibold items-center absolute left-32 transition-transform delay-300 transform duration-1000 ${
            signup && "delay-0 translate-x-[-400px]"
          }`}
        >
          <h1 className="text-[35px] text-blue-500">SIGN IN</h1>
          <Input
            type="text"
            LabelContent="Email"
            forId="email"
            onchange={(e) => {
              setSigninEmail(e.target.value);
              setsigninError(false);
            }}
            // error={signinError}
            value={signinEmail}
          />
          <Input
            type="password"
            LabelContent="password"
            forId="password"
            onchange={(e) => {
              setSigninPassword(e.target.value);
            }}
            // error={signinError}
            value={signinPassword}
          />
          <Button
            onClick={signinHandler}
            content="SIGN IN"
            className="text-[16px] w-1/2"
          />
          {signinError && (
            <p className="font-thin text-red-600">
              Please fill out all fields.
            </p>
          )}
          <h2 className="text-blue-500">Or Sign In With Social Platforms</h2>
          <div className="flex gap-3">
            <FaFacebook className="text-blue-500 cursor-pointer text-3xl element" />
            <IoLogoLinkedin className="text-blue-500 cursor-pointer text-3xl element" />
            <FaSquareXTwitter className="text-blue-500 cursor-pointer text-3xl element" />
            <FaGoogle className="text-blue-500 cursor-pointer text-3xl element" />
          </div>
        </section>
        <section
          className={`flex flex-col gap-5 font-semibold items-center absolute right-[-300px] transition-transform delay-0 transform duration-1000 ${
            signup && "delay-300 translate-x-[-420px]"
          }`}
        >
          <h1 className="text-[25px]">SIGN UP</h1>
          <Input
            type="text"
            LabelContent="Email"
            forId="email"
            onchange={() => {}}
            // error={signinError}
            value={""}
          />
          <Input
            type="password"
            LabelContent="password"
            forId="password"
            onchange={() => {}}
            // error={signinError}
            value={""}
          />
          <Button
            onClick={() => {}}
            content="SIGN UP"
            className="text-[16px] w-1/2"
          />
          <h2>Or Sign Up With Social Platforms</h2>
          <div className="flex gap-3">
            <FaFacebook className="text-blue-500 cursor-pointer text-3xl element" />
            <IoLogoLinkedin className="text-blue-500 cursor-pointer text-3xl element" />
            <FaSquareXTwitter className="text-blue-500 cursor-pointer text-3xl element" />
            <FaGoogle className="text-blue-500 cursor-pointer text-3xl element" />
          </div>
        </section>
      </div>
    </div>
  );
}
