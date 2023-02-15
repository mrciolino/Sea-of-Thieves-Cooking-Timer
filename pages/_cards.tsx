import React from 'react'

const ProgressBar: React.FC<{ value: number, duration: number }> = ({ value, duration }) => {
    var remaining: number = Math.round(duration - (duration * value / 100));
    return (
        <>
            <div className={`flex justify-between mb-1 ${value > 80 ? 'text-red-600' : 'text-blue-600'} dark:text-white`}>
                <span className="text-base font-medium">Time</span>
                <span className="text-sm font-medium ">{remaining + "s"}</span>
            </div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full dark:bg-gray-300">
                <div className={`${value > 80 ? 'bg-red-600' : 'bg-blue-600'} h-2.5 rounded-full`} style={{ width: value + "%" }}>
                </div>
            </div>
        </>
    )
}


const Card: React.FC<{ title: string, image: string, duration: number }> = ({ title, image, duration }) => {

    const [value, setValue] = React.useState(0);
    const [inprogress, setInprogress] = React.useState(false);

    React.useEffect(() => {
        if (inprogress) {
            const timer = setInterval(() => {
                setValue((prevValue) => (prevValue >= 100 ? 0 : prevValue + 1));
            }, duration * 10); // interval -> 40s * 1000ms/s % 100  = 400 ms -> 100% in 40s = duration * 10
            return () => {
                clearInterval(timer);
            };
        }
    }, [inprogress]);

    React.useEffect(() => {
        if (value >= 100) {
            setInprogress(false);
        }
    }, [value]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        switch (e.detail) {
            case 1:
                setInprogress(!inprogress)
                break;
            case 2:
                setValue(0)
                setInprogress(false)
                break;
        }
    };

    return (
        <div className="p-2 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl hover:scale-105" onClick={handleClick}>
            <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                <img src={image} className="absolute inset-0 w-full h-full object-cover" alt={title} />
            </div>
            <div className="group block rounded-b-xl bg-white p-6 sm:p-8 hover:bg-slate-100 text-center cursor-pointer">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500 dark:text-white dark:hover:text-slate-100 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {title}
                    </span>
                </button>
                <ProgressBar value={value} duration={duration} />
            </div>
        </div >
    )
}

export default Card
