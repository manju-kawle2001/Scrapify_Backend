import axios from "axios";
import { TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import Api from "../WebApi";
import "./css/AddressPage.css";
const UpdateAddress = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [address, setAddress] = useState({
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        recipientName: "",
    });

    const [errors, setErrors] = useState({
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        recipientName: ""
    });


    useEffect(() => {
        const getAddress = async () => {
            try {
                if (!user) {
                    toast.error("you are not login");
                    return
                }
                const response = await axios.get(Api.GetAddress + `/${user._id}`);
                setAddress({
                    recipientName: response.data.recipientName,
                    streetAddress: response.data.streetAddress,
                    city: response.data.city,
                    country: response.data.country,
                    state: response.data.state,
                    postalCode: response.data.postalCode
                });

            } catch (error) {
                console.log(error);
            }
        }
        getAddress();
    }, []);





    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newErrors = {};
            Object.keys(address).forEach((key) => {
                if (!address[key]) {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                }
            });

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            const updatedAddress = { ...address, userId: user._id };
            const response = await axios.put(Api.UpdateAddress + `/${user._id}`, updatedAddress);
            toast.success("Address updated successfully");


        } catch (error) {
            console.log(error);

            // console.log('Error:', error);
        }
    };
    return (
        <>
            <div className="sm:w-3/4  bg-[#fdf4ff] font-oswald rounded-lg shadow-md w-11/12 p-6 card-custom">
                <div className="text-center mb-3">
                    <h4 className="text-gray-700 text-lg ">Shipping Address</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="recipientName" className="text-gray-700">Recipient Name</label>
                            <TextInput
                                type="text"
                                id="recipientName"
                                name="recipientName"
                                placeholder="RecipientName"
                                value={address.recipientName}
                                onChange={handleChange}
                            />
                            {errors.recipientName && (
                                <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="streetAddress" className="text-gray-700">Street Address</label>
                            <TextInput
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                value={address.streetAddress}
                                onChange={handleChange}
                                placeholder="Street Address"
                            />
                            {errors.streetAddress && (
                                <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
                            )}
                        </div>

                        {/** Pair of Fields: City & State */}
                        <div className="flex flex-col">
                            <label htmlFor="city" className="text-gray-700">City</label>
                            <TextInput
                                type="text"
                                id="city"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                placeholder="City"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="state" className="text-gray-700">State</label>
                            <TextInput
                                type="text"
                                id="state"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                placeholder="State"
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                            )}
                        </div>

                        {/** Pair of Fields: Country & Postal Code */}
                        <div className="flex flex-col">
                            <label htmlFor="country" className="text-gray-700">Country</label>
                            <TextInput
                                type="text"
                                id="country"
                                name="country"
                                value={address.country}
                                onChange={handleChange}
                                placeholder="Country"
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="postalCode" className="text-gray-700">Postal Code</label>
                            <TextInput
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={address.postalCode}
                                onChange={handleChange}
                                placeholder="Postal Code"
                            />
                            {errors.postalCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                            )}
                        </div>

                        {/** Submit Button */}
                        <button type="submit" className=" w-full btn btn-secondary  btn-rounded  text-white">
                            Update Address
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateAddress;
