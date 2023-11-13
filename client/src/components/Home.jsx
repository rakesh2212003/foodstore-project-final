import React from 'react'
import { motion } from 'framer-motion'

import { Delivery, HeroBg } from '../assets/img'
import { buttonClick, staggerFadeInOut } from '../animations'
import { randomData } from '../utils/styles'

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
                    The Fastest Delivery in{" "}
                    <span className='text-orange-600'>
                        Your Galaxy
                    </span>
                </p>

                <p className='text-textColor text-lg -mt-2'>
                    Welcome to the food palace{" "}
                    <strong>
                        RFC
                    </strong>
                </p>

                <motion.button
                    {...buttonClick}
                    className='bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold'
                >
                    Order Now
                </motion.button>
            </div>

            <div className='py-4 flex-1 flex items-center justify-end relative'>
                <img 
                    src={HeroBg} 
                    alt="" 
                    className='absolute top-0 right-0 w-full h-[460px] md:w-auto'
                />

                <div className='w-full md:w-[360px] ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-12'>
                    {randomData && randomData.map((data,i) => (
                        <motion.div
                            key = {i}
                            {...staggerFadeInOut(i)}
                            className='w-32 h-36 md:h-auto md:w-auto p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'
                        >
                            <img 
                                src={data.imageURL} 
                                alt=""
                                className='w-12 h-12 md:w-28 md:h-28 md:-mt-16 object-contain' 
                            />
                            <p className='text-sm font-semibold text-textColor'>
                                {data.product_name.slice(0,20)}
                            </p>

                            <p className='text-[12px] text-center md:text-base text-lightTextGray font-semibold capitalize'>
                                {data.product_category}
                            </p>

                            <p className='text-sm font-semibold text-headingColor'>
                                <span className='text-xs text-red-600'>
                                    &#8377;
                                </span>{" "}
                                {data.product_price}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Home