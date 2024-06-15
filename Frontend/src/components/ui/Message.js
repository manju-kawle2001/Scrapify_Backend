import { Button } from 'flowbite-react';



function Message({ name, time, text, showForm }) {
    const converintoDate = (date) => {
        const createdAt = new Date(date);
        const formattedCreatedAt = createdAt.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return formattedCreatedAt;
    }
    return (
        <>
            <div className="ml-5 flex items-start gap-2.5">
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{converintoDate(time)}</span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{text}</p>
                    <div className='flex justify-around'>
                        <Button className='bg-green-500'>Done</Button>
                        <Button onClick={() => showForm(false)} className='bg-red-600'>Cancle</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;
