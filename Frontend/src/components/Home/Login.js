import SlSpinner from '@shoelace-style/shoelace/dist/react/spinner';
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../App";
import Api from "../WebApi";
import './css/signup.css';
export default function Login({ setSignup, setLogin }) {


    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({ email: "", password: "", message: "" });
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (validate()) {
                setLoading(true);
                const response = await axios.post(Api.LoginApi, { email, password });
                saveUser(response.data.user, response.data.token);
                console.log(response.data);
                setEmail("");
                setPassword("");
                setLogin(false);
                console.log("Login success");
                setLogin(false);
                toast.success("login success");
                setUser(response.data.user);
                setLogin(false)
            }

        } catch (error) {

            if (error.message === "Network Error") {
                toast.error("Network Error !")
                setLoading(false)
            } else if (error.response.status == 400 && error.response.data.message == "invalid email") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email not Registerd",
                }));
            }
            else if (error.response.status == 400 && error.response.data.message == "invalid password") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "incorrect Password",
                }));
            } else {
                toast.error("Internal server error");
            }
        } finally {
            setLoading(false); // Reset loading state after login attempt
        }

    };


    const saveUser = (user, token) => {
        sessionStorage.setItem("current-user", JSON.stringify(user));
        sessionStorage.setItem("user-token", JSON.stringify(token))
    }
    const validate = () => {

        setErrors({ email: "", password: "" });
        if (!email.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Email is required",
            }));
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Invalid email format",
            }));
            return false;
        }

        if (!password.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is required",
            }));
            return false;
        }
        return true
    }

    return (
        <div className="signupbg absolute top-0 w-screen h-screen z-50 flex justify-center">
            <div className="absolute w-11/12 sm:w-10/12 md:w-5/12 h-3/4 bg-white rounded-2xl pt-2 sm:mt-[40px]">
                <div className="h-auto w-full flex items-center">
                    <h3 className="text-2xl font-bold font-oswald text-center w-11/12 pt-3 pl-11 mb-7">SCREPIFY</h3>
                    <div>
                        <IoClose onClick={() => setLogin(false)} className="absolute cursor-pointer text-3xl" />
                    </div>
                </div>
                {/* content section */}
                <div className="h-full w-full flex justify-center items-center -mt-16">
                    <div className="h-4/5 w-10/12 flex items-center flex-col p-2">
                        <h3 className="text-2xl font-bold font-oswald text-center">LOGIN WITH YOUR ACCOUNT</h3>
                        <div className="h-[3px] bg-black w-full mt-2"></div>
                        <form className=" w-10/12 flex justify-around items-center flex-col mt-3" onSubmit={handleLogin}>
                            <div className="w-full ">
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                                {errors.email && <small className="text-red-600 font-bold">{errors.email}</small>}
                            </div>
                            <div className="w-full ">
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Password" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                {errors.password && <small className="text-red-600 font-bold">{errors.password}</small>}
                            </div>
                            <Button
                                className="w-full mt-4 text-xl font-bold font-oswald bg-slate-800 hover:opacity-70"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <SlSpinner /> : 'Login'}
                            </Button>
                            {errors.message && <small className="text-red-600 font-bold">{errors.message}</small>}
                        </form>
                        <div className="mt-3">
                            <button
                                onClick={() => {
                                    setLogin(false);
                                    setSignup(true);
                                }}
                                className="underline text-blue-700"
                            >
                                I don't have an account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
