import notificationimg from './../ui/img/emptyNotifications_4472f7.png'
export default function Notifications() {
    return <>
        <div className="w-screen flex justify-center items-center bg-white">
            <div className="w-3/4 h-screen flex justify-center">
                <div className='mt-16'>
                    <img src={notificationimg} alt="notificationimg" />
                    <h3 className='text-center mt-2 text-lg font-oswald font-semibold'>All caught up!</h3>
                    <h5 className='text-center mt-1 text-sm font-oswald font-normal'>There are no new notifications for you.</h5>
                </div>
            </div>
        </div>
    </>
}