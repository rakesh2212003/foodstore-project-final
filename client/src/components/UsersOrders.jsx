import React, { useEffect, useState } from 'react'

import { Header, OrdersData } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../api';
import { setOrders } from '../context/actions/ordersActions';

const UsersOrders = () => {

    const user = useSelector(state => state.user);
    const orders = useSelector(state => state.orders);

    const dispatch = useDispatch();

    const [UsersOrders, setUsersOrders] = useState({});

    useEffect(() => {
        if (!orders) {
            getAllOrders().then((data) => {
                dispatch(setOrders(data));
                setUsersOrders(data.filter(data => data.userId === user.user_id))
            })
        } else {
            setUsersOrders(orders.filter(data => data.userId === user.user_id))
        }
    }, [dispatch, orders, user.user_id])

    return (
        <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary'>
            <Header />

            <div className='w-full flex flex-col items-start justify-center mt-24 px-6 md:px-20 2xl:px-96 gap-12 pb-8'>
                {UsersOrders.length > 0 ? (
                    <>
                        {
                            UsersOrders.map((item, i) => (
                                <OrdersData
                                    key={i}
                                    index={i}
                                    data={item}
                                    admin={false}
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <h1 className='text-[72px] text-headingColor font-bold'>No Orders Yet</h1>
                    </>
                )}
            </div>

        </main>
    )
}

export default UsersOrders