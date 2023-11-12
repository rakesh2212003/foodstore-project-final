import React from 'react'
import { motion } from 'framer-motion'

import { Delivery, HeroBg } from '../assets/img'
import { buttonClick } from '../animations'

const Home = () => {
    return (
        <motion.div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col items-start justify-start gap-2'>
                <div className='px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full'>
                    <p className='text-lg font-semibold text-orange-500'>
                        Free Delivery
                    </p>
                    <div className='w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md'>
                        <img
                            src={Delivery} 
                            alt="" 
                            className='w-full h-full object-contain'
                        />
                    </div>
                </div>

                <p className='text-[40px] text-headingColor md:text-[70px] font-sans font-extrabold tracking-wider'>
                    The Fastest Delivery in {"  "}
                    <span className='text-orange-600'>
                        Your Galaxy
                    </span>
                </p>

                {/* <p className='text-textColor text-lg'>Welcome to our shop</p> */}

                <motion.button
                    {...buttonClick}
                    className='bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold'
                >
                    Order Now
                </motion.button>
            </div>

            <div className='py-2 flex-1 flex items-center justify-end relative'>
                <img 
                    src={HeroBg} 
                    alt="" 
                    className='absolute top-0 right-0 w-full h-[420px] md:w-auto'
                />
            </div>
        </motion.div>
    )
}

export default Home