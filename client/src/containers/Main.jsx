import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FilterSection, Header, Home, HomeSlider } from '../components'
import { getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productActions'

const Main = () => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                dispatch(setAllProducts(data))
            })
        }
    }, [products])

    return (
        <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary'>
            <Header />

            <div className='w-full flex flex-col items-start justify-center mt-24 px-6 md:px-20 2xl:px-96 gap-12 pb-8'>
                <Home />
                <HomeSlider />
                <FilterSection />
            </div>
        </main>
    )
}

export default Main