import { useNavigate } from 'react-router-dom'
import orderempty from './img/orderempty.webp'
export default function MyOrders() {
    const navigate = useNavigate()
    const handleClickShopNow = () => {
        navigate('/shop')
    }
    return <>
        <div>
            <div className="w-screen h-screen flex justify-center bg-white ">
                <div className='mt-3 flex  items-center flex-col '>
                    <img className='h-[220px] w-[220px]' src={orderempty} alt="orderempty" />
                    <h3 className='text-center font-oswald font-medium text-lg m-2'>No Order Found !</h3>
                    <button onClick={handleClickShopNow} className="text-black bg-[#CFDDF7] rounded-md md:px-3 md:py-2 px-2 font-medium py-1 hover:bg-slate-800 hover:text-white hover:opacity-70 ml-4">Shop Now</button>
                </div>
            </div>
        </div>
    </>
}