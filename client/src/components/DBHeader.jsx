import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { MdSearch, BsToggles2, BsFillBellFill, MdLogout } from '../assets/icons'
import { buttonClick } from '../animations'
import { Avatar } from '../assets/img'
import { setUserNull } from '../context/actions/userActions'

import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'

const DBHeader = () => {

    const user = useSelector(state => state.user)

    const auth = getAuth(app);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(setUserNull())
            navigate("/login", { replace: true });
        }).catch((err) => console.log(err));
    };

    return (
        <div className='w-full flex items-center justify-between gap-3'>
            {/* Welcome Message */}
            <p className='text-2xl text-headingColor font-semibold'>
                Welcome to RFC
                {user?.name && (
                    <span className='block text-base text-gray-500'>
                        {`Hello ${user?.name}...!`}
                    </span>
                )}
            </p>

            <div className='flex items-center justify-center gap-4'>
                {/* Search section */}
                <div className='flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md'>
                    <MdSearch className='text-gray-400 text-2xl'/>
                    <input
                        type='text'
                        placeholder='Search Here...'
                        className='border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor'
                    />
                    <BsToggles2 className='text-gray-400 text-2xl'/>
                </div>

                {/* Notification icon */}
                <motion.div
                    {...buttonClick}
                    className='w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center'
                >
                    <BsFillBellFill className='text-gray-400 text-xl'/>
                </motion.div>
                
                {/* Profile-Picture/Logout */}
                <div className='flex items-center justify-center gap-2'>
                    {/* Profile Picture */}
                    <div className='w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden'>
                        <motion.img 
                            src={user?.picture ? user?.picture : Avatar}
                            whileHover={{ scale: 1.15 }}
                            referrerPolicy='no-referrer'
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Logout */}
                    <motion.div
                        {...buttonClick}
                        onClick={signOut}
                        className='w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center'
                    >
                        <MdLogout className='text-gray-400 text-xl'/>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default DBHeader