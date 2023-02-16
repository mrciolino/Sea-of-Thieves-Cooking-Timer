import React from 'react'

var speed: number = 1; // 1 = fast, 10 = normal

const ProgressBar: React.FC<{ value: number, duration: number, burntValue: number, burntDuration: number }> = ({ value, duration, burntValue, burntDuration }) => {

    var remaining: number = Math.round(duration - (duration * value / 100));
    var remainingBurnt: number = Math.round(burntDuration - (burntDuration * burntValue / 100));
    const progressBarStyles = { width: `${value}%`, transition: 'width 1.0s, background-color 2.0s, color 2.0s' }
    const burntBarStyles = { width: `${burntValue}%`, transition: 'width 1.0s, background-color 2.0s, color 2.0s' }

    return (
        <>
            <div className={`flex justify-between mb-1 ${value > 80 ? 'text-red-600 dark:text-red-100' : 'text-blue-600 dark:text-blue-100'}`}>
                <span className="text-base font-medium">Time</span>
                <span className="text-sm font-medium ">{remaining + "s"}</span>
            </div>
            <div className="relative w-full h-2.5">
                <div className="w-full bg-white h-2.5 rounded-full dark:bg-gray-300">
                    <div className={`${value > 80 ? 'bg-red-600' : 'bg-blue-600'} h-2.5 rounded-full`} style={progressBarStyles}>
                    </div>
                    <div className="bg-red-900 h-2.5 rounded-full absolute top-0" style={burntBarStyles}>
                    </div>
                </div>
            </div>
            <div className={`flex justify-between mt-1 ${burntValue > 80 ? 'text-red-600 dark:text-red-100' : 'text-blue-600 dark:text-blue-100'}`}>
                <span className="text-base font-medium">Burnt</span>
                <span className="text-sm font-medium">{remainingBurnt + "s"}</span>
            </div>
        </>
    )
}

const useProgressBar = (duration: number, inprogress: boolean, setValue: React.Dispatch<React.SetStateAction<number>>, speed: number) => {
    React.useEffect(() => {
        if (inprogress) {
            const startTime = new Date();
            const timer = setInterval(() => {
                const now = new Date();
                const elapsed = now.getTime() - startTime.getTime();
                const progress = (elapsed / (duration * speed));
                setValue(progress > 100 ? 100 : progress);
            }, 100);
            return () => clearInterval(timer);
        }
    }, [inprogress]);
}

const Card: React.FC<{ title: string, image: string, duration: number }> = ({ title, image, duration }) => {

    const [value, setValue] = React.useState(0);
    const [inprogress, setInprogress] = React.useState(false);
    const [burnt_value, setBurnt_value] = React.useState(0);
    const [burnt_inprogress, setBurnt_inprogress] = React.useState(false);

    React.useEffect(() => {
        if (value >= 100) {
            setInprogress(false);
            setBurnt_inprogress(true);
        }
    }, [value]);

    React.useEffect(() => {
        if (burnt_value >= 100) {
            setBurnt_inprogress(false);
        }
    }, [burnt_value]);

    useProgressBar(duration, inprogress, setValue, speed);
    useProgressBar(duration, burnt_inprogress, setBurnt_value, speed);

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
                setBurnt_inprogress(false)
                break;
        }
    };

    return (
        <div className="p-2 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl hover:scale-105" onClick={handleClick}>
            <div className="relative h-[8rem] w-full rounded-t-xl overflow-hidden">
                <img src={image} className="absolute inset-0 w-full h-full object-cover" alt={title} />
            </div>
            <div className="group block rounded-b-xl bg-white p-3 hover:bg-slate-100 text-center cursor-pointer dark:bg-gray-500">
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
