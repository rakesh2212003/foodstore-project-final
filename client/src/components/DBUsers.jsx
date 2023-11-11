import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { getAllUsers } from '../api'
// import { setAllUserDetails } from '../context/actions/allUsersActions'
import { DataTable } from '../components'
import { Avatar } from '../assets/img'


const DBUsers = () => {

    const allUsers = useSelector(state => state.allUsers)
    
    const dispatch = useDispatch()

    // useEffect(() => {  //used in DBHome
    //     if(!allUsers){
    //         getAllUsers().then((data) => {
    //             dispatch(setAllUserDetails(data))
    //         })
    //     }
    // }, [])

    return (
        <div className='flex items-center justify-center gap-4 pt-6 w-full'>
            <DataTable
                title={"List of Users"}
                columns={[
                    {
                        title: "Image",
                        field: "photoURL",
                        render: (rowData) => (
                            <img 
                                src={rowData.photoURL ? rowData.photoURL : Avatar }
                                className='w-16 h-16 object-contain rounded-full'
                            />
                        ),
                    },
                    {
                        title: "Name",
                        field: "displayName",
                    },
                    {
                        title: "Email",
                        field: "email",
                    },
                    {
                        title: "Verified",
                        field: "emailVerified",
                        render: (rowData) => (
                            <p className={`px-2 py-1 w-32 text-center text-primary rounded-md ${rowData.emailVerified ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                {rowData.emailVerified ? 'Verified' : 'Not Verified'}
                            </p>
                        )
                    },
                ]}
                data={allUsers}
            />
        </div>
    )
}

export default DBUsers