import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

var speed: number = 10; // 1 = fast, 10 = normal

const ProgressBar: React.FC<{ value: number, duration: number, burntValue: number, burntDuration: number, inProgress: boolean }> = ({ value, duration, burntValue, burntDuration, inProgress }) => {

    var remaining: number = Math.round(duration - (duration * value / 100));
    var remainingBurnt: number = Math.round(burntDuration - (burntDuration * burntValue / 100));

    const isNearDone = value > 80;
    const isBurning = burntValue > 0;

    return (
        <div className="space-y-3">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex justify-between items-center ${isNearDone ? 'text-vscode-error' : 'text-vscode-accent'}`}
            >
                <span className="text-lg font-semibold">Cook Time</span>
                <motion.span
                    key={remaining}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-base font-mono font-bold px-3 py-1 rounded-md bg-vscode-highlight"
                >
                    {remaining}s
                </motion.span>
            </motion.div>

            <div className="relative w-full h-8 bg-vscode-highlight rounded-full overflow-hidden shadow-inner">
                <motion.div
                    className={`h-full rounded-full relative ${isNearDone ? 'bg-gradient-to-r from-vscode-warning to-vscode-error' : 'bg-gradient-to-r from-vscode-accent to-blue-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {inProgress && (
                        <div className="progress-striped progress-striped-animated rounded-full" />
                    )}
                </motion.div>

                <AnimatePresence>
                    {isBurning && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${burntValue}%` }}
                            exit={{ opacity: 0 }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-vscode-error to-black rounded-full"
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex justify-between items-center ${burntValue > 50 ? 'text-vscode-error' : 'text-vscode-textMuted'}`}
            >
                <span className="text-sm font-medium">Burnt in</span>
                <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-vscode-highlight">
                    {remainingBurnt}s
                </span>
            </motion.div>
        </div>
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

    const isActive = inprogress || burnt_inprogress;
    const cardBgClass = inprogress ? 'card-bg-cooking' : (burnt_inprogress ? 'card-bg-burning' : 'card-bg-idle');
    const borderGradientClass = inprogress
        ? 'border-gradient-animated-cooking'
        : (burnt_inprogress
            ? 'border-gradient-animated-burning'
            : 'border-gradient-animated-idle');
    const ringClass = inprogress
        ? 'border-vscode-accent ring-2 ring-vscode-accent/40'
        : (burnt_inprogress
            ? 'border-vscode-error ring-2 ring-vscode-error/40'
            : 'border-vscode-border');

    return (
        <motion.div
            className="group cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`relative rounded-2xl overflow-hidden ${borderGradientClass}`}>
                {/* Animated border pulse effect during countdown */}
                <AnimatePresence>
                    {inprogress && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                boxShadow: [
                                    '0 0 0 0 rgba(0, 122, 204, 0.7)',
                                    '0 0 0 8px rgba(0, 122, 204, 0)',
                                    '0 0 0 0 rgba(0, 122, 204, 0.7)',
                                ]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Card content */}
                <div className={`${cardBgClass} border-2 ${ringClass} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    {/* Image section */}
                    <motion.div
                        className="relative h-40 w-full overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vscode-bg opacity-60 z-10" />
                        <img
                            src={image}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={title}
                        />

                        {/* Status indicator */}
                        <AnimatePresence>
                            {inprogress && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute top-3 right-3 z-20"
                                >
                                    <motion.div
                                        className="w-3 h-3 bg-vscode-success rounded-full shadow-lg"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [1, 0.7, 1],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Content section */}
                    <div className="p-2 sm:p-5 space-y-2 sm:space-y-4">
                        <motion.h3
                            className="text-2xl font-bold text-center text-vscode-text group-hover:text-vscode-accent transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            {title}
                        </motion.h3>

                        <ProgressBar
                            value={value}
                            duration={duration}
                            burntValue={burnt_value}
                            burntDuration={duration}
                            inProgress={inprogress || burnt_inprogress}
                        />

                        {/* Action hint */}
                        <motion.div
                            className="text-[11px] sm:text-xs text-center text-vscode-textMuted opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ y: 6 }}
                            whileHover={{ y: 0 }}
                        >
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-vscode-highlight/40 whitespace-nowrap">
                                {inprogress ? 'Click: Pause • Double: Reset' : 'Click: Start'}
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Card
