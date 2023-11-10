import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Logo } from '../assets/img'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { buttonClick } from '../animations'

const DBLeftSection = () => {
    return (
        <div className='h-full py-4 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-[200px] w-[300px] gap-3'>
            {/* Shop Logo */}
            <NavLink
                to={'/'}
                className='flex items-center justify-start gap-4 px-6'
            >
                <img
                    src={Logo}
                    alt='logo'
                    className='w-12'
                />
                <p className='font-semibold text-xl'>
                    RFC
                </p>
            </NavLink>

            <hr />

            {/* Left Menu */}
            <ul className='flex flex-col gap-3'>
                <NavLink
                    to={'/dashboard/home'}
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-400`
                            : isNotActiveStyles
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to={'/dashboard/orders'}
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-400`
                            : isNotActiveStyles
                    }
                >
                    Orders
                </NavLink>

                <NavLink
                    to={'/dashboard/items'}
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-400`
                            : isNotActiveStyles
                    }
                >
                    Items
                </NavLink>

                <NavLink
                    to={'/dashboard/newItem'}
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-400`
                            : isNotActiveStyles
                    }
                >
                    Add New Item
                </NavLink>

                <NavLink
                    to={'/dashboard/users'}
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-400`
                            : isNotActiveStyles
                    }
                >
                    Users
                </NavLink>
            </ul>
            
            {/* Help Center */}
            <div className='w-full items-center justify-center flex h-[225px] mt-auto px-2'>
                <div className='w-full h-full rounded-md bg-orange-400 flex items-center justify-center flex-col gap-2 px-3'>
                    <div className='w-12 h-12 border bg-white rounded-full flex items-center justify-center'>
                        <p className='text-2xl font-bold text-orange-400'>
                            ?
                        </p>
                    </div>

                    <p className='text-xl text-primary font-semibold'>
                        Help Center
                    </p>

                    <p className='text-base text-gray-300 text-center'>
                        Having trouble in city, Please contact us for more questions
                    </p>

                    <motion.p
                        {...buttonClick}
                        className='px-4 py-2 rounded-full bg-primary text-orange-400 cursor-pointer'
                    >
                        Get in touch
                    </motion.p>
                </div>
            </div>
        </div>
    )
}

export default DBLeftSection