import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { fadeInOut } from '../animations'

const LoginInput = ({ 
    icon,
    type,
    placeHolder,
    inputState,
    inputStateFunc,
    isSignup
}) => {

    const [isFocus, setIsFocus] = useState(false);

    return (
        <motion.div 
            className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${isFocus ? 'shadow-md shadow-orange-400' : 'shadow-none'}`}
            {...fadeInOut}
        >
            {icon}
            <input
                className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none'
                type={type}
                placeholder={placeHolder}
                value={inputState}
                onChange={(e) => inputStateFunc(e.target.value)}
                onFocus={() => {setIsFocus(true)}}
                onBlur={() => {setIsFocus(false)}}
            />
        </motion.div>
    )
}

export default LoginInput