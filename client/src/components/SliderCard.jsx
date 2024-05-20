import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import { HiCurrencyRupee, IoBasket } from '../assets/icons'
import { buttonClick } from '../animations'
import { addNewItemToCart, getAllCartItems } from '../api'
import { alertNULL, alertSuccess } from '../context/actions/alertActions'
import { setCartItems } from '../context/actions/cartActions'

const SliderCard = ({ data, index }) => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const sendToCart = () => {
        addNewItemToCart(user?.user_id, data).then(res => {
            dispatch(alertSuccess('Added to the cart'))
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items));
            })
            setTimeout(() => {
                dispatch(alertNULL());
            }, 3000);
        })
    }

    return (
        <div className='bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-[340px] md:min-w-[350px] gap-3'>
            <img 
                src={data.imageURL} 
                alt="" 
                className='w-40 h-40 object-contain'
            />
            <div className='relative pt-12'>
                <p className='text-xl text-headingColor font-semibold'>
                    {data.product_name}
                </p>
                <p className='text-lg font-semibold text-orange-500 flex items-center justify-center gap-1'>
                    <HiCurrencyRupee className='text-orange-500'/>{" "}
                    {parseFloat(data.product_price).toFixed(2)}
                </p>

                <motion.div
                    {...buttonClick}
                    onClick={sendToCart}
                    className='w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer'
                >
                    <IoBasket className='text-2xl text-primary'/>
                </motion.div>
            </div>
        </div>
    )
}

export default SliderCard