import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { slideIn, buttonClick, staggerFadeInOut } from '../animations'
import { setCartOff } from '../context/actions/displayCartActions'
import { setCartItems } from '../context/actions/cartActions'
import { alertNULL, alertSuccess } from '../context/actions/alertActions'
import { BiChevronsRight, FcClearFilters, HiCurrencyRupee } from '../assets/icons'
import { emptyCart } from '../assets/img'
import { baseURL, getAllCartItems, updateItemQuantity } from '../api'

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch()

    const handleCheckOut = () => {
        const data = {
            user: user,
            cart: cart,
            total: total,
        }

        axios.post(`${baseURL}/api/products/create-checkout-session`, { data }).then((res) => {
            if(res.data.url){
                window.location.href= res.data.url;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        let tot = 0;
        if (cart) {
            tot = cart.reduce((acc, data) => acc + (data.product_price * data.quantity), 0);
            setTotal(tot);
        }
    }, [cart]);

    return (
        <motion.div
            {...slideIn}
            className='fixed z-50 top-0 right-0 w-[400px] bg-lightOverlay backdrop-blur-md shadow-md h-screen px-2'
        >
            <div
                className='w-full flex items-center justify-between py-4 pb-4 px-3'
            >
                <motion.i
                    {...buttonClick}
                    onClick={() => dispatch(setCartOff())}
                    className='cursor-pointer'
                >
                    <BiChevronsRight className='text-[50px] text-textColor ' />
                </motion.i>
                <p className='text-2xl text-textColor font-semibold'>Your Cart</p>
                <motion.i
                    {...buttonClick}
                    className='cursor-pointer'
                >
                    <FcClearFilters className='text-[30px] text-textColor' />
                </motion.i>
            </div>

            <div className='flex-1 flex flex-col items-start justify-start rounded-3xl bg-zinc-700 h-[85%] py-2 gap-2 relative'>
                {cart.length > 0 ?
                    <>
                        <div className='flex flex-col w-full items-start justify-start gap-2 h-[80%] overflow-y-scroll px-4 scrollbar-none'>
                            {cart?.map((item, i) => (
                                <CartItemCard
                                    key={i}
                                    index={i}
                                    data={item}
                                />
                            ))}
                        </div>
                    </> :
                    <>
                        <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
                            <img src={emptyCart} alt="" className='w-52' />
                            <p className='text-primary text-2xl font-semibold'>Empty Cart</p>
                        </div>
                    </>
                }

                <div className='absolute bottom-0 flex flex-col justify-evenly items-center w-full h-[20%] bg-zinc-900 rounded-3xl'>
                    <div className='w-full flex justify-evenly items-center gap-2 text-3xl font-semibold'>
                        <span className='text-2xl text-zinc-400 font-semibold'>Total</span>
                        <div className='flex justify-center items-center gap-2'>
                            <span><HiCurrencyRupee className='text-primary'/></span>
                            <span className='text-orange-500'> {total} </span>
                        </div>
                    </div>

                    <motion.button
                        {...buttonClick}
                        className='bg-orange-400 w-[70%] px-3 py-2 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl'
                        onClick={ handleCheckOut }
                    >
                        Check Out
                    </motion.button>
                </div>

            </div>
        </motion.div>
    )
}

export const CartItemCard = ({ index, data }) => {

    const [itemTotal, setItemTotal] = useState(0);
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const decrementCart = (productId) => {
        dispatch(alertSuccess('Cart item updated'))
        updateItemQuantity(user?.user_id, productId, "decrement").then((data) => {
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items))
                dispatch(alertNULL())
            })
        })
    }
    
    const incrementCart = (productId) => {
        dispatch(alertSuccess('Cart item updated'))
        updateItemQuantity(user?.user_id, productId, "increment").then((data) => {
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items))
                dispatch(alertNULL())
            })
        })
    }

    useEffect(() => {
        setItemTotal(data?.product_price * data?.quantity)
    }, [itemTotal, cart, data.product_price, data.quantity])

    return (
        <motion.div
            {...staggerFadeInOut(index)}
            key={index}
            className='w-full flex items-center justify-start bg-zinc-600 rounded-md drop-shadow-md px-2 gap-1'
        >
            <img
                src={data?.imageURL}
                alt="Product"
                className='w-24 h-24 object-contain'
            />

            <div className='flex items-center justify-start gap-1 w-full'>
                <p className='text-base text-primary font-semibold'>
                    {data?.product_name}
                    <span className='text-sm block capitalize text-gray-400'>{data?.product_category}</span>
                </p>
                <p className='flex items-center justify-center gap-1 text-base font-semibold text-orange-500 ml-auto'>
                    <HiCurrencyRupee className='text-orange-500' />
                    {itemTotal}
                </p>
            </div>

            <div className='ml-auto flex items-center justify-center gap-3'>
                <motion.div
                    {...buttonClick}
                    onClick={() => decrementCart(data?.productId)}
                    className='w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-700 cursor-pointer'
                >
                    <p className='text-xl font-semibold text-primary'>-</p>
                </motion.div>
                <p className='text-lg text-primary font-semibold'>{data?.quantity}</p>
                <motion.div
                    {...buttonClick}
                    onClick={() => incrementCart(data?.productId)}
                    className='w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-700 cursor-pointer'
                >
                    <p className='text-xl font-semibold text-primary'>+</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Cart