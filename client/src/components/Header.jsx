import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Logo } from '../assets/img'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { buttonClick, slideTop } from '../animations'
import { MdLogout, MdShoppingCart } from '../assets/icons'
import { setUserNull } from '../context/actions/userActions'

import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'

const Header = () => {

    const [isMenu, setIsMenu] = useState(false)

    const user = useSelector(state => state.user)

    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(setUserNull());
            navigate("/login", { replace: true });
        }).catch((err) => console.log(err));
    };

    return (
        <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-6 py-4'>
            {/* Shop Logo */}
            <NavLink
                to={'/'}
                className='flex items-center justify-center gap-4'
            >
                <img
                    src={Logo}
                    alt="logo"
                    className='w-12'
                />
                <p className='font-semibold text-xl'>RFC</p>
            </NavLink>

            {/* Navbar section */}
            <nav className='flex items-center justify-center gap-8'>
                {/* Nav items */}
                <ul className='hidden md:flex items-center justify-center gap-16'>
                    <NavLink
                        to={'/'}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to={'/menu'}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Menu
                    </NavLink>

                    <NavLink
                        to={'/services'}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        Services
                    </NavLink>

                    <NavLink
                        to={'/aboutus'}
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                    >
                        About Us
                    </NavLink>
                </ul>
                
                {/* Add to Cart */}
                <motion.div
                    className='relative cursor-pointer'
                    {...buttonClick}
                >
                    <MdShoppingCart className='text-3xl text-textColor' />
                    <div className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1'>
                        <p className='text-primary text-base font-semibold'>2</p>
                    </div>
                </motion.div>

                {/* Avatar/Menu Section */}
                {user ? (
                    <>
                        <div 
                            onMouseEnter={() => setIsMenu(true)}
                            className='relative cursor-pointer'
                        >
                            {/* Avatar */}
                            <div className='w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                                <motion.img
                                    src={user?.picture ? user?.picture : Avatar}
                                    whileHover={{ scale: 1.15 }}
                                    referrerPolicy='no-referrer'
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            {/* Header Menu Section */}
                            {isMenu && (
                                <motion.div
                                    className='px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4'
                                    onMouseLeave={() => setIsMenu(false)}
                                    {...slideTop}
                                >
                                    <Link
                                        to={"/dashboard/home"}
                                        className=" hover:text-red-500 text-xl text-textColor"
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        to={"/profile"}
                                        className=" hover:text-red-500 text-xl text-textColor"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to={"/user-orders"}
                                        className=" hover:text-red-500 text-xl text-textColor"
                                    >
                                        Orders
                                    </Link>
                                    <hr />

                                    {/* Sign-out Button */}
                                    <motion.div
                                        {...buttonClick}
                                        onClick={signOut}
                                        className='group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3'
                                    >
                                        <MdLogout className='text-2xl text-textColor group-hover:text-headingColor' />
                                        <p className='text-textColor text-xl group-hover:text-headingColor'>Sign out</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Header Login button */}
                        <NavLink
                            to={'/login'}
                        >
                            <motion.button
                                {...buttonClick}
                                className='px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer'
                            >
                                Login
                            </motion.button>
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header 