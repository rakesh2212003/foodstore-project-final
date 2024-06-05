import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { LoginBg, Logo } from '../assets/img'
import { LoginInput } from '../components'
import { FaUserAlt, FaEnvelope, FaLock, FcGoogle } from '../assets/icons'
import { buttonClick } from '../animations'
import { validateUserJWTToken } from '../api'
import { setUserDetails } from '../context/actions/userActions'
import { alertInfo, alertWarning, alertNULL, alertDanger } from '../context/actions/alertActions'

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { app } from '../config/firebase.config'

const Login = () => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSignup, setIsSignup] = useState(true)

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const alert = useSelector(state => state.alert)

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true })
        }
    }, [user])

    // Login with google
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider).then(userCred => {
            auth.onAuthStateChanged(cred => {
                if (cred) {
                    cred.getIdToken().then(token => {
                        validateUserJWTToken(token).then(data => {
                            dispatch(setUserDetails(data))
                        })
                        navigate('/', { replace: true })
                    })
                }
            })
        })
    }

    // Sign up with email && password
    const signUpWithEmailPass = async () => {
        if ((userName && userEmail && password && confirmPassword) === '') {
            dispatch(alertInfo("Required fields should not be empty"));
            setTimeout(() => {
                dispatch(alertNULL());
            }, 3000);
        } else {
            if (password.length < 6) {
                dispatch(alertWarning("Password must be atleast 6 character"));
                setTimeout(() => {
                    dispatch(alertNULL());
                }, 3000);
            }
            else {
                if (password !== confirmPassword) {
                    dispatch(alertWarning("Password doesn't match"));
                    setTimeout(() => {
                        dispatch(alertNULL());
                    }, 3000);
                } else {
                    await createUserWithEmailAndPassword(auth, userEmail, password).then(userCred => {
                        setUserName('')
                        setUserEmail('')
                        setPassword('')
                        setConfirmPassword('')
                        auth.onAuthStateChanged(cred => {
                            if (cred) {
                                cred.getIdToken().then(token => {
                                    validateUserJWTToken(token).then(data => {
                                        dispatch(setUserDetails(data))
                                    })
                                    navigate('/', { replace: true })
                                })
                            }
                        })
                    })
                }
            }
        }
    }

    // Sign in with email and password
    const signInWithEmailPass = async () => {
        if ((userEmail && password) === '') {
            dispatch(alertInfo("Required fields should not be empty"))
        } else {
            try {
                await signInWithEmailAndPassword(auth, userEmail, password).then(userCred => {
                    auth.onAuthStateChanged(cred => {
                        if (cred) {
                            cred.getIdToken().then(token => {
                                validateUserJWTToken(token).then(data => {
                                    dispatch(setUserDetails(data))
                                })
                                navigate('/', { replace: true })
                            })
                        }
                    })
                })
            } catch (err) {
                dispatch(alertDanger("Invalid email or password"));
                setTimeout(() => {
                    dispatch(alertNULL());
                }, 3000);
            }
        }
    }

    return (
        <div className='w-screen h-screen relative overflow-hidden flex'>
            {/* Bg image */}
            <img
                className='w-full h-full object-cover absolute top-0 left-0'
                src={LoginBg}
                alt="Logo"
            />
            {/* Left ContentBox */}
            <div className='flex flex-col items-center bg-lightOverlay w-full md:w-[500px] h-full z-10 backdrop-blur-md p-4 px-4 py-4 gap-4'>
                {/* Brand logo and name */}
                <div className='flex items-center justify-start gap-4 w-full'>
                    <img
                        className='w-8'
                        src={Logo}
                        alt=""
                    />
                    <p className='text-headingColor font-semibold text-3xl'>RFC</p>
                </div>

                <p className='text-3xl font-semibold text-headingColor'>{isSignup ? 'Welcome' : 'Welcome Back'}</p>
                <p className='text-xl text-textColor -mt-4'>{isSignup ? 'Sign Up' : 'Sign In'} with following</p>

                {/* Login inputs */}
                <div className='w-full flex flex-col items-center justify-center gap-4 px-4 md:px-12 py-4'>
                    {isSignup && (
                        <LoginInput
                            icon={<FaUserAlt className='text-xl text-textColor' />}
                            type={"text"}
                            placeHolder={"Display Name"}
                            inputState={userName}
                            inputStateFunc={setUserName}
                            isSignup={isSignup}
                        />
                    )}

                    <LoginInput
                        icon={<FaEnvelope className='text-xl text-textColor' />}
                        type={"Email"}
                        placeHolder={"Email ID"}
                        inputState={userEmail}
                        inputStateFunc={setUserEmail}
                        isSignup={isSignup}
                    />

                    <LoginInput
                        icon={<FaLock className='text-xl text-textColor' />}
                        type={"password"}
                        placeHolder={"Password"}
                        inputState={password}
                        inputStateFunc={setPassword}
                        isSignup={isSignup}
                    />

                    {isSignup && (
                        <LoginInput
                            icon={<FaLock className='text-xl text-textColor' />}
                            type={"password"}
                            placeHolder={"Confirm Password"}
                            inputState={confirmPassword}
                            inputStateFunc={setConfirmPassword}
                            isSignup={isSignup}
                        />
                    )}

                    {/* Sign in / Sign up changer*/}
                    {isSignup ? (
                        <p>Already have an account:{" "}
                            <motion.button
                                className='text-orange-500'
                                {...buttonClick}
                                onClick={() => { setIsSignup(false) }}
                            >
                                Sign In
                            </motion.button>
                        </p>
                    ) : (<p>Doesn't have an account:{" "}
                        <motion.button
                            className='text-orange-500'
                            {...buttonClick}
                            onClick={() => { setIsSignup(true) }}
                        >
                            Sign Up
                        </motion.button>
                    </p>
                    )}

                    {/* Sign in / Sign up button */}
                    {isSignup ? (
                        <motion.button
                            className='w-full px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-500 transition-all duration-150'
                            {...buttonClick}
                            onClick={signUpWithEmailPass}
                        >
                            Sign Up
                        </motion.button>
                    ) : (
                        <motion.button
                            className='w-full px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-500 transition-all duration-150'
                            {...buttonClick}
                            onClick={signInWithEmailPass}
                        >
                            Sign In
                        </motion.button>
                    )}
                </div>

                {/* -----or----- */}
                <div className='flex items-center justify-between gap-16 -m-2'>
                    <div className='w-24 h-[1px] rounded-md bg-white'></div>
                    <p className='text-white'>or</p>
                    <div className='w-24 h-[1px] rounded-md bg-white'></div>
                </div>

                {/* Login with google */}
                <motion.div
                    className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4'
                    {...buttonClick}
                    onClick={loginWithGoogle}
                >
                    <FcGoogle className='text-3xl' />
                    <p className='capitalize text-base text-headingColor'>Sign in with google</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login