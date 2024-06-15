import SlSpinner from '@shoelace-style/shoelace/dist/react/spinner';
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Api from "../WebApi";
import OTPForm from "../ui/Otp";
import './css/signup.css';
export default function Signup({ setSignup, setLogin }) {


    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [otp, setShowOtp] = useState(false);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: ''
    });
    const handleSendOtp = async () => {
        setLoading(true);
        // event.preventDefault();
        const timer = setTimeout(async () => {
            try {
                if (validateForm()) {
                    const response = await axios.post(Api.sendOTPApi, { username, email });
                    setShowOtp(true);
                    toast.success("OTP send to your email");
                }
            } catch (error) {
                if (error.response.status === 409) {
                    toast.error('user already exist !');
                    setErrors({ username: "", contact: "", password: "", confirmPassword: "", email: "Email Alredy Exist" })
                }
                else if (error.response.status === 400) {
                    toast.error(error.response.data.message || 'Bad Request');
                } else if (error.message) {
                    console.log(error);
                    toast.error('Network Error !');
                } else {
                    toast.error('Internal Server Error');
                }
            } finally {
                setLoading(false); // Set loading to false when OTP response is received
            }
        }, 300);

        return () => clearTimeout(timer);
    };

    function validateForm() {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!contact.trim()) {
            newErrors.contact = 'Contact number is required';
        } else if (!/^[6-9]\d{9}$/.test(contact)) {
            newErrors.contact = 'Invalid Number';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 5) {
            newErrors.password = 'Minimum  5 Charecter Required';
        }
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return (
        <>
            <div className="signupbg absolute top-0 w-screen h-screen z-50 flex justify-center ">
                <div className='absolute w-11/12 sm:w-10/12 md:w-5/12 h-screen bg-white rounded-2xl pt-2 sm:mt-[40px]'>
                    {otp ? (
                        <OTPForm username={username} contact={contact} email={email} password={password} setSignup={setSignup} setShowOtp={setShowOtp} handleSendOtp={handleSendOtp} />
                    ) : (
                        <>
                            <div className="h-auto w-full flex items-center">
                                <h3 className="text-2xl font-bold font-oswald text-center w-11/12 pt-3 pl-11">SCREPIFY</h3>
                                <div>
                                    <IoClose onClick={() => { setSignup(false) }} className="absolute cursor-pointer text-3xl" />
                                </div>
                            </div>
                            {/* content section */}
                            <div className="h-full w-full flex justify-center items-center -mt-16">
                                <div className="h-4/5 w-10/12 flex items-center flex-col p-2 ">
                                    <h3 className="text-2xl font-bold font-oswald text-center">CREATE YOUR ACCOUNT</h3>
                                    <div className="h-[3px] bg-black w-full mt-2"></div>
                                    <div className="grid grid-cols-2 gap-4 mt-3" >

                                        <div className="col-span-2 sm:col-span-1">
                                            <div className="mb-2 block">
                                                <Label htmlFor="username" value="Username" />
                                            </div>
                                            <TextInput onChange={(event) => setUsername(event.target.value)} id="username" type="text" placeholder="Nitin Malviya" required />
                                            {errors.username && <small className="text-red-500">{errors.username}</small>}
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <div className="mb-2 block">
                                                <Label htmlFor="email1" value="Your Contact" />
                                            </div>
                                            <TextInput onChange={(event) => setContact(event.target.value)} id="contact" type="text" placeholder="+918877656541" required />
                                            {errors.email && <small className="text-red-500">{errors.email}</small>}
                                        </div>
                                        <div className="col-span-2">
                                            <div className="mb-2 block">
                                                <Label htmlFor="contact" value="Your Email" />
                                            </div>
                                            <TextInput onChange={(event) => setEmail(event.target.value)} id="email1" type="email" placeholder="example@gmail.com" required />
                                            {errors.contact && <small className="text-red-500">{errors.contact}</small>}
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <div className="mb-2 block">
                                                <Label htmlFor="password1" value="Your password" />
                                            </div>
                                            <TextInput onChange={(event) => setPassword(event.target.value)} id="password1" type="password" required />
                                            {errors.password && <small className="text-red-500">{errors.password}</small>}
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <div className="mb-2 block">
                                                <Label htmlFor="password2" value="Confirm password" />
                                            </div>
                                            <TextInput onChange={(event) => setConfirmPassword(event.target.value)} id="password2" type="password" required />
                                            {errors.confirmPassword && <small className="text-red-500 ">{errors.confirmPassword}</small>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">Remember me</Label>
                                        </div>
                                        <button onClick={() => { setLogin(true); setSignup(false); }} className="underline text-blue-700">Already have an account?</button>
                                        <Button onClick={() => handleSendOtp()} className="col-span-2 text-xl font-bold font-oswald bg-slate-800 hover:opacity-70" type="submit">{loading ? <SlSpinner /> : 'Next'}</Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
