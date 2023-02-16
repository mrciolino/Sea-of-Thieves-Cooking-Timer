import React from 'react'

const ProgressBar: React.FC<{ value: number, duration: number, burntValue: number, burntDuration: number }> = ({ value, duration, burntValue, burntDuration }) => {

    var remaining: number = Math.round(duration - (duration * value / 100));
    var remainingBurnt: number = Math.round(burntDuration - (burntDuration * burntValue / 100));
    const progressBarStyles = { width: `${value}%`, transition: 'width 0.3s, background-color 0.3s' }
    const burntBarStyles = { width: `${burntValue}%`, transition: 'width 0.3s, background-color 0.3s' }

    return (
        <>
            <div className={`flex justify-between mb-1 ${value > 80 ? 'text-red-600' : 'text-blue-600'} dark:text-white`}>
                <span className="text-base font-medium">Time</span>
                <span className="text-sm font-medium ">{remaining + "s"}</span>
            </div>
            <div className="relative w-full h-2.5">
                <div className="w-full bg-gray-200 h-2.5 rounded-full dark:bg-gray-300">
                    <div className={`${value > 80 ? 'bg-red-600' : 'bg-blue-600'} h-2.5 rounded-full`} style={progressBarStyles}>
                    </div>
                    <div className={`${burntValue > 80 ? 'bg-red-800' : 'bg-red-800'} h-2.5 rounded-full absolute top-0`} style={burntBarStyles}>
                    </div>
                </div>
            </div>
            <div className={`flex justify-between mt-1 ${burntValue > 80 ? 'text-red-600' : 'text-blue-600'} dark:text-white`}>
                <span className="text-base font-medium">Burnt</span>
                <span className="text-sm font-medium">{remainingBurnt + "s"}</span>
            </div>
        </>
    )
}


const Card: React.FC<{ title: string, image: string, duration: number }> = ({ title, image, duration }) => {

    const [value, setValue] = React.useState(0);
    const [inprogress, setInprogress] = React.useState(false);
    const [burnt_value, setBurnt_value] = React.useState(0);
    const [burnt_inprogress, setBurnt_inprogress] = React.useState(false);

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
            setBurnt_inprogress(true);
        }
    }, [value]);

    React.useEffect(() => {
        if (burnt_inprogress) {
            const timer = setInterval(() => {
                setBurnt_value((prevValue) => (prevValue >= 100 ? 0 : prevValue + 1));
            }, duration * 10); // interval -> 40s * 1000ms/s % 100  = 400 ms -> 100% in 40s = duration * 10
            return () => {
                clearInterval(timer);
            };
        }
    }, [burnt_inprogress]);

    React.useEffect(() => {
        if (burnt_value >= 100) {
            setBurnt_inprogress(false);
        }
    }, [burnt_value]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        switch (e.detail) {
            case 1:
                setInprogress(!inprogress)
                setBurnt_inprogress(false)
                setBurnt_value(0)
                break;
            case 2:
                setValue(0)
                setBurnt_value(0)
                setInprogress(false)
                break;
        }
    };

    return (
        <div className="p-2 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl hover:scale-105" onClick={handleClick}>
            <div className="relative h-[8rem] w-full rounded-t-xl overflow-hidden">
                <img src={image} className="absolute inset-0 w-full h-full object-cover" alt={title} />
            </div>
            <div className="group block rounded-b-xl bg-white p-3 hover:bg-slate-100 text-center cursor-pointer">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500 dark:text-white dark:hover:text-slate-100 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {title}
                    </span>
                </button>
                <ProgressBar value={value} duration={duration} burntValue={burnt_value} burntDuration={duration} />
            </div>
        </div >
    )
}

export default Card
