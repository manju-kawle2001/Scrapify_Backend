import axios from 'axios';
import { Button } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { UserContext } from '../../App';
import Message from "../ui/Message";
function UserMessages() {
    const [isForm, setForm] = useState(false)
    const handleState = () => {
        setForm(true)
    }
    const { user, setUser } = useContext(UserContext);
    const [msg, setmsg] = useState([])

    useEffect(() => {

        const getMsg = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/Message/getMessage-byuserId/${user._id}`);
                if (response.status === 200) {
                    console.log('Message Get');
                    console.log(response.data.messages)
                    setmsg(response.data.messages)
                } else {
                    console.error('Failed to send message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
        getMsg()
    }, [])
    return (
        <> <div className="w-screen flex justify-center items-center bg-white">

            {msg.length === 0 ? (
                <div className='w-screen h-screen flex justify-center '><div className='text-xl font-oswald font-normal mt-11'>No messages found</div></div>
            ) : (
                <div className="max-w-sm bg-white rounded-xl shadow-xl p-4 grid gap-2">
                    {msg.map((m, index) => (
                        <Message key={index} name={"Scrapify"} time={m.createdAt} showForm={handleState} text={m.message} />
                    ))
                    }
                </div>
            )}

        </div>

            {/* end msg  */}
            {
                isForm ? <div className=" p-8 rounded-xl top-[30%] grid gap-4 left-[40%] z-30 bg-white shadow-2xl  h-auto max-w-sm absolute">
                    <div className=" flex justify-between">
                        <h3 className="text-center">Resone Why Cencle The Deal ?</h3>
                        <IoCloseCircleSharp onClick={() => setForm(false)} className=" float-right  ml-2 text-3xl" />
                    </div>
                    <form className="grid gap-3">
                        <div>
                            <textarea className="textarea textarea-bordered h-24 w-full"
                                placeholder="Issue For Cencle Deal" type="text" name="issu" >
                            </textarea>
                        </div>
                        <div>
                            <Button>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div> : ""

            }
        </>
    );
}

export default UserMessages;

