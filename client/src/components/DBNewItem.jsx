import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import { statuses } from '../utils/styles'
import { Spinner } from '../components'
import { FaCloudUploadAlt, MdDelete } from '../assets/icons'
import { alertDanger, alertNULL, alertSuccess } from '../context/actions/alertActions'
import { buttonClick } from '../animations'
import { addNewProduct, getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productActions'

import { db } from '../config/firebase.config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const DBNewItem = () => {

    const [itemName, setItemName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setprice] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setprogress] = useState(null)
    const [imageDownloadURL, setImageDownloadURL] = useState(null)

    const alert = useSelector(state => state.alert)

    const dispatch = useDispatch()

    const uploadImage = (e) => {
        setIsLoading(true)
        const imageFile = e.target.files[0]
        const storageRef = ref(db, `Images/${Date.now()}_${imageFile.name}`)

        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed', 
            (snapshot) => {
                setprogress((snapshot.bytesTransferred / snapshot.totalBytes)*100)
            }, 
            (error) => {
                dispatch(alertDanger(`Error ${error}`))
                setTimeout(() => {
                    dispatch(alertNULL())
                }, 5000)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageDownloadURL(downloadURL)
                    setIsLoading(false)
                    setprogress(null)
                    dispatch(alertSuccess('Image uploaded to the cloud'))
                    setTimeout(() => {
                        dispatch(alertNULL())
                    }, 5000)
                });
            }
        )
    }

    const deleteImageFromFirebase = () => {
        setIsLoading(true)
        const deleteRef = ref(db, imageDownloadURL)

        deleteObject(deleteRef).then(() => {
            setImageDownloadURL(null)
            setIsLoading(false)
            dispatch(alertSuccess('Image removed from the cloud'))
            setTimeout(() => {
                dispatch(alertNULL())
            }, 5000)
        })
    }

    const submitNewData = () => {
        const data = {
            product_name: itemName,
            product_category: category,
            product_price: price,
            imageURL: imageDownloadURL
        }
        addNewProduct(data).then(res => {
            dispatch(alertSuccess('New Item Added'))
            setTimeout(() => {
                dispatch(alertNULL())
            }, 5000)
            setItemName("")
            setCategory("")
            setprice("")
            setImageDownloadURL(null)
        })
        getAllProducts().then(data => {
            dispatch(setAllProducts(data))
        })
    }

    return (
        <div className='flex items-center justify-center flex-col pt-6 px-12 w-[80%]'>
            <div className='border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4'>
                {/* Item name */}
                <InputValueField
                    type={"text"}
                    placeHolder={"Item Name Here"}
                    stateValue={itemName}
                    stateFunction={setItemName}
                />

                {/* food categorys */}
                <div className='w-full flex items-center justify-around gap-3 flex-wrap'>
                    {statuses && statuses?.map(data => (
                        <p
                            key={data.id}
                            onClick={() => setCategory(data.category)}
                            className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md 
                            ${data.category === category
                                ? 'bg-orange-400 text-primary'
                                : 'bg-transparent'
                            }`}
                        >
                            {data.title}
                        </p>
                    ))}
                </div>
                
                {/* Item price */}
                <InputValueField
                    type={"number"}
                    placeHolder={"Item Price Here"}
                    stateValue={price}
                    stateFunction={setprice}
                />

                {/* item upload container */}
                <div className='w-full bg-card backdrop-blur-md h-[370px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                    {/* if item uploading */}
                    {isLoading ? (
                        <div className='w-full h-full flex flex-col items-center justify-evenly px-24'>
                            <Spinner />
                            {Math.round(progress > 0) && (
                                <div className='w-full flex flex-col items-center justify-center gap-2'>
                                    <div className='flex justify-between w-full'>
                                        {/* Progress word */}
                                        <span className='text-base font-medium text-textColor'>
                                            Progress
                                        </span>

                                        {/* Progress percentage */}
                                        <span className='text-sm font-medium text-textColor'>
                                            {Math.round(progress > 0) && (
                                                <>
                                                    {`${Math.round(progress)}%`}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className='w-full bg-gray-200 rounded-full h-2.5'>
                                        <div
                                            style={{
                                                width: `${Math.round(progress)}%`
                                            }}
                                            className='bg-orange-500 h-2.5 rounded-full transition-all duration-300 ease-in-out'
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (  
                        // if item not uploading
                        <>
                            {!imageDownloadURL ? (
                                <>
                                    <label>
                                        <div className='flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                                            <div className='flex flex-col items-center justify-center cursor-pointer'>
                                                <p className='font-bold text-4xl'>
                                                    <FaCloudUploadAlt className='-rotate-0' />
                                                </p>
                                                <p className='text-lg text-textColor'>
                                                    Click to upload an image
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            name="upload-image"
                                            accept="image/*"
                                            onChange={uploadImage}
                                            className='w-0 h-0'
                                        />
                                    </label>
                                </>
                            ) : (
                                // if item uploaded show the picture and delete button
                                <>
                                    <div className='relative w-full h-full overflow-hidden rounded-md'>
                                        <motion.img 
                                            src={imageDownloadURL}
                                            whileHover={{scale: 1.15}}
                                            className='w-full h-full object-contain'
                                        />

                                        {/* delete button */}
                                        <motion.button
                                            {...buttonClick}
                                            type='button'
                                            onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                                            className='absolute top-3 right-3 p-3 rounded-full bg-orange-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                                        >
                                            <MdDelete className='-rotate-0'/>
                                        </motion.button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* submit button */}
                <motion.button
                    {...buttonClick}
                    onClick={submitNewData}
                    className='w-[75%] py-2 rounded-md bg-orange-400 text-primary hover:bg-orange-500 '
                >
                    Submit
                </motion.button>
            </div>
        </div>
    )
}

// inner input component
export const InputValueField = ({ type, placeHolder, stateValue, stateFunction }) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeHolder}
                value={stateValue}
                onChange={(e) => stateFunction(e.target.value)}
                className='w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-orange-400'
            />
        </>
    )
}

export default DBNewItem