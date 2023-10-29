import React from 'react'
import { NavLink } from 'react-router-dom'

import { Logo } from '../assets/img'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'

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
                    alt="logo"
                    className='w-12'
                />
                <p className='font-semibold text-xl'>RFC</p>
            </NavLink>
            <hr />

            {/* Left Menu */}
            <ul className='flex flex-col gap-3'>
                <NavLink
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                            : isNotActiveStyles
                    }
                    to={'/dashboard/home'}
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                            : isNotActiveStyles
                    }
                    to={'/dashboard/orders'}
                >
                    Orders
                </NavLink>
                <NavLink
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                            : isNotActiveStyles
                    }
                    to={'/dashboard/items'}
                >
                    Items
                </NavLink>
                <NavLink
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                            : isNotActiveStyles
                    }
                    to={'/dashboard/newItems'}
                >
                    Add New Items
                </NavLink>
                <NavLink
                    className={({ isActive }) => 
                        isActive
                            ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                            : isNotActiveStyles
                    }
                    to={'/dashboard/users'}
                >
                    Users
                </NavLink>
            </ul>
            
            {/* Get Center */}
            <div className='w-full items-center justify-center flex h-[225px] mt-auto px-2'>
                <div className='w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3'>
                    <div className='w-12 h-12 border bg-white rounded-full flex items-center justify-center'>
                        <p className='text-2xl font-bold text-red-500'>?</p>
                    </div>
                    <p className='text-xl text-primary font-semibold'>Help Center</p>
                    <p className='text-base text-gray-300 text-center'>Having trouble in city, Please contact us for more questions</p>
                    <p className='px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer'>Get in touch</p>
                </div>
            </div>
        </div>
    )
}

export default DBLeftSection