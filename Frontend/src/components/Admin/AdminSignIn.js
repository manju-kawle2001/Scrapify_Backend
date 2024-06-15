import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Api from "../WebApi";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const emailInput = useRef();
  const passwordInput = useRef();

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(inputEmail)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (inputPassword) => {
    if (inputPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSignUp = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
  
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(Api.AdminSignInApi, {
          email: email,
          password: password,
        });  
        console.log("API Response:", response.data);  
        const admin = response.data.admin;
          sessionStorage.setItem("admin", JSON.stringify(admin));
          console.log("Admin data stored in session:", sessionStorage.getItem("admin"));
          toast.success("Sign In Success");
          navigate("/adminHome");
       
      } catch (err) {
        console.error("API Error:", err);
        toast.error("Oops! Something went wrong..");
      }
    }
  };  

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail);
  };

  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    validatePassword(inputPassword);
  };

  return (
    <>
      <ToastContainer />
      <div className="h-full w-full flex justify-center items-center mt-24">
        <div className="h-4/5 w-1/3 flex items-center flex-col p-2 shadow-lg">
          <h3 className="text-2xl font-bold font-oswald text-center mt-5">Admin Login</h3>
          <div className="h-[3px] bg-black w-2/3 mt-4"></div>
          <form className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your Email" />
              </div>
              <TextInput
                ref={emailInput}
                onChange={handleEmailChange}
                id="email"
                type="email"
                placeholder="manju@gmail.com"
                required
              />
              {emailError && <span style={{ color: "red" }}>{emailError}</span>}
            </div>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                ref={passwordInput}
                onChange={handlePasswordChange}
                id="password"
                type="password"
                required
              />
              {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <button onClick={() => navigate("/AdminSignUp")} className="underline text-blue-700">
              I don't have an account
            </button>
            <Button
              onClick={handleSignUp}
              className="col-span-2 text-xl font-bold font-oswald bg-slate-800 hover:opacity-70"
              type="button"
            >
              SignIn
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
