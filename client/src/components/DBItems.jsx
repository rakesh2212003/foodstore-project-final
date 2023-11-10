import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataTable } from '../components'
import { HiCurrencyRupee } from '../assets/icons'
import { deleteAProduct, getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productActions'
import { alertNULL, alertSuccess, alertWarning } from '../context/actions/alertActions'

import { db } from '../config/firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const DBItems = () => {

    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    
    const deleteImageFromFirebase = (imageLink) => {
        const deleteRef = ref(db, imageLink)
        deleteObject(deleteRef)
    }

    return (
        <div className='flex items-center justify-center gap-4 pt-6 w-full'>
            <DataTable
                title={"List of Products"}
                columns={[
                    {
                        title: "Image",
                        field: "imageURL",
                        render: (rowData) => (
                            <img 
                                src={rowData.imageURL}
                                className='w-32 h-16 object-contain rounded-md'
                            />
                        ),
                    },
                    {
                        title: "Name",
                        field: "product_name",
                    },
                    {
                        title: "Category",
                        field: "product_category",
                    },
                    {
                        title: "Price",
                        field: "product_price",
                        render: (rowData) => (
                            <p className='text-xl font-semibold text-textColor flex items-center justify-center'>
                                <span className='text-orange-400'>
                                    <HiCurrencyRupee className='text-orange-400'/>
                                </span>{" "}
                                {parseFloat(rowData.product_price).toFixed(2)}
                            </p>
                        )
                    }
                ]}
                data={products}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Data',
                        onClick: (event, rowData) => {
                            if(window.confirm(`Are you sure you want to delete ${rowData.product_name} from table`)
                            ){
                                deleteAProduct(rowData.productId).then(res => {
                                    getAllProducts().then((data) => {
                                        dispatch(setAllProducts(data))
                                    })
                                    deleteImageFromFirebase(rowData.imageURL)
                                    dispatch(alertSuccess('Product Deleted Successfully'))
                                    setTimeout(() => {
                                        dispatch(alertNULL())
                                    }, 5000)
                                })
                            }else{
                                dispatch(alertWarning('Item delete na karke okat dikha di'))
                                setTimeout(() => {
                                    dispatch(alertNULL())
                                }, 5000)
                            }
                        }
                    }
                ]}
            />
        </div>
    )
}

export default DBItems