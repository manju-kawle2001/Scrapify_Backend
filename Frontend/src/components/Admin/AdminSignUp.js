import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../WebApi";

export default function AdminSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contactError, setContactError] = useState("");

  const navigate = useNavigate();
  const adminnameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const contactInput = useRef();

  const validateName = (inputName) => {
    if (!inputName.trim()) {
      setNameError("Name is required");
      return false;
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(inputName)) {
      setNameError("Name should contain only letters and spaces");
      return false;
    }

    setNameError("");
    return true;
  };

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

  const validateContact = (inputContact) => {
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(inputContact)) {
      setContactError("Invalid contact number (10 digits required)");
      return false;
    }
    setContactError("");
    return true;
  };

  const handleSignUp = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isContactValid = validateContact(contact);

    if (isNameValid && isEmailValid && isPasswordValid && isContactValid) {
      try {
        const response = await axios.post(Api.AdminSignUpApi, {
          adminname: name,
          email: email,
          password: password,
          contact: contact
        });
        console.log(response);
        const admin = response.data.admin;
        sessionStorage.setItem("admin", JSON.stringify(admin));
        toast.success("Sign up success! Please sign in");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error("Oops! Something went wrong..");
      }
    }
  };

  const handleNameChange = (event) => {
    const inputName = event.target.value;
    setName(inputName);
    validateName(inputName);
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

  const handleContactChange = (event) => {
    const inputContact = event.target.value;
    setContact(inputContact);
    validateContact(inputContact);
  };

  return (
    <>
      <ToastContainer />
      <div className="h-full w-full flex justify-center items-center mt-24">
        <div className="h-4/5 w-1/3 flex items-center flex-col p-2 shadow-lg">
          <h3 className="text-2xl font-bold font-oswald text-center mt-5">Admin Registration</h3>
          <div className="h-[3px] bg-black w-2/3 mt-4"></div>
          <form className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="username" value="Your name" />
              </div>
              <TextInput
                value={name}
                onChange={handleNameChange}
                ref={adminnameInput}
                id="username"
                type="text"
                placeholder="Enter your name"
                required
              />
              {nameError && <span style={{ color: "red" }}>{nameError}</span>}
            </div>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your Email" />
              </div>
              <TextInput
                value={email}
                ref={emailInput}
                onChange={handleEmailChange}
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
              {emailError && <span style={{ color: "red" }}>{emailError}</span>}
            </div>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                value={password}
                ref={passwordInput}
                onChange={handlePasswordChange}
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
            </div>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="contact" value="Contact Number" />
              </div>
              <TextInput
                value={contact}
                ref={contactInput}
                onChange={handleContactChange}
                id="contact"
                type="text"
                placeholder="Enter your contact number"
                required
              />
              {contactError && <span style={{ color: "red" }}>{contactError}</span>}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="underline text-blue-700"
            >
              Already have an account?
            </button>
            <Button
              onClick={handleSignUp}
              className="col-span-2 text-xl font-bold font-oswald bg-slate-800 hover:opacity-70"
              type="button"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
