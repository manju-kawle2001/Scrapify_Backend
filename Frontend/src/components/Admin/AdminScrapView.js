import { DatePicker, TimePicker } from 'antd';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { getVehicleList } from '../../redux-config/VehicleSlice';

export default function AdminScrapView() {
    const { vehicleList, isLoading, error } = useSelector((store) => store.vehicle);
    const [scrapId, setScrapId] = useState(null)
    const [sellerID, setSellerID] = useState(null)
    const [vehicleID, setvehicleId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVehicleList())
    }, []);

    const { state } = useLocation();
    const [isForm, setForm] = useState(false)
    const msgRef = useRef(null);
    const timeRef = useRef(null);
    const dateRef = useRef(null);
    const vehicleNumberRef = useRef(null);


    const handleitrested = (scrapId, sellerId) => {
        setSellerID(sellerId);
        setScrapId(sellerId);
        setForm(true);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            sender: "66407af5ebde915a5756bc90",
            receiver: sellerID,
            scrapProductId: scrapId,
            message: `${msgRef.current.value} - Time: ${timeRef.current.value}, Date: ${dateRef.current.value}`,
            vehicleId: vehicleID
        };

        try {
            const response = await axios.post(`http://localhost:8000/api/Message/addMessage`, formData);
            if (response.status === 201) {
                console.log('Message sent successfully');
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return <>
        {isForm ? <div className="mt-5 flex justify-center items-center">
            <form className="p-4 w-[350px] grid gap-2 bg-white shadow-xl rounded-xl h-auto" onSubmit={handleSubmit}>
                <div className="">
                    <h3 className="text-center">Send Message To Scrap User</h3>
                    <IoCloseCircleSharp className="float-right -mt-2 text-3xl" onClick={() => setForm(false)} />
                </div>

                {/* msg */}
                <div>
                    <textarea
                        ref={msgRef}
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="Add Msg"
                        type="text"
                        name="msg"
                    />
                </div>
                {/* time vehicle number */}
                <div>
                    <label>Select Time and Date</label>
                    <br />
                    <div className='flex justify-around items-center'>
                        <TimePicker ref={timeRef} /> <p> To </p>
                        <TimePicker />
                    </div>
                </div>
                <div className='pl-2'>
                    <DatePicker ref={dateRef} />
                </div>
                {/* vehicle number */}
                <div>
                    <label>Vehicle Number</label>
                    <select ref={vehicleNumberRef} className="select select-primary w-full max-w-xs">
                        {vehicleList.map((vehicle, index) => (
                            <option onClick={() => { setvehicleId(vehicle._id) }} key={vehicle._id}>{vehicle.vehicleNumber}</option>
                        ))}
                    </select>

                </div>
                <div className="w-full flex justify-center items-center">
                    <button className="w-3/4 rounded-xl text-white p-2 font-bold bg-black" type="submit">Send</button>
                </div>
            </form>
        </div> : <div className="m-4 w-ful h-full  flex justify-start items-start">
            <div className="w-1/2  mt-16 p-4 flex justify-center items-center flex-col rounded-xl h-[300px]">
                <img className=" w-[300px]  object-contain h-[350px]  rounded-lg object-contains" src={state.thumbnail} alt="prodad" />
                <div className="mt-3 w-3/2 flex  items-center">
                    {
                        state.images.map((item, index) => {
                            return <div className="h-16 w-16 ml-2 bg-red-200 rounded-lg">
                                <img key={index} src={item} />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="w-2/5 mt-3 p-4 bg-white rounded-lg h-auto">
                <h3 className="text-xl text-center font-oswald font-bold">Scrap Details</h3>

                <div className="h-[1px] mt-2 mb-2 bg-black text-center"></div>

                <div className="grid gap-2">

                    <h1 className="text-sm font-oswald font-normal text-slate-600 "><span className="text-sm text-slate-800 font-oswald font-bold ">User Name : </span>{state.seller.username}</h1>
                    <h1 className="text-sm font-oswald font-normal text-slate-600 "><span className="text-sm text-slate-800 font-oswald font-bold ">Contact : </span>{state.seller.contact}</h1>
                    <h1 className="text-sm font-oswald font-normal text-slate-600 "><span className="text-sm text-slate-800 font-oswald font-bold ">Email : </span>{state.seller.email}</h1>
                    <h1 className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Scrap Name : </span>{state.title}</h1>
                    <h1 className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Category Name :</span>{state.categoryName}</h1>
                    <h1 className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Price : Rs</span> {state.price} /-</h1>
                    <h1 className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Conditon : </span>{state.condition}</h1>
                    <p className="line-clamp-3 text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Description : </span>{state.description}</p>
                    <div>
                        {state.location.map((item, index) => (
                            <div key={item._id}>
                                <p className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">State : </span>{item.state}</p>
                                <p className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">City : </span>{item.city}</p>
                                <p className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Full Address : </span>{item.fullAddress}</p>
                                <p className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Landmark : </span>{item.landmark}</p>
                                <p className="text-sm font-oswald font-normal text-slate-600"><span className="text-sm text-slate-800 font-oswald font-bold">Pincode : </span>{item.pincode}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={() => handleitrested(state._id, state.seller._id)} className="px-3 m-3 float-right hover:opacity-85 hover:transition-all  scale-105 py-2 rounded-lg font-bold font-oswald text-white bg-[#232323]">Inrested</button>

            </div>
        </div>

        }

    </>
}

