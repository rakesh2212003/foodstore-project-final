import React, { useEffect, useState } from 'react'
import { motion, stagger } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { slideIn, buttonClick, staggerFadeInOut } from '../animations'
import { setCartOff } from '../context/actions/displayCartActions'
import { setCartItems } from '../context/actions/cartActions'
import { alertNULL, alertSuccess } from '../context/actions/alertActions'
import { BiChevronsRight, FcClearFilters, HiCurrencyRupee } from '../assets/icons'
import { emptyCart } from '../assets/img'
import { getAllCartItems, updateItemQuantity } from '../api'

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        let tot = 0;
        if(cart){
            cart.map((data) => {
                tot += data.product_price*data.quantity;
                setTotal(tot);
            })
        }
    }, [cart])

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
                        <div className='flex flex-col w-full items-start justify-start gap-2 h-[90%] overflow-y-scroll px-4 scrollbar-none'>
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
                        <div className='w-full h-full flex justify-center items-center'>
                            <img src={emptyCart} alt="" className='w-52' />
                        </div>
                    </>
                }

                <div className='absolute bottom-0 flex justify-evenly items-center w-full h-[10%] bg-zinc-900 rounded-3xl'>
                    <p className='text-2xl text-zinc-400 font-semibold'>Total</p>
                    <div className='flex justify-center items-center gap-2 text-3xl text-orange-500 font-semibold'>
                        <span className='text-primary'><HiCurrencyRupee className='text-primary'/></span>
                        <span> {total} </span>
                    </div>
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
        setItemTotal(data?.product_price * data?.quantity);
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