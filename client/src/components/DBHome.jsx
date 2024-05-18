import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CChart } from '@coreui/react-chartjs'

import { getAllProducts, getAllUsers } from '../api'
import { setAllProducts } from '../context/actions/productActions'
import { setAllUserDetails } from '../context/actions/allUsersActions'

const DBHome = () => {

    const products = useSelector(state => state.products)
    const allUsers = useSelector(state => state.allUsers)

    const dispatch = useDispatch()

    const bread = products?.filter((item) => item.product_category === 'bread')
    const desserts = products?.filter((item) => item.product_category === 'desserts')
    const drinks = products?.filter((item) => item.product_category === 'drinks')
    const fruits = products?.filter((item) => item.product_category === 'fruits')
    const entrees = products?.filter((item) => item.product_category === 'entrees')
    const rice = products?.filter((item) => item.product_category === 'rice')
    const starters = products?.filter((item) => item.product_category === 'starters')

    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                dispatch(setAllProducts(data))
            })
        }
    }, [products])

    useEffect(() => {
        // if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch(setAllUserDetails(data))
            })
        // }
    }, [allUsers])

    return (
        <div className='flex items-center justify-center flex-col pt-6 w-full h-full'>
            <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full'>
                <div className='flex items-center justify-center'>
                    <div className='w-[370px]'>
                        <CChart
                            type="bar"
                            data={{
                                labels: [
                                    'Bread',
                                    'Desserts',
                                    'Drinks',
                                    'Fruits',
                                    'Entrees',
                                    'Rice',
                                    'Starters',
                                ],
                                datasets: [
                                    {
                                        label: 'Category wise count',
                                        backgroundColor: '#fb923c',
                                        data: [
                                            bread?.length,
                                            desserts?.length,
                                            drinks?.length,
                                            fruits?.length,
                                            entrees?.length,
                                            rice?.length,
                                            starters?.length,
                                        ],
                                    },
                                ],
                            }}
                            labels="months"
                        />
                    </div>
                </div>

                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-[340px]'>
                        <CChart
                            type="doughnut"
                            data={{
                                labels: [
                                    "Orders",
                                    "Delivered",
                                    "Cancelled",
                                    "Paid",
                                    "Not Paid",
                                ],
                                datasets: [
                                    {
                                        backgroundColor: [
                                            '#f68826',//orders
                                            '#073c8e', //delivered
                                            '#DD1B16', //cancelled
                                            '#13bc85', //paid
                                            '#000' //not-paid
                                        ],
                                        data: [20, 20, 20, 20, 20],
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DBHome