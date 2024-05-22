import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import { FaArrowLeft } from '../assets/icons'
import { Bill } from '../assets/img'
import { Header } from '../components'
import { buttonClick } from '../animations'

const CheckOutSuccess = () => {
    return (
        <main className='w-screen min-h-screen flex items-center justify-start flex-col'>
            <Header />

            <div className='w-full flex flex-col items-center justify-center mt-20 px-6 gap-8 pb-12'>
                <img src={Bill} alt="" className='w-full md:w-[450px]'/>
                <h1 className='text-3xl text-headingColor font-bold'>Amount paid successfully</h1>
            </div>

            <motion.div
                {...buttonClick}
            >
                <NavLink
                    to={"/"}
                    className="flex items-center justify-center gap-4 cursor-pointer text-xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
                >
                    <FaArrowLeft className='text-3xl text-textColor'/>
                    Get Back to Home
                </NavLink>
            </motion.div>

        </main>
    )
}

export default CheckOutSuccess