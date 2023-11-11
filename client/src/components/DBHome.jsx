import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllUsers } from '../api'
import { setAllProducts } from '../context/actions/productActions'
import { setAllUserDetails } from '../context/actions/allUsersActions'

const DBHome = () => {

    const products = useSelector(state => state.products)
    const allUsers = useSelector(state => state.allUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!products){
            getAllProducts().then((data) => {
                dispatch(setAllProducts(data))
            })
        }
    }, [products])

    useEffect(() => {
        if(!allUsers){
            getAllUsers().then((data) => {
                dispatch(setAllUserDetails(data))
            })
        }
    }, [allUsers])

    return (
        <div>DBHome</div>
    )
}

export default DBHome